// Responsible for managing classic layout
function ClassicManager(appManager) {
    const modeLookup = ["auto", "teleop", "endgame"]
    var fieldPrefsLookup = {} // prefs for each field (min, max, step, etc.)
    var fieldModeLists = [[], [], []] // lists of which fields are in which mode
    var counterData = {} // keeps track of counter values
    
    // Set up classic interface
    this.start = function() {
        fieldPrefsLookup = {}
        fieldModeLists = [[], [], []]
        var mainDivs = [document.getElementById("classicDiv1"), document.getElementById("classicDiv2"), document.getElementById("classicDiv3")]
        for (var mode = 0; mode < 3; mode++) {
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
    
    // Get HTML for unit
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
                if (fieldPrefsLookup[field].min < counterData[field]) {
                    counterData[field] -= fieldPrefsLookup[field].step
                    this.parentElement.children[1].innerHTML = counterData[field]
                }
            }
            
            var number = document.createElement("DIV")
            unit.children[1].appendChild(number)
            number.classList.add("classiccounter_number")
            number.innerHTML = inputData.min
            counterData[inputData.field] = inputData.min
            fieldPrefsLookup[inputData.field] = {"min": inputData.min, "max": inputData.max, "step": inputData.step}
            number.id = inputData.field
            
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
                appManager.scoutManager.upload()
            }
        }
        return unit
    }
    
    // Retrieve data from document
    this.getData = function(scoutMode) {
        var result = {}
        var useResult
        if (scoutMode == "classic") {
            useResult = [true, true, true]
        } else {
            useResult = [appManager.game.prefs.forceClassic.auto, appManager.game.prefs.forceClassic.teleop, appManager.game.prefs.forceClassic.endgame]
        }
        for (var mode = 0; mode < 3; mode++) {
            if (useResult[mode]) {
                for (var i = 0; i < fieldModeLists[mode].length; i++) {
                    var fieldName = fieldModeLists[mode][i]
                    var input = document.getElementById(fieldName)
                    
                    if (input.type == undefined) {
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
                        if (input.style.backgroundColor == "rgb(255, 117, 117)") {
                            result[fieldName] = 0
                        } else {
                            result[fieldName] = 1
                        }
                    }
                }
            }
        }
        return result
    }
}
