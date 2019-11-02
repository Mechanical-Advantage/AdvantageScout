// Responsible for managing communication with the server on mobile app
function AppServerManager(appManager) {
    
    // Start sending heartbeats regularly
    this.initHeartbeatLoop = function() {
        this.heartbeat()
        this.upload()
        setInterval(function() {appManager.serverManager.heartbeat(); appManager.serverManager.upload()}, 20000)
    }
    
    // Send heartbeat if not already in queue
    var heartbeatQueued = false
    this.heartbeat = function() {
        if (!heartbeatQueued) {
            heartbeatQueued = true
            addToSerialQueue("heartbeat", function() {
                             if (appManager.state == 0) {
                             return [appManager.state]
                             } else {
                             return [appManager.state, appManager.team, appManager.match]
                             }
                             }, function() {
                             heartbeatQueued = false
                             })
        }
    }
    
    // Upload saved matches
    this.upload = function() {
        //appManager.notificationManager.alert("Upload", "Trying to upload")
    }
    
    // Init serial queue
    var serialQueue = []
    
    // Add item to queue and push if needed
    function addToSerialQueue(query, args, response) {
        serialQueue.push({"query": query, "args": args, "response": response})
        if (serialQueue.length == 1) {
            pushSerialQueue()
        }
    }
    
    // Get length of time to wait after failed communication
    function getRetryDelay() {
        return Math.random() * 6000
    }
    
    // Disconnect and try again
    function timeoutPushSerialQueue() {
        bluetoothSerial.unsubscribe()
        bluetoothSerial.disconnect()
        setTimeout(function() {pushSerialQueue()}, getRetryDelay())
    }
    
    // Send items in serial queue to server
    function pushSerialQueue() {
        var responses = []
        var timeout
        bluetoothSerial.isEnabled(function(){
                                  btEnabled()
                                  }, function() {
                                  setTimeout(function() {pushSerialQueue()}, getRetryDelay())
                                  })
        function btEnabled() {
            if (window.localStorage.getItem("advantagescout_device") == null || window.localStorage.getItem("advantagescout_server") == null || window.localStorage.getItem("advantagescout_device") == "" || window.localStorage.getItem("advantagescout_server") == "") {
                setTimeout(function() {pushSerialQueue()}, getRetryDelay())
            } else {
                bluetoothSerial.connect(window.localStorage.getItem("advantagescout_server"), function() {
                                        bluetoothSerial.subscribe("\n", function(data) {
                                                                  clearTimeout(timeout)
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
                                        timeout = setTimeout(function() {timeoutPushSerialQueue()}, 5000)
                                        }, function() {
                                        setTimeout(function() {pushSerialQueue()}, getRetryDelay())
                                        })
            }
        }
    }
}
