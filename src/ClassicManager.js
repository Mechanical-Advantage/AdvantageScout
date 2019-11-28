// Responsible for managing classic layout
function ClassicManager(appManager) {
    const modeLookup = ["auto", "teleop", "endgame", "pit"]
    var fieldPrefsLookup = {} // prefs for each field (min, max, step, etc.)
    var fieldModeLists = [[], [], [], []] // lists of which fields are in which mode
    var counterData = {} // keeps track of counter values
    
    // Set up classic interface
    this.start = function() {
        fieldPrefsLookup = {}
        fieldModeLists = [[], [], [], []]
        var mainDivs = [document.getElementById("classicDiv1"), document.getElementById("classicDiv2"), document.getElementById("classicDiv3"), document.getElementById("pitClassicDiv")]
        var modeCount
        if (appManager.game.prefs.pitFields == undefined) {
            modeCount = 3
        } else {
            modeCount = 4
        }
        for (var mode = 0; mode < modeCount; mode++) {
            while (mainDivs[mode].firstChild) {
                mainDivs[mode].removeChild(mainDivs[mode].firstChild)
            }
            
            var inputDataList = appManager.game.prefs.classic[modeLookup[mode]]
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
                    unit.children[1].appendChild(unitFor(inputData.unit1, false, modeLookup[mode]))
                    unit.children[1].appendChild(unitFor(inputData.unit2, false, modeLookup[mode]))
                    if (inputData.unit1.field) {
                        fieldModeLists[mode].push(inputData.unit1.field)
                    }
                    if (inputData.unit2.field) {
                        fieldModeLists[mode].push(inputData.unit2.field)
                    }
                } else {
                    unit = unitFor(inputData, true, modeLookup[mode])
                    if (inputData.field) {
                        fieldModeLists[mode].push(inputData.field)
                    }
                }
                mainDivs[mode].appendChild(unit)
            }
        }
    }
    
    // Get HTML for unit
    function unitFor(inputData, wideAllowed, modeName) {
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
            select.id = modeName + "_" + inputData.field
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
            textarea.id = modeName + "_" + inputData.field
            textarea.placeholder = "Enter text here..."
        } else if (inputData.type == "counter") {
            var downButton = document.createElement("BUTTON")
            unit.children[1].appendChild(downButton)
            downButton.classList.add("classiccounter_button")
            downButton.classList.add("classiccounter_down")
            downButton.onclick = function() {
                var field = this.parentElement.children[1].id
                if (fieldPrefsLookup[field].min < counterData[field]) {
                    counterData[field] -= fieldPrefsLookup[field].step
                    this.parentElement.children[1].innerHTML = counterData[field]
                }
            }
            
            var number = document.createElement("DIV")
            unit.children[1].appendChild(number)
            number.classList.add("classiccounter_number")
            number.innerHTML = inputData.min
            counterData[modeName + "_" + inputData.field] = inputData.min
            fieldPrefsLookup[modeName + "_" + inputData.field] = {"min": inputData.min, "max": inputData.max, "step": inputData.step}
            number.id = modeName + "_" + inputData.field
            
            var upButton = document.createElement("BUTTON")
            unit.children[1].appendChild(upButton)
            upButton.classList.add("classiccounter_button")
            upButton.classList.add("classiccounter_up")
            upButton.onclick = function() {
                var field = this.parentElement.children[1].id
                if (fieldPrefsLookup[field].max > counterData[field]) {
                    counterData[field] += fieldPrefsLookup[field].step
                    this.parentElement.children[1].innerHTML = counterData[field]
                }
            }
        } else if (inputData.type == "checkbox") {
            var checkbox = document.createElement("BUTTON")
            unit.children[1].appendChild(checkbox)
            checkbox.classList.add("classicinput")
            checkbox.classList.add("classiccheck")
            checkbox.id = modeName + "_" + inputData.field
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
                appManager.scoutManager.upload()
            }
        } else if (inputData.type == "image") {
            var button = document.createElement("BUTTON")
            unit.children[1].appendChild(button)
            button.classList.add("classicimagebutton")
            button.style.backgroundColor = "#ff7575"
            button.innerHTML = "Camera"
            button.id = modeName + "_" + inputData.field
            button.onclick = function() {
                appManager.classicManager.takePhoto(this)
            }
        }
        return unit
    }
    
    // Retrieve data from document
    this.getData = function(scoutMode) {
        var result = {}
        var useResult
        if (scoutMode == "classic") {
            useResult = [true, true, true, false]
        } else if (scoutMode == "pit") {
            useResult = [false, false, false, true]
        } else{
            useResult = [appManager.game.prefs.forceClassic.auto, appManager.game.prefs.forceClassic.teleop, appManager.game.prefs.forceClassic.endgame, false]
        }
        for (var mode = 0; mode < 4; mode++) {
            if (useResult[mode]) {
                for (var i = 0; i < fieldModeLists[mode].length; i++) {
                    var fieldName = fieldModeLists[mode][i]
                    var input = document.getElementById(modeLookup[mode] + "_" + fieldName)
                    
                    if (input.tagName == "DIV") {
                        result[fieldName] = Number(input.innerText)
                    } else if (input.type == "select-one") {
                        if (isNaN(input.value)) {
                            result[fieldName] = input.value
                        } else {
                            result[fieldName] = Number(input.value)
                        }
                        
                    } else if (input.type == "textarea") {
                        result[fieldName] = input.value
                    } else if (input.type == "submit") {
                        if (input.innerHTML == "Camera") {
                            result[fieldName] = input.image
                        } else {
                            if (input.style.backgroundColor == "rgb(255, 117, 117)") {
                                result[fieldName] = 0
                            } else {
                                result[fieldName] = 1
                            }
                        }
                    }
                }
            }
        }
        return result
    }
    
    // Take photo and return file path
    this.takePhoto = function(button) {
        if (appManager.web) {
            appManager.notificationManager.alert("Not supported", "Photos are not supported right now.")
        } else {
            var cameraOptions = {
                quality: window.localStorage.getItem("advantagescout_imagequality"),
                destinationType: Camera.DestinationType.FILE_URI,
                correctOrientation: true,
                saveToPhotoAlbum: false,
                cameraDirection: Camera.Direction.BACK
            }
            function onSuccess(imageUrl) {
                button.image = imageUrl
                button.style.backgroundColor = "#75ff91"
            }
            navigator.camera.getPicture(onSuccess, function() {}, cameraOptions)
        }
    }
}
