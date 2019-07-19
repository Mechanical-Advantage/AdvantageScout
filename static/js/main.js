var connected = true
var connectedText = document.getElementById("onlinetext")
var state = 0
var team = 0
var match = 0

function ping() {
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
    
    http.ontimeout = function(e) {
        connected = false
        connectedText.style.color = "red"
        connectedText.innerHTML = "Offline"
    }
    
    http.timeout = 2000
    http.open("POST", "/heartbeat", true)
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
                    GameCanvasManager = new Function("canvas", gameData["CanvasManager"])
                }
                catch(error) {
                    alert("Failed to load game data. (" + error.message + ")")
                }
                canvasManager = new GameCanvasManager(document.createElement("CANVAS"))
            } else {
                alert("Failed to retrieve game data. Please try again.")
            }
        }
    }
    
    http.open("GET", "/load_game", true)
    http.send()
}

function scoutStart(mode) {
    state = 1
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
    document.getElementById("selectionDiv").hidden = true
}

// Check for device name
if (window.localStorage.getItem("advantagescout_device") == null) {
    window.location = "/config"
} else {
    loadGame()
    ping()
    setInterval(function() {ping()}, 3000)
}
