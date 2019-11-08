// Responsible for managing scouting screen
function ScoutManager(appManager) {
    const modeLookup = ["auto", "teleop", "endgame"]
    var scoutMode
    
    // Load config and game data
    this.loadData = function() {
        // Reverse alliances
        if (appManager.config.reverse_alliances == 2) {
            document.getElementById("reverseAlliancesDiv").hidden = false
            document.getElementById("reverseAlliances").selectedIndex = 0
        } else {
            document.getElementById("reverseAlliancesDiv").hidden = true
            document.getElementById("reverseAlliances").selectedIndex = appManager.config.reverse_alliances
        }
        
        // Match scouting
        if (appManager.game.CanvasManager) {
            appManager.visualManager.loadData()
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
        
        // Pit scouting
        var hidePitButton = appManager.game.prefs.pitFields == undefined
        document.getElementById("pitButton").hidden = hidePitButton
        document.getElementById("pitButtonBreak").hidden = hidePitButton
        
        // Start scouting automatically in dev mode
        if (appManager.config.dev_mode == 1 && appManager.web) {
            document.getElementById("team").value = 1
            document.getElementById("match").value = 1
            this.start("visual")
        }
    }
    
    // Switch between match and pit scouting selections
    this.setSelection = function(type) {
        document.getElementById("selectionDiv_match").hidden = (type != "match")
        document.getElementById("selectionDiv_pit").hidden = (type != "pit")
    }
    
    // Open scouting interface
    this.start = function(mode) {
        scoutMode = mode
        
        if (mode == "pit") {
            appManager.team = document.getElementById("pitTeam").value
            if (appManager.team == "") {
                appManager.notificationManager.alert("Hold Your Horses!", "Please enter a team number.")
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
            if (appManager.team == "" && appManager.match == "") {
                appManager.notificationManager.alert("Hold Your Horses!", "Please enter a team and match number.")
                return
            }
            if (appManager.team == "") {
                appManager.notificationManager.alert("Hold Your Horses!", "Please enter a team number.")
                return
            }
            if (appManager.match == "") {
                appManager.notificationManager.alert("Hold Your Horses!", "Please enter a match number.")
                return
            }
            appManager.state = 1
            
            appManager.classicManager.start()
            appManager.visualManager.start()
            
            document.getElementsByClassName("switcherbutton1")[0].style.fontWeight = "bold"
            document.getElementsByClassName("switcherbutton2")[0].style.fontWeight = "normal"
            document.getElementsByClassName("switcherbutton3")[0].style.fontWeight = "normal"
            document.getElementById("modeSwitcherDiv").hidden = false
            var showClassic = appManager.game.prefs.forceClassic["auto"] || scoutMode == "classic"
            document.getElementById("visualCanvasDiv").hidden = showClassic
            document.getElementById("classicDiv1").hidden = !showClassic
        }
        
        document.getElementById("selectionDiv").hidden = true
        appManager.serverManager.heartbeat()
    }
    
    // Switch b/t auto, teleop, and endgame
    this.setMode = function(mode) {
        document.getElementsByClassName("switcherbutton" + appManager.state)[0].style.fontWeight = "normal"
        appManager.state = mode
        document.getElementsByClassName("switcherbutton" + appManager.state)[0].style.fontWeight = "bold"
        document.getElementById("visualCanvasDiv").hidden = appManager.game.prefs.forceClassic[modeLookup[appManager.state - 1]] || scoutMode == "classic"
        document.getElementById("classicDiv1").hidden = !((appManager.game.prefs.forceClassic["auto"] || scoutMode == "classic") && appManager.state == 1)
        document.getElementById("classicDiv2").hidden = !((appManager.game.prefs.forceClassic["teleop"] || scoutMode == "classic") && appManager.state == 2)
        document.getElementById("classicDiv3").hidden = !((appManager.game.prefs.forceClassic["endgame"] || scoutMode == "classic") && appManager.state == 3)
        appManager.visualManager.setMode(mode)
        window.scrollTo(0, 0)
        appManager.serverManager.heartbeat()
    }
    
    // Confirm upload & leave scouting interface
    this.upload = function() {
        appManager.notificationManager.confirm("Upload?", "Are you sure you're ready to upload data?", ["Upload", "Cancel"], function(result) {
                                               if (result == 1) {
                                               appManager.scoutManager.saveData()
                                               appManager.serverManager.upload()
                                               appManager.scoutManager.close(true, false)
                                               }
                                               })
    }
    
    // Write match to local storage
    this.saveData = function() {
        var data = {}
        if (scoutMode != "pit") {
            data = appManager.visualManager.getData()
        }
        Object.assign(data, appManager.classicManager.getData(scoutMode))
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
        var saved = JSON.parse(window.localStorage.getItem("advantagescout_scoutdata"))
        saved.push(data)
        window.localStorage.setItem("advantagescout_scoutdata", JSON.stringify(saved))
    }
    
    //Transition to team match selection
    this.close = function(resetFields, forceTitle) {
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
            if (appManager.web) {
                document.getElementById("offlineWarningDiv").hidden = true
            }
        }
        if (resetFields) {
            document.getElementById("pitTeam").value = ""
            document.getElementById("team").value = ""
            document.getElementById("match").value = ""
        }
        appManager.serverManager.heartbeat()
    }
    
    // Setup text resizing on app startup
    this.resizeTextInit = function() {
        window.addEventListener("resize", function() {appManager.scoutManager.resizeText()})
        this.resizeText()
    }
    
    // Update auto, teleop, endgame text based on screen width
    var lastAutoText = "Autonomous"
    var lastTeleopText = "Tele-operated"
    var lastEndgameText = "End Game"
    this.resizeText = function() {
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
