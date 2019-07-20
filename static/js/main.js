var connected = true
var connectedText = document.getElementById("onlinetext")
var state = 0
var team = 0
var match = 0

function heartbeat() {
    const http = new XMLHttpRequest()
    
    http.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                connected = true
                connectedText.style.color = "green"
                connectedText.innerHTML = "Online"
            } else {
                connected = false
                connectedText.style.color = "red"
                connectedText.innerHTML = "Offline"
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
                    GameCanvasManager = new Function("canvas", "reverseAlliances", gameData["CanvasManager"])
                }
                catch(error) {
                    alert("Failed to load game data. (" + error.message + ")")
                }
                canvasManager = new GameCanvasManager(document.getElementsByClassName("visualcanvas")[0], config.reverse_alliances == 1)
            } else {
                alert("Failed to retrieve game data (" + this.status + " " + this.statusText + " error)")
            }
        }
    }
    
    http.timeout = 10000
    http.open("GET", "/load_game", true)
    http.send()
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
    document.getElementById("selectionDiv").hidden = true
    document.getElementById("modeSwitcherDiv").hidden = false
    var showClassic = gameData.prefs.forceClassic["auto"] || scoutMode == "classic"
    document.getElementById("visualCanvasDiv").hidden = showClassic
    document.getElementById("classicDiv1").hidden = !showClassic
    heartbeat()
}

//Switch b/t auto, teleop, and endgame
function setMode(mode) {
    document.getElementsByClassName("switcherbutton" + state)[0].style.fontWeight = "normal"
    state = mode
    document.getElementsByClassName("switcherbutton" + state)[0].style.fontWeight = "bold"
    lookup = ["auto", "teleop", "endgame"]
    document.getElementById("visualCanvasDiv").hidden = gameData.prefs.forceClassic[lookup[state - 1]] || scoutMode == "classic"
    document.getElementById("classicDiv1").hidden = !((gameData.prefs.forceClassic["auto"] || scoutMode == "classic") && state == 1)
    document.getElementById("classicDiv2").hidden = !((gameData.prefs.forceClassic["teleop"] || scoutMode == "classic") && state == 2)
    document.getElementById("classicDiv3").hidden = !((gameData.prefs.forceClassic["endgame"] || scoutMode == "classic") && state == 3)
    canvasManager.setMode(state - 1)
    heartbeat()
    
}

// Check for device name
if (window.localStorage.getItem("advantagescout_device") == null) {
    window.location = "/config"
} else {
    getConfig()
    heartbeat()
    setInterval(function() {heartbeat()}, 3000)
}
