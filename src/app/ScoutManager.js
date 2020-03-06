// Responsible for managing scouting screen
function ScoutManager(appManager) {
    const modeLookup = ["auto", "teleop", "endgame"]
    const highlightLookup = ["#ff6363", "#59ff78", "#8f9aff"]
    var scoutMode
    var hiddenScheduleKey = ""
    var tempHiddenScheduleKey = ""
    var noReloadScheduleKey = ""

    // Load config and game data
    this.loadData = function () {
        // Reverse alliances
        if (appManager.config.reverse_alliances == 2) {
            document.getElementById("reverseAlliancesDiv").hidden = false
            document.getElementById("reverseAlliances").selectedIndex = 0
        } else {
            document.getElementById("reverseAlliancesDiv").hidden = true
            document.getElementById("reverseAlliances").selectedIndex = appManager.config.reverse_alliances
        }

        // Match scouting
        var showClassic = true
        if ("hideClassic" in appManager.game.prefs) {
            showClassic = !appManager.game.prefs.hideClassic
        }
        var showVisual = appManager.game.CanvasManager != undefined
        if (showVisual) {
            appManager.visualManager.loadData()
        }
        if (showVisual && showClassic) {
            document.getElementById("visualstart").innerHTML = "Scout! (visual)"
            document.getElementById("classicstart").innerHTML = "Scout! (classic)"
            document.getElementById("visualstart").hidden = false
            document.getElementById("classicstart").hidden = false
            document.getElementById("twobuttonbreak").hidden = false
        } else if (!showVisual) {
            document.getElementById("classicstart").innerHTML = "Scout!"
            document.getElementById("visualstart").hidden = true
            document.getElementById("classicstart").hidden = false
            document.getElementById("twobuttonbreak").hidden = true
        } else if (showVisual && !showClassic) {
            document.getElementById("visualstart").innerHTML = "Scout!"
            document.getElementById("visualstart").hidden = false
            document.getElementById("classicstart").hidden = true
            document.getElementById("twobuttonbreak").hidden = true
        }
        document.getElementById("loadingtext").hidden = true
        document.getElementById("startbuttons").hidden = false
        this.setSelection("match")

        // Add list of scouts
        if (appManager.scheduleAvailable()) {
            this.updateScoutList(appManager.schedule.scouts)
        } else {
            this.updateScoutList()
        }

        // Start scouting automatically in dev mode
        if (appManager.config.dev_mode == 1 && appManager.web) {
            document.getElementById("scoutselect").selectedIndex = 1
            document.getElementById("team").value = Math.floor(Math.random() * 9999)
            document.getElementById("match").value = Math.floor(Math.random() * 99)
            this.start("visual")
        }
    }

    // Create list of scouts based on config data
    this.updateScoutList = function (topScouts) {
        var key = appManager.scheduleAvailable() ? appManager.schedule.key : ""
        if (topScouts == undefined) {
            topScouts = []
        }

        if (key != noReloadScheduleKey || key == "") {
            var scoutSelect = document.getElementById("scoutselect")
            var selected = scoutSelect.value
            while (scoutSelect.firstChild) {
                scoutSelect.removeChild(scoutSelect.firstChild)
            }
            var extraScouts = JSON.parse(JSON.stringify(appManager.config.scouts))
            extraScouts = extraScouts.filter(function (scout) {
                return !topScouts.includes(scout.name)
            })

            // Add 'Please select' option
            var option = document.createElement("OPTION")
            option.innerHTML = "Please select"
            scoutSelect.appendChild(option)

            // Create list of top scouts
            if (topScouts.length > 0) {
                var optgroup = document.createElement("OPTGROUP")
                optgroup.label = "Upcoming Match"
                for (var scout in topScouts) {
                    var option = document.createElement("OPTION")
                    option.innerHTML = topScouts[scout]
                    optgroup.appendChild(option)
                }
                scoutSelect.appendChild(optgroup)
            }

            // Create list of all other scouts
            var optgroup = document.createElement("OPTGROUP")
            optgroup.label = "All Scouts"
            for (var scout in extraScouts) {
                var option = document.createElement("OPTION")
                option.innerHTML = extraScouts[scout].name
                optgroup.appendChild(option)
            }
            scoutSelect.appendChild(optgroup)

            if (selected != "") {
                scoutSelect.value = selected
            }
        }

        noReloadScheduleKey = key
    }

    // Update schedule table based on data
    this.loadSchedule = function () {
        // Update scout list if needed
        if (appManager.schedule.key != hiddenScheduleKey) {
            this.updateScoutList(appManager.schedule.scouts)
        } else {
            this.updateScoutList()
        }

        // Hide div if needed
        document.getElementById("scheduleDiv").hidden = (!appManager.scheduleAvailable()) || (appManager.schedule.key == hiddenScheduleKey)

        var scheduleTable = document.getElementById("schedule")
        while (scheduleTable.firstChild) {
            scheduleTable.removeChild(scheduleTable.firstChild)
        }
        if (appManager.scheduleAvailable()) {
            document.getElementById("schedulematch").innerHTML = appManager.schedule.match
            var teamRow = document.createElement("TR")
            var scoutRow = document.createElement("TR")
            for (var i in appManager.schedule.teams) {
                var teamCell = document.createElement("TD")
                var scoutCell = document.createElement("TD")
                teamCell.classList.add("schedule")
                scoutCell.classList.add("schedule")
                teamCell.innerHTML = appManager.schedule.teams[i]
                scoutCell.innerHTML = appManager.schedule.scouts[i]
                if (i < 3) {
                    teamCell.style.backgroundColor = "#87c3ff"
                    scoutCell.style.backgroundColor = "#87c3ff"
                } else {
                    teamCell.style.backgroundColor = "#ff6e6e"
                    scoutCell.style.backgroundColor = "#ff6e6e"
                }
                teamRow.appendChild(teamCell)
                scoutRow.appendChild(scoutCell)
            }
            scheduleTable.appendChild(teamRow)
            scheduleTable.appendChild(scoutRow)
        }
    }

    // Switch between match and pit scouting selections
    this.setSelection = function (type) {
        document.getElementById("selectionDiv_matchswitch").hidden = (type != "match") || appManager.game.prefs.pitFields == undefined
        document.getElementById("selectionDiv_pitswitch").hidden = (type != "pit")
        document.getElementById("selectionDiv_match").hidden = (type != "match")
        document.getElementById("selectionDiv_pit").hidden = (type != "pit")
    }

    // Set team and match from schedule
    this.autoFillTeamMatch = function () {
        if (appManager.schedule) {
            var scout = document.getElementById("scoutselect").value
            if (appManager.schedule.scouts.includes(scout)) {
                document.getElementById("team").value = appManager.schedule.teams[appManager.schedule.scouts.indexOf(scout)]
                document.getElementById("match").value = appManager.schedule.match
            } else {
                clearTeamMatch()
            }
        } else {
            clearTeamMatch()
        }

        function clearTeamMatch() {
            document.getElementById("team").value = ""
            document.getElementById("match").value = ""
        }
    }

    // Open scouting interface
    this.start = function (mode) {
        scoutMode = mode

        if (mode == "pit") {
            appManager.team = document.getElementById("pitTeam").value
            if (appManager.team == "" || document.getElementById("scoutselect").value == "Please select") {
                appManager.notificationManager.alert("Hold Your Horses!", "Please enter a scout name and team number.")
                return
            }
            appManager.state = 5

            appManager.classicManager.start()

            document.getElementById("pitNumber").innerHTML = appManager.team
            document.getElementById("pitSwitcherDiv").hidden = false
            document.getElementById("pitClassicDiv").hidden = false

        } else {
            appManager.team = document.getElementById("team").value
            appManager.match = document.getElementById("match").value
            if (appManager.team == "" || appManager.match == "" || document.getElementById("scoutselect").value == "Please select") {
                appManager.notificationManager.alert("Hold Your Horses!", "Please enter a scout name, team number, and match number.")
                return
            }
            appManager.state = 1

            if (appManager.schedule) {
                tempHiddenScheduleKey = appManager.schedule.key
            }

            appManager.classicManager.start()
            appManager.visualManager.start()

            document.getElementsByClassName("switcherbutton1")[0].style.fontWeight = "bold"
            document.getElementsByClassName("switcherbutton2")[0].style.fontWeight = "normal"
            document.getElementsByClassName("switcherbutton3")[0].style.fontWeight = "normal"
            document.getElementsByClassName("switcherbutton1")[0].style.backgroundColor = highlightLookup[0]
            document.getElementsByClassName("switcherbutton2")[0].style.backgroundColor = ""
            document.getElementsByClassName("switcherbutton3")[0].style.backgroundColor = ""
            document.getElementsByClassName("switcherbutton1")[0].style.boxShadow = "0px 5px 10px grey"
            document.getElementsByClassName("switcherbutton2")[0].style.boxShadow = ""
            document.getElementsByClassName("switcherbutton3")[0].style.boxShadow = ""
            document.getElementsByClassName("switcherbutton1")[0].style.zIndex = "2"
            document.getElementsByClassName("switcherbutton2")[0].style.zIndex = ""
            document.getElementsByClassName("switcherbutton3")[0].style.zIndex = ""
            document.getElementById("modeSwitcherDiv").hidden = false
            var showClassic = appManager.game.prefs.forceClassic["auto"] || scoutMode == "classic"
            document.getElementById("visualCanvasDiv").hidden = showClassic
            document.getElementById("classicDiv1").hidden = !showClassic
        }

        this.updateHelpButton()
        document.getElementById("selectionDiv").hidden = true
        appManager.serverManager.heartbeat()
    }

    // Switch b/t auto, teleop, and endgame
    this.setMode = function (mode) {
        document.getElementsByClassName("switcherbutton" + appManager.state)[0].style.fontWeight = "normal"
        document.getElementsByClassName("switcherbutton" + appManager.state)[0].style.backgroundColor = ""
        document.getElementsByClassName("switcherbutton" + appManager.state)[0].style.boxShadow = ""
        document.getElementsByClassName("switcherbutton" + appManager.state)[0].style.zIndex = ""
        appManager.state = mode
        document.getElementsByClassName("switcherbutton" + appManager.state)[0].style.fontWeight = "bold"
        document.getElementsByClassName("switcherbutton" + appManager.state)[0].style.backgroundColor = highlightLookup[appManager.state - 1]
        document.getElementsByClassName("switcherbutton" + appManager.state)[0].style.boxShadow = "0px 5px 10px grey"
        document.getElementsByClassName("switcherbutton" + appManager.state)[0].style.zIndex = 2
        document.getElementById("visualCanvasDiv").hidden = appManager.game.prefs.forceClassic[modeLookup[appManager.state - 1]] || scoutMode == "classic"
        document.getElementById("classicDiv1").hidden = !((appManager.game.prefs.forceClassic["auto"] || scoutMode == "classic") && appManager.state == 1)
        document.getElementById("classicDiv2").hidden = !((appManager.game.prefs.forceClassic["teleop"] || scoutMode == "classic") && appManager.state == 2)
        document.getElementById("classicDiv3").hidden = !((appManager.game.prefs.forceClassic["endgame"] || scoutMode == "classic") && appManager.state == 3)
        this.updateHelpButton()
        appManager.visualManager.setMode(mode)
        window.scrollTo(0, 0)
        appManager.serverManager.heartbeat()
    }

    // Hide or show help button based on mode
    const helpModeLookup = {
        1: "auto",
        2: "teleop",
        3: "endgame",
        5: "pit"
    }
    this.updateHelpButton = function () {
        var showButton = false
        if ((appManager.state >= 1 && appManager.state <= 3) || appManager.state == 5) {
            if (appManager.game.prefs.helpText != undefined) {
                if (appManager.game.prefs.helpText[helpModeLookup[appManager.state]] != undefined) {
                    showButton = true
                }
            }
        }
        document.getElementById("helpButtonDiv").hidden = !showButton
    }

    // Set help text based on mode and show
    var lastHelpOpened = 0
    this.showHelp = function () {
        var helpText = document.getElementById("helpTextDiv")
        helpText.children[1].children[1].innerHTML = appManager.game.prefs.helpText[helpModeLookup[appManager.state]]
        helpText.hidden = false
        if (lastHelpOpened != appManager.state) {
            helpText.children[1].children[1].scrollTop = 0
            lastHelpOpened = appManager.state
        }
    }

    // Hide help text
    this.hideHelp = function () {
        document.getElementById("helpTextDiv").hidden = true
    }

    // Logic operator lookup for upload check
    const operators = {
        "==": function (a, b) { return a == b },
        "!=": function (a, b) { return a != b },
        ">": function (a, b) { return a > b },
        "<": function (a, b) { return a < b },
        ">=": function (a, b) { return a >= b },
        "=>": function (a, b) { return a >= b },
        "<=": function (a, b) { return a <= b },
        "=<": function (a, b) { return a <= b }
    }

    // Confirm upload & leave scouting interface
    var dataTemp
    var checkStage = -1
    this.upload = function () {
        try {
            dataTemp = getData()
        } catch (error) {
            appManager.notificationManager.alert("Error", "Could not upload: " + error.message)
            return
        }
        var checks = []
        if (appManager.game.prefs.uploadChecks == undefined) {
            checks = []
        } else {
            if (scoutMode == "pit") {
                checks = appManager.game.prefs.uploadChecks.pit
            } else {
                checks = appManager.game.prefs.uploadChecks.match
            }
        }

        var start = 0
        if (checkStage != -1) {
            start = checkStage + 1
        }
        for (var i = start; i < checks.length; i++) {
            checkStage = i
            var check = checks[i]
            if (check.script != undefined) {
                var checkField = new Function("data", check.script)
                if (!checkField(dataTemp)) {
                    failAlert(check)
                    return
                }
            } else {
                if (dataTemp[check.field] != undefined) {
                    if (!operators[check.operator](dataTemp[check.field], check.value)) {
                        failAlert(check)
                        return
                    }
                }
            }
        }

        function failAlert(check) {
            if (check.binding) {
                appManager.notificationManager.alert("Check Failed", check.message)
                checkStage = -1
            } else {
                appManager.notificationManager.confirm("Check Failed", check.message, ["Continue", "Cancel"], function (result) {
                    if (result == 1) {
                        appManager.scoutManager.upload()
                    } else {
                        checkStage = -1
                    }
                })
            }
        }

        if (checkStage == checks.length - 1) {
            checkStage = -1
            appManager.notificationManager.confirm("Upload?", "Are you sure you're ready to upload data?", ["Upload", "Cancel"], function (result) {
                if (result == 1) {
                    saveData(dataTemp)
                    if (appManager.schedule) {
                        hiddenScheduleKey = tempHiddenScheduleKey
                        appManager.scoutManager.loadSchedule()
                    }
                    appManager.serverManager.upload()
                    appManager.scoutManager.close(true, false)
                }
            })
        }
    }

    // Add new keys to source
    function merge(source, appended) {
        var keys = Object.keys(appended)
        for (var i = 0; i < keys.length; i++) {
            source[keys[i]] = appended[keys[i]]
        }
        return source
    }

    // Retrieve & combine data from classic and visual managers
    function getData() {
        var data = {}
        if (scoutMode != "pit") {
            data = appManager.visualManager.getData()
        }
        data = merge(data, appManager.classicManager.getData(scoutMode))
        return data
    }

    // Write match to local storage
    function saveData(data) {
        data["Event"] = appManager.config.event
        data["Team"] = Number(appManager.team)
        if (scoutMode != "pit") {
            data["Match"] = Number(appManager.match)
        }
        data["DeviceName"] = window.localStorage.getItem("advantagescout_device")
        if (appManager.web) {
            data["Version"] = "web"
        } else {
            data["Version"] = cordova.platformId + " " + appManager.settingsManager.getVersion()
        }
        data["InterfaceType"] = scoutMode
        data["Time"] = Math.round(Date.now() / 1000)
        data["ScoutName"] = document.getElementById("scoutselect").value
        var saved = JSON.parse(window.localStorage.getItem("advantagescout_scoutdata"))
        saved.push(data)
        window.localStorage.setItem("advantagescout_scoutdata", JSON.stringify(saved))
    }

    //Transition to team match selection
    this.close = function (resetFields, forceTitle) {
        document.getElementById("modeSwitcherDiv").hidden = true
        document.getElementById("pitSwitcherDiv").hidden = true
        document.getElementById("classicDiv1").hidden = true
        document.getElementById("classicDiv2").hidden = true
        document.getElementById("classicDiv3").hidden = true
        document.getElementById("pitClassicDiv").hidden = true
        document.getElementById("visualCanvasDiv").hidden = true

        if (!forceTitle && !appManager.serverManager.connected()) {
            appManager.state = 4
            document.getElementById("offlineWarningDiv").hidden = false
        } else {
            appManager.state = 0
            document.getElementById("selectionDiv").hidden = false
            document.getElementById("offlineWarningDiv").hidden = true
        }
        if (resetFields) {
            document.getElementById("pitTeam").value = ""
            document.getElementById("team").value = ""
            document.getElementById("match").value = ""
            document.getElementById("scoutselect").value = "Please select"
        }
        this.updateHelpButton()
        appManager.serverManager.heartbeat()
    }

    // Setup text resizing on app startup
    this.resizeTextInit = function () {
        window.addEventListener("resize", function () { appManager.scoutManager.resizeText() })
        this.resizeText()
    }

    // Update auto, teleop, endgame text based on screen width
    var lastAutoText = "Autonomous"
    var lastTeleopText = "Tele-operated"
    var lastEndgameText = "End Game"
    this.resizeText = function () {
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
}
