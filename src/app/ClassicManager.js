// Responsible for managing classic layout
function ClassicManager(appManager) {
    const modeLookup = ["auto", "teleop", "endgame", "pit"]
    var fieldPrefsLookup = {} // prefs for each field (min, max, step, etc.)
    var fieldModeLists = [[], [], [], []] // lists of which fields are in which mode
    var counterData = {} // keeps track of counter values
    var activeStopwatches = [] // keeps track of which stopwatches are running

    // Set up classic interface
    this.start = function () {
        fieldPrefsLookup = {}
        fieldModeLists = [[], [], [], []]
        counterData = {}
        activeStopwatches = []
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
            select.classictype = "chooser"
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
            textarea.classictype = "text"
            textarea.placeholder = "Enter text here..."
        } else if (inputData.type == "number") {
            var input = document.createElement("INPUT")
            unit.children[1].appendChild(input)
            input.classList.add("classicinput")
            input.id = modeName + "_" + inputData.field
            input.classictype = "number"
            input.type = "number"
        } else if (inputData.type == "counter") {
            var downButton = document.createElement("BUTTON")
            unit.children[1].appendChild(downButton)
            downButton.classList.add("classiccounter_button")
            downButton.classList.add("classiccounter_down")
            downButton.onclick = function () {
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
            fieldPrefsLookup[modeName + "_" + inputData.field] = { "min": inputData.min, "max": inputData.max, "step": inputData.step }
            number.id = modeName + "_" + inputData.field
            number.classictype = "counter"

            var upButton = document.createElement("BUTTON")
            unit.children[1].appendChild(upButton)
            upButton.classList.add("classiccounter_button")
            upButton.classList.add("classiccounter_up")
            upButton.onclick = function () {
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
            checkbox.classictype = "checkbox"
            checkbox.style.backgroundColor = "#ff7575"
            checkbox.onclick = function () {
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
            button.onclick = function () {
                appManager.scoutManager.upload()
            }
        } else if (inputData.type == "image") {
            var button = document.createElement("BUTTON")
            unit.children[1].appendChild(button)
            button.classList.add("classicimagebutton")
            button.style.backgroundColor = "#ff7575"
            button.innerHTML = "Camera"
            button.id = modeName + "_" + inputData.field
            button.classictype = "image"
            button.onclick = function () {
                appManager.classicManager.takePhoto(this)
            }
        } else if (inputData.type = "stopwatch") {
            var button = document.createElement("BUTTON")
            unit.children[1].appendChild(button)
            button.classList.add("classicstopwatchbutton")
            button.style.backgroundColor = "#dddddd"
            button.innerHTML = "\u{25B6}"
            button.onclick = function () {
                var id = this.parentElement.children[1].id
                if (activeStopwatches.includes(id)) {
                    activeStopwatches.splice(activeStopwatches.indexOf(id), 1)
                    this.innerHTML = "X"
                } else if (this.innerHTML == "X") {
                    this.parentElement.children[1].innerHTML = "0.0"
                    this.innerHTML = "\u{25B6}"
                } else {
                    activeStopwatches.push(id)
                    this.innerHTML = "\u{23F9}"
                }
            }

            var time = document.createElement("DIV")
            unit.children[1].appendChild(time)
            time.classList.add("classicstopwatchtime")
            time.innerHTML = "0.0"
            time.id = modeName + "_" + inputData.field
            time.classictype = "stopwatch"
        }
        return unit
    }

    // Retrieve data from document
    this.getData = function (scoutMode) {
        var result = {}
        var useResult
        if (scoutMode == "classic") {
            useResult = [true, true, true, false]
        } else if (scoutMode == "pit") {
            useResult = [false, false, false, true]
        } else {
            useResult = [appManager.game.prefs.forceClassic.auto, appManager.game.prefs.forceClassic.teleop, appManager.game.prefs.forceClassic.endgame, false]
        }
        for (var mode = 0; mode < 4; mode++) {
            if (useResult[mode]) {
                for (var i = 0; i < fieldModeLists[mode].length; i++) {
                    var fieldName = fieldModeLists[mode][i]
                    var input = document.getElementById(modeLookup[mode] + "_" + fieldName)

                    if (input.classictype == "counter") {
                        result[fieldName] = Number(input.innerText)
                    } else if (input.classictype == "chooser") {
                        if (isNaN(input.value)) {
                            result[fieldName] = input.value
                        } else {
                            result[fieldName] = Number(input.value)
                        }

                    } else if (input.classictype == "text") {
                        result[fieldName] = input.value.replace(/[^\x20-\x7E]+/g, "")
                    } else if (input.classictype == "number") {
                        result[fieldName] = Number(input.value)
                    } else if (input.classictype == "checkbox") {
                        if (input.style.backgroundColor == "rgb(255, 117, 117)") {
                            result[fieldName] = 0
                        } else {
                            result[fieldName] = 1
                        }
                    } else if (input.classictype == "image") {
                        result[fieldName] = input.image
                    } else if (input.classictype == "stopwatch"){
                        result[fieldName] = Number(input.innerHTML)
                    }
                }
            }
        }
        return result
    }

    // Take photo and return file path
    this.takePhoto = function (button) {
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
            navigator.camera.getPicture(onSuccess, function () { }, cameraOptions)
        }
    }

    // Update stopwatches every 1/10th of a second
    setInterval(function () {
        for (var i in activeStopwatches) {
            var div = document.getElementById(activeStopwatches[i])
            var time = (Number(div.innerHTML * 10) + 1) / 10
            timeString = time.toString()
            if (time % 1 == 0) {
                timeString = timeString + ".0"
            }
            div.innerHTML = timeString
        }
    }, 100);
}
