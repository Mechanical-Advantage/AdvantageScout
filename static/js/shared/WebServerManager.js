// Responsible for managing communication with the server on web
function WebServerManager(appManager) {
    var connected = true
    var connectedText = document.getElementById("onlinetext")
    
    // Start sending heartbeats regularly
    this.initHeartbeatLoop = function() {
        this.heartbeat()
        setInterval(function() {appManager.serverManager.heartbeat()}, 20000)
    }
    
    // Send heartbeat
    this.heartbeat = function() {
        const http = new XMLHttpRequest()
        
        http.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    connected = true
                    connectedText.style.color = "green"
                    connectedText.innerHTML = "Online"
                    appManager.serverManager.upload()
                } else {
                    connected = false
                    connectedText.style.color = "red"
                    connectedText.innerHTML = "Offline"
                    appManager.settingsManager.updateLocalCount()
                }
            }
        }
        
        http.timeout = 2000
        http.open("PUT", "/heartbeat", true)
        http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        var teammatch = ""
        if (appManager.state >= 1 && appManager.state <= 3) {
            teammatch = "&team=" + appManager.team + "&match=" + appManager.match
        }
        http.send("device_name=" + encodeURI(window.localStorage.getItem("advantagescout_device")) + "&state=" + appManager.state.toString() + teammatch)
    }
    
    // Upload saved matches
    this.upload = function() {
        //appManager.notificationManager.alert("Upload", "Trying to upload")
    }
}
