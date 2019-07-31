/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        StatusBar.backgroundColorByHexString("#000b3d");
        document.addEventListener('backbutton', function() {
                                  if (state != 0) {
                                  if (state == 1) {
                                  navigator.notification.confirm("Your data will NOT be saved!", function(result) {
                                                                 if (result == 1) {
                                                                 state = 0
                                                                 idleStart(false)
                                                                 }
                                                                 }, "Stop Scouting?", ["Leave", "Stay"])
                                  } else {
                                  setMode(state - 1)
                                  }
                                  }
                                  }, false)
        window.addEventListener("resize", function() {resizeText()})
        
        //Check for device name
        if (window.localStorage.getItem("advantagescout_device") == null) {
            setConfig(true)
        } else {
            document.getElementById("name").value = window.localStorage.getItem("advantagescout_device")
        }
        
        //Add version number
        cordova.getAppVersion.getVersionNumber(function(version) {
                                               document.getElementsByClassName("versiontext")[0].innerHTML = "Version " + version.toString()
                                               })
        
        refreshDeviceList()
        
        //Initialize
        getConfig()
        resizeText()
        if (window.localStorage.getItem("advantagescout_scoutdata") == null) {
            window.localStorage.setItem("advantagescout_scoutdata", "[]")
        }
        if (window.localStorage.getItem("advantagescout_gamedata") != null) {
            if (Math.round(Date.now() / 1000) - window.localStorage.getItem("advantagescout_gamedatatimestamp") < cacheExpiration) {
                loadConfig(JSON.parse(window.localStorage.getItem("advantagescout_gamedata")))
            }
        }
        updateLocalCount()
        
        //Create upload event
        setInterval(function() {upload()}, 20000)
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
    }
};

app.initialize();

var state = 0
var team = 0
var match = 0
modeLookup = ["auto", "teleop", "endgame"]
var classicData = {}
var cacheExpiration = 86400 //time to allow use of cached game data/config/version number (seconds)

var serialQueue = []
function addToSerialQueue(query, args, response) {
    serialQueue.push({"query": query, "args": args, "response": response})
    if (serialQueue.length == 1) {
        pushSerialQueue()
    }
}

function getRandomDelay() {
    return Math.random() * 6000
}

function pushSerialQueue() {
    var responses = []
    bluetoothSerial.isEnabled(function(){
                              btEnabled()
                              }, function() {
                              setTimeout(function() {pushSerialQueue()}, getRandomDelay())
                              })
    function btEnabled() {
        if (window.localStorage.getItem("advantagescout_device") == null || window.localStorage.getItem("advantagescout_server") == null || window.localStorage.getItem("advantagescout_device") == "" || window.localStorage.getItem("advantagescout_server") == "") {
            setTimeout(function() {pushSerialQueue()}, getRandomDelay())
        } else {
            bluetoothSerial.connect(window.localStorage.getItem("advantagescout_server"), function() {
                                    bluetoothSerial.subscribe("\n", function(data) {
                                                              serialQueue.shift().response(data)
                                                              if (serialQueue.length == 0) {
                                                              bluetoothSerial.unsubscribe()
                                                              bluetoothSerial.disconnect()
                                                              }
                                                              })
                                    for (var i = 0; i < serialQueue.length; i++) {
                                    data = JSON.stringify([window.localStorage.getItem("advantagescout_device"), serialQueue[i].query, serialQueue[i].args()])
                                    bluetoothSerial.write(data + "\n", function() {}, function() {})
                                    }
                                    }, function() {
                                    setTimeout(function() {pushSerialQueue()}, getRandomDelay())
                                    })
        }
    }
}

//Add possible server devices
function refreshDeviceList() {
    bluetoothSerial.list(function(devices) {
                         var serverSelect = document.getElementById("server")
                         serverSelect.innerHTML = ""
                         for (var i = 0; i < devices.length; i++) {
                         var option = document.createElement("OPTION")
                         option.value = devices[i].address
                         option.innerHTML = devices[i].name
                         serverSelect.appendChild(option)
                         }
                         
                         if (window.localStorage.getItem("advantagescout_server") != null) {
                         for (var i = 0; i < devices.length; i++) {
                         if (devices[i].address == window.localStorage.getItem("advantagescout_server")) {
                         serverSelect.selectedIndex = i
                         }
                         }
                         }
                         })
}

var uploadQueued = false
function upload() {
    if (JSON.parse(window.localStorage.getItem("advantagescout_scoutdata")).length > 0 && !uploadQueued) {
        uploadQueued = true
        addToSerialQueue("upload", function() {return [window.localStorage.getItem("advantagescout_scoutdata")]}, function(data) {
              uploadQueued = false
              var response = JSON.parse(data)[1]
              if (response.success) {
                  var stored = JSON.parse(window.localStorage.getItem("advantagescout_scoutdata"))
                  stored.splice(0, response.count)
                  window.localStorage.setItem("advantagescout_scoutdata", JSON.stringify(stored))
              }
              updateLocalCount()
              })
    }
    updateLocalCount()
}

function updateLocalCount() {
    var count = JSON.parse(window.localStorage.getItem("advantagescout_scoutdata")).length
    if (count == 0) {
        document.getElementById("localcount").innerHTML = "All matches uploaded"
    } else if (count == 1) {
        document.getElementById("localcount").innerHTML = "1 match saved locally"
    } else {
        document.getElementById("localcount").innerHTML = count + " matches saved locally"
    }
}

var config
var GameCanvasManager
var canvasManager
var gameData
function getConfig() {
    addToSerialQueue("load_data", function() {return []}, function(data) {
                     data = JSON.parse(data)[1]
                     window.localStorage.setItem("advantagescout_gamedata", JSON.stringify(data))
                     window.localStorage.setItem("advantagescout_gamedatatimestamp", Math.round(Date.now() / 1000))
                     loadConfig(data)
                     })
}

var outdatedAlertSent = false
function loadConfig(data) {
    // Process config
    config = data.config
    if (config.reverse_alliances == 2) {
        document.getElementById("reverseAlliancesDiv").hidden = false
        document.getElementById("reverseAlliances").selectedIndex = 0
    } else {
        document.getElementById("reverseAlliancesDiv").hidden = true
        document.getElementById("reverseAlliances").selectedIndex = config.reverse_alliances
    }
    
    // Process game
    gameData = data.game
    if (gameData.CanvasManager) {
        try {
            GameCanvasManager = new Function("canvas", "reverseAlliances", "uploadEvent", gameData["CanvasManager"])
        }
        catch(error) {
            navigator.notification.alert("Failed to load game data. (" + error.message + ")", function() {}, "Error")
        }
        document.getElementById("visualstart").innerHTML = "Scout! (visual)"
        document.getElementById("classicstart").innerHTML = "Scout! (classic)"
        document.getElementById("visualstart").hidden = false
        document.getElementById("twobuttonbreak").hidden = false
    } else {
        document.getElementById("classicstart").innerHTML = "Scout!"
        document.getElementById("visualstart").hidden = true
        document.getElementById("twobuttonbreak").hidden = true
    }
    document.getElementById("loadingtext").hidden = true
    document.getElementById("startbuttons").hidden = false
    
    // Alert if version outdated
    if (!outdatedAlertSent) {
        cordova.getAppVersion.getVersionNumber(function(version) {
                                               if (version.toString() != data.version) {
                                               outdatedAlertSent = true
                                               navigator.notification.alert("This app version is outdated. Ask the scouting team for help updating.", function() {}, "Update Required")
                                               }
                                               })
    }
}

var fieldPrefsLookup = {}
var fieldModeLists = [[], [], []]
function setupClassic() {
    fieldPrefsLookup = {}
    fieldModeLists = [[], [], []]
    var mainDivs = [document.getElementById("classicDiv1"), document.getElementById("classicDiv2"), document.getElementById("classicDiv3")]
    for (var mode = 0; mode < 3; mode++) {
        while (mainDivs[mode].firstChild) {
            mainDivs[mode].removeChild(mainDivs[mode].firstChild)
        }
        
        var inputDataList = gameData.prefs.classic[modeLookup[mode]]
        for (var inputNumber = 0; inputNumber < inputDataList.length; inputNumber++) {
            var inputData = inputDataList[inputNumber]
            var unit
            if (inputData.type == "group") {
                unit = document.createElement("DIV")
                unit.classList.add("classicgroup")
                unit.appendChild(document.createElement("DIV"))
                unit.firstChild.classList.add("classicgroup_labelbox")
                unit.firstChild.appendChild(document.createElement("DIV"))
                unit.firstChild.firstChild.classList.add("classiclabel")
                unit.firstChild.firstChild.style.textDecoration = "underline"
                unit.firstChild.firstChild.innerHTML = inputData.label
                
                unit.appendChild(document.createElement("DIV"))
                unit.children[1].classList.add("classicgroup_units")
                unit.children[1].appendChild(unitFor(inputData.unit1, false))
                unit.children[1].appendChild(unitFor(inputData.unit2, false))
                if (inputData.unit1.field) {
                    fieldModeLists[mode].push(inputData.unit1.field)
                }
                if (inputData.unit2.field) {
                    fieldModeLists[mode].push(inputData.unit2.field)
                }
            } else {
                unit = unitFor(inputData, true)
                if (inputData.field) {
                    fieldModeLists[mode].push(inputData.field)
                }
            }
            mainDivs[mode].appendChild(unit)
        }
    }
}

function unitFor(inputData, wideAllowed) {
    var unit = document.createElement("DIV")
    unit.classList.add("classicunit")
    if (inputData.type == "text" && wideAllowed) {
        unit.classList.add("classicwide")
    }
    unit.appendChild(document.createElement("DIV"))
    unit.firstChild.classList.add("classiclabelbox")
    unit.firstChild.appendChild(document.createElement("DIV"))
    unit.firstChild.firstChild.classList.add("classiclabel")
    if (inputData.type == "uploadButton") {
        unit.firstChild.firstChild.innerHTML = "Upload Data"
    } else {
        unit.firstChild.firstChild.innerHTML = inputData.label
    }
    
    unit.appendChild(document.createElement("DIV"))
    unit.children[1].classList.add("classiccontrols")
    
    if (inputData.type == "chooser") {
        var select = document.createElement("SELECT")
        unit.children[1].appendChild(select)
        select.classList.add("classicinput")
        select.id = inputData.field
        for (var name in inputData.options) {
            var option = document.createElement("OPTION")
            option.innerHTML = name
            option.value = inputData.options[name]
            select.appendChild(option)
        }
    } else if (inputData.type == "text") {
        var textarea = document.createElement("TEXTAREA")
        unit.children[1].appendChild(textarea)
        textarea.classList.add("classicinput")
        textarea.id = inputData.field
        textarea.placeholder = "Enter text here..."
    } else if (inputData.type == "counter") {
        var downButton = document.createElement("BUTTON")
        unit.children[1].appendChild(downButton)
        downButton.classList.add("classiccounter_button")
        downButton.classList.add("classiccounter_down")
        downButton.onclick = function() {
            var field = this.parentElement.children[1].id
            if (fieldPrefsLookup[field].min < classicData[field]) {
                classicData[field] -= fieldPrefsLookup[field].step
                this.parentElement.children[1].innerHTML = classicData[field]
            }
        }
        
        var number = document.createElement("DIV")
        unit.children[1].appendChild(number)
        number.classList.add("classiccounter_number")
        number.innerHTML = inputData.min
        classicData[inputData.field] = inputData.min
        fieldPrefsLookup[inputData.field] = {"min": inputData.min, "max": inputData.max, "step": inputData.step}
        number.id = inputData.field
        
        var upButton = document.createElement("BUTTON")
        unit.children[1].appendChild(upButton)
        upButton.classList.add("classiccounter_button")
        upButton.classList.add("classiccounter_up")
        upButton.onclick = function() {
            var field = this.parentElement.children[1].id
            if (fieldPrefsLookup[field].max > classicData[field]) {
                classicData[field] += fieldPrefsLookup[field].step
                this.parentElement.children[1].innerHTML = classicData[field]
            }
        }
    } else if (inputData.type == "checkbox") {
        var checkbox = document.createElement("BUTTON")
        unit.children[1].appendChild(checkbox)
        checkbox.classList.add("classicinput")
        checkbox.classList.add("classiccheck")
        checkbox.id = inputData.field
        checkbox.style.backgroundColor = "#ff7575"
        checkbox.onclick = function() {
            if (this.style.backgroundColor == "rgb(255, 117, 117)") {
                this.style.backgroundColor = "#75ff91"
            } else {
                this.style.backgroundColor = "#ff7575"
            }
        }
    } else if (inputData.type == "break") {
        unit = document.createElement("BR")
    } else if (inputData.type == "uploadButton") {
        var button = document.createElement("BUTTON")
        unit.children[1].appendChild(button)
        button.classList.add("classicuploadbutton")
        button.innerHTML = "Save"
        button.onclick = function() {
            document.dispatchEvent(uploadEvent)
        }
    }
    return unit
}

//Transition from team & match selection to scouting
var scoutMode = "classic"
function scoutStart(mode) {
    team = document.getElementById("team").value
    match = document.getElementById("match").value
    if (team == "" && match == "") {
        navigator.notification.alert("Please enter a team and match number.", function() {}, "Error")
        return
    }
    if (team == "") {
        navigator.notification.alert("Please enter a team number.", function() {}, "Error")
        return
    }
    if (match == "") {
        navigator.notification.alert("Please enter a match number.", function() {}, "Error")
        return
    }
    state = 1
    scoutMode = mode
    setupClassic()
    if (gameData.CanvasManager) {
        canvasManager = new GameCanvasManager(document.getElementsByClassName("visualcanvas")[0], document.getElementById("reverseAlliances").selectedIndex == 1, uploadEvent)
        
    }
    document.getElementsByClassName("switcherbutton1")[0].style.fontWeight = "bold"
    document.getElementsByClassName("switcherbutton2")[0].style.fontWeight = "normal"
    document.getElementsByClassName("switcherbutton3")[0].style.fontWeight = "normal"
    document.getElementById("selectionDiv").hidden = true
    document.getElementById("modeSwitcherDiv").hidden = false
    var showClassic = gameData.prefs.forceClassic["auto"] || scoutMode == "classic"
    document.getElementById("visualCanvasDiv").hidden = showClassic
    document.getElementById("classicDiv1").hidden = !showClassic
}

//Save data to local storage
var uploadEvent = new Event("uploadData")
document.addEventListener("uploadData", function() {
                          navigator.notification.confirm("Are you sure you're ready to upload data?", function(result) {
                                                         if (result == 1) {
                                                         saveData()
                                                         upload()
                                                         idleStart(true)
                                                         }
                                                         }, "Upload?", ["Upload", "Cancel"])
                          })

//Transition to team match selection
function idleStart(resetFields) {
    document.getElementById("modeSwitcherDiv").hidden = true
    document.getElementById("classicDiv1").hidden = true
    document.getElementById("classicDiv2").hidden = true
    document.getElementById("classicDiv3").hidden = true
    document.getElementById("visualCanvasDiv").hidden = true
    if (resetFields) {
        document.getElementById("team").value = ""
        document.getElementById("match").value = ""
    }
    document.getElementById("selectionDiv").hidden = false
}

//Open & close settings
function setConfig(open) {
    document.getElementById("selectionDiv").hidden = open
    document.getElementById("configDiv").hidden = !open
    if (!open) {
        window.localStorage.setItem("advantagescout_device", document.getElementById("name").value)
        window.localStorage.setItem("advantagescout_server", document.getElementById("server").value)
        getConfig()
    }
}

function saveData() {
    var toSave = {}
    if (gameData.CanvasManager) {
        toSave = canvasManager.getData()
    }
    var classicData = {}
    var useClassicData
    if (scoutMode == "classic") {
        useClassicData = [true, true, true]
    } else {
        useClassicData = [gameData.prefs.forceClassic.auto, gameData.prefs.forceClassic.teleop, gameData.prefs.forceClassic.endgame]
    }
    for (var mode = 0; mode < 3; mode++) {
        if (useClassicData[mode]) {
            for (var i = 0; i < fieldModeLists[mode].length; i++) {
                var fieldName = fieldModeLists[mode][i]
                var input = document.getElementById(fieldName)
                
                if (input.type == undefined) {
                    classicData[fieldName] = input.innerText
                } else if (input.type == "select-one") {
                    if (isNaN(input.value)) {
                        classicData[fieldName] = input.value
                    } else {
                        classicData[fieldName] = Number(input.value)
                    }
                    
                } else if (input.type == "textarea") {
                    classicData[fieldName] = input.value
                } else if (input.type == "submit") {
                    if (input.style.backgroundColor == "rgb(255, 117, 117)") {
                        classicData[fieldName] = 0
                    } else {
                        classicData[fieldName] = 1
                    }
                }
            }
        }
    }
    Object.assign(toSave, classicData)
    toSave["Event"] = config.event
    toSave["Team"] = Number(team)
    toSave["Match"] = Number(match)
    toSave["DeviceName"] = window.localStorage.getItem("advantagescout_device")
    toSave["Time"] = Math.round(Date.now() / 1000)
    var previouslySaved = JSON.parse(window.localStorage.getItem("advantagescout_scoutdata"))
    previouslySaved.push(toSave)
    window.localStorage.setItem("advantagescout_scoutdata", JSON.stringify(previouslySaved))
}

//Switch b/t auto, teleop, and endgame
function setMode(mode) {
    document.getElementsByClassName("switcherbutton" + state)[0].style.fontWeight = "normal"
    state = mode
    document.getElementsByClassName("switcherbutton" + state)[0].style.fontWeight = "bold"
    document.getElementById("visualCanvasDiv").hidden = gameData.prefs.forceClassic[modeLookup[state - 1]] || scoutMode == "classic"
    document.getElementById("classicDiv1").hidden = !((gameData.prefs.forceClassic["auto"] || scoutMode == "classic") && state == 1)
    document.getElementById("classicDiv2").hidden = !((gameData.prefs.forceClassic["teleop"] || scoutMode == "classic") && state == 2)
    document.getElementById("classicDiv3").hidden = !((gameData.prefs.forceClassic["endgame"] || scoutMode == "classic") && state == 3)
    if (gameData.CanvasManager) {
        canvasManager.setMode(state - 1)
    }
    window.scrollTo(0, 0)
}

//Adjusts body size and text based on screen size
var lastAutoText = "Autonomous"
var lastTeleopText = "Tele-operated"
var lastEndgameText = "End Game"
function resizeText() {
    document.body.style.height = window.innerHeight + "px"
    var width = document.body.clientWidth
    var autoText = "Autonomous"
    var teleopText = "Tele-operated"
    var endgameText = "End Game"
    if (width < 610) {
        teleopText = "Teleoperated"
        endgameText = "Endgame"
    }
    if (width < 570) {
        autoText = "Auto"
        teleopText = "Tele-op"
        endgameText = "End"
    }
    if (width < 340) {
        teleopText = "Teleop"
    }
    if (width < 270) {
        autoText = "A"
        teleopText = "T"
        endgameText = "E"
    }
    if (autoText != lastAutoText) {
        document.getElementsByClassName("switcherbutton1")[0].innerHTML = autoText
        lastAutoText = autoText
    }
    if (teleopText != lastTeleopText) {
        document.getElementsByClassName("switcherbutton2")[0].innerHTML = teleopText
        lastTeleopText = teleopText
    }
    if (endgameText != lastEndgameText) {
        document.getElementsByClassName("switcherbutton3")[0].innerHTML = endgameText
        lastEndgameText = endgameText
    }
}
