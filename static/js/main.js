var connected = true
var connectedText = document.getElementById("onlinetext")
var state = 0
var team = 0
var match = 0
modeLookup = ["auto", "teleop", "endgame"]
var classicData = {}

function heartbeat() {
    const http = new XMLHttpRequest()
    
    http.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                connected = true
                connectedText.style.color = "green"
                connectedText.innerHTML = "Online"
                upload()
            } else {
                connected = false
                connectedText.style.color = "red"
                connectedText.innerHTML = "Offline"
                updateLocalCount()
            }
        }
    }
    
    http.timeout = 2000
    http.open("PUT", "/heartbeat", true)
    http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    var teammatch = ""
    if (state >= 1 && state <= 3) {
        teammatch = "&team=" + team + "&match=" + match
    }
    http.send("device_name=" + encodeURI(window.localStorage.getItem("advantagescout_device")) + "&state=" + state.toString() + teammatch)
}

function upload() {
    if (JSON.parse(window.localStorage.getItem("advantagescout_data")).length > 0) {
        const http = new XMLHttpRequest()
        
        http.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    var response = JSON.parse(this.responseText)
                    if (response.success) {
                        var stored = JSON.parse(window.localStorage.getItem("advantagescout_data"))
                        stored.splice(0, response.count)
                        window.localStorage.setItem("advantagescout_data", JSON.stringify(stored))
                    }
                }
                updateLocalCount()
            }
        }
        
        http.onabort = function() {
            updateLocalCount()
        }
        http.onerror = function() {
            updateLocalCount()
        }
        
        http.timeout = 2000
        http.open("POST", "/upload", true)
        http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        http.send("data=" + encodeURI(window.localStorage.getItem("advantagescout_data")))
    } else {
        updateLocalCount()
    }
}

function updateLocalCount() {
    var count = JSON.parse(window.localStorage.getItem("advantagescout_data")).length
    if (count == 0) {
        document.getElementById("localcount").innerHTML = "All matches uploaded"
    } else if (count == 1) {
        document.getElementById("localcount").innerHTML = "1 match saved locally"
    } else {
        document.getElementById("localcount").innerHTML = count + " matches saved locally"
    }
}

var GameCanvasManager
var canvasManager
var gameData
function loadGame() {
    const http = new XMLHttpRequest()
    
    http.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                gameData = JSON.parse(this.responseText)
                try {
                    GameCanvasManager = new Function("canvas", "reverseAlliances", "uploadEvent", gameData["CanvasManager"])
                }
                catch(error) {
                    alert("Failed to load game data. (" + error.message + ")")
                }
                canvasManager = new GameCanvasManager(document.getElementsByClassName("visualcanvas")[0], config.reverse_alliances == 1, uploadEvent)
                document.getElementById("loadingtext").hidden = true
                document.getElementById("startbuttons").hidden = false
            } else {
                alert("Failed to retrieve game data (" + this.status + " " + this.statusText + ")")
            }
        }
    }
    
    http.timeout = 3000
    http.open("GET", "/load_game", true)
    http.send()
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

var config
function getConfig() {
    const http = new XMLHttpRequest()
    
    http.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                config = JSON.parse(this.responseText)
                loadGame()
            } else {
                alert("Failed to retrieve configuration data")
            }
        }
    }
    
    http.open("GET", "/get_config", true)
    http.send()
}

//Transition from team & match selection to scouting
var scoutMode = "classic"
function scoutStart(mode) {
    team = document.getElementById("team").value
    match = document.getElementById("match").value
    if (team == "" && match == "") {
        alert("Please enter a team and match number.")
        return
    }
    if (team == "") {
        alert("Please enter a team number.")
        return
    }
    if (match == "") {
        alert("Please enter a match number.")
        return
    }
    state = 1
    scoutMode = mode
    setupClassic()
    document.getElementsByClassName("switcherbutton1")[0].style.fontWeight = "bold"
    document.getElementsByClassName("switcherbutton2")[0].style.fontWeight = "normal"
    document.getElementsByClassName("switcherbutton3")[0].style.fontWeight = "normal"
    document.getElementById("selectionDiv").hidden = true
    document.getElementById("modeSwitcherDiv").hidden = false
    var showClassic = gameData.prefs.forceClassic["auto"] || scoutMode == "classic"
    document.getElementById("visualCanvasDiv").hidden = showClassic
    document.getElementById("classicDiv1").hidden = !showClassic
    heartbeat()
}

//Save data to local storage
var uploadEvent = new Event("uploadData")
document.addEventListener("uploadData", function() {
                          if (confirm("Are you sure you're ready to upload data?")) {
                          saveData()
                          idleStart(false)
                          }
                          })

//Transition from scouting or offline warning to offline warning or title
function idleStart(forceTitle) {
    var offlineWarning = !forceTitle && !connected
    document.getElementById("modeSwitcherDiv").hidden = true
    document.getElementById("classicDiv1").hidden = true
    document.getElementById("classicDiv2").hidden = true
    document.getElementById("classicDiv3").hidden = true
    if (offlineWarning) {
        state = 4
        document.getElementById("offlineWarningDiv").hidden = false
    } else {
        state = 0
        document.getElementById("team").value = ""
        document.getElementById("match").value = ""
        document.getElementById("offlineWarningDiv").hidden = true
        document.getElementById("selectionDiv").hidden = false
    }
    heartbeat()
}

function saveData() {
    var toSave = canvasManager.getData()
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
                
                if (input.type == "div") {
                    classicData[fieldName] = input.innerText
                } else if (input.type == "select-one") {
                    if (isNaN(input.value)) {
                        classicData[fieldName] = input.value
                    } else {
                        classicData[fieldName] = Number(input.value)
                    }
                    
                } else if (input.type == "textarea") {
                    classicData[fieldName] = input.value
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
    var previouslySaved = JSON.parse(window.localStorage.getItem("advantagescout_data"))
    previouslySaved.push(toSave)
    window.localStorage.setItem("advantagescout_data", JSON.stringify(previouslySaved))
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
    canvasManager.setMode(state - 1)
    heartbeat()
    
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
window.addEventListener("resize", function() {resizeText()})

// Check for device name
if (window.localStorage.getItem("advantagescout_device") == null) {
    window.location = "/config"
} else {
    getConfig()
    heartbeat()
    resizeText()
    setInterval(function() {heartbeat()}, 3000)
    if (window.localStorage.getItem("advantagescout_data") == null) {
        window.localStorage.setItem("advantagescout_data", "[]")
    }
    updateLocalCount()
}
