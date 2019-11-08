// Responsible for managing communication with the server on mobile app
function AppServerManager(appManager) {
    var serialQueue = []
    
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
    var uploadQueued = false
    this.imageCache = {}
    this.imageCacheTarget = 0
    this.upload = function() {
        if (JSON.parse(window.localStorage.getItem("advantagescout_scoutdata")).length > 0 && !uploadQueued) {
            uploadQueued = true
            var imageQueue = getCacheQueue()
            this.imageCache = {}
            this.imageCacheTarget = imageQueue.length
            if (imageQueue.length > 0) {
                for (var z = 0; z < imageQueue.length; z++) {
                    readImage(imageQueue[z], function(imageData, fileName) {
                              appManager.serverManager.imageCache[fileName] = imageData
                              
                              if (Object.keys(appManager.serverManager.imageCache).length == appManager.serverManager.imageCacheTarget) {
                              send()
                              }
                              })
                }
            } else {
                send()
            }
            
            function send() {
                
                addToSerialQueue("upload", appManager.serverManager.getUploadData, function(data) {
                                 uploadQueued = false
                                 var response = JSON.parse(data)[1]
                                 if (response.success) {
                                 var stored = JSON.parse(window.localStorage.getItem("advantagescout_scoutdata"))
                                 stored.splice(0, response.count)
                                 window.localStorage.setItem("advantagescout_scoutdata", JSON.stringify(stored))
                                 }
                                 appManager.settingsManager.updateLocalCount()
                                 })
            }
        }
        appManager.settingsManager.updateLocalCount()
    }
    
    // Process local storage data to get file paths
    function getCacheQueue() {
        var output = []
        var localData = JSON.parse(window.localStorage.getItem("advantagescout_scoutdata"))
        for (var i = 0; i < localData.length; i++) {
            var fields = Object.keys(localData[i])
            for (var f = 0; f < fields.length; f++) {
                var value = localData[i][fields[f]]
                if (value.length > 8) {
                    if (value.slice(0, 8) == "file:///") {
                        output.push(value)
                    }
                }
            }
        }
        return output
    }
    
    // Get image file as base 64
    function readImage(path, callback){
        window.resolveLocalFileSystemURL(path, onSuccess, function() {});
        
        function onSuccess(fileEntry) {
            fileEntry.file(function(file) {
                           var reader = new FileReader();
                           reader.onloadend = function(e) {
                           var content = this.result;
                           callback(String(content), this["_localURL"].split("/").pop());
                           }
                           reader.readAsDataURL(file);
                           })
        }
    }
    
    // Process local storage data for upload
    this.getUploadData = function() {
        var localData = JSON.parse(window.localStorage.getItem("advantagescout_scoutdata"))
        for (var i = 0; i < localData.length; i++) {
            var fields = Object.keys(localData[i])
            for (var f = 0; f < fields.length; f++) {
                var value = localData[i][fields[f]]
                var fileName = String(value).split("/").pop()
                if (appManager.serverManager.imageCache[fileName] != undefined) {
                    localData[i][fields[f]] = appManager.serverManager.imageCache[fileName]
                }
            }
        }
        return [JSON.stringify(localData)]
    }
    
    // Get config and game data from server
    var loadDataQueued = false
    this.getData = function() {
        if (!loadDataQueued) {
            loadDataQueued = true
            addToSerialQueue("load_data", function() {return []}, function(data) {
                             loadDataQueued = false
                             data = JSON.parse(data)[1]
                             appManager.loadData(data.config, data.game, data.version, false)
                             })
        }
    }
    
    // Report if connected to server
    this.connected = function() {
        return true
    }

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
                                        function loadData() {
                                            //alert(serialQueue[0].query)
                                            data = JSON.stringify([window.localStorage.getItem("advantagescout_device"), serialQueue[0].query, serialQueue[0].args()])
                                            appManager.serverManager.serialWrite(data, onReceived)
                                        }
                                        
                                        function onReceived(data) {
                                            serialQueue.shift().response(data)
                                            if (serialQueue.length == 0) {
                                                bluetoothSerial.disconnect()
                                            } else {
                                                loadData()
                                            }
                                        }
                                        
                                        loadData()
                                        //timeout = setTimeout(function() {timeoutPushSerialQueue()}, 5000)
                                        }, function() {
                                        setTimeout(function() {pushSerialQueue()}, getRetryDelay())
                                        })
            }
        }
    }
    
    // Writes data in pieces to server
    this.continueQueue = []
    this.sendResponse
    var breakFrequency = 5000 // how many bytes at a time?
    this.serialWrite = function(data, callback) {
        this.sendResponse = callback
        
        // Break up data
        this.continueQueue = []
        var dataLeft = data
        while (dataLeft.length > breakFrequency) {
            this.continueQueue.push(dataLeft.slice(0, breakFrequency) + "CONT")
            dataLeft = dataLeft.slice(breakFrequency)
        }
        this.continueQueue.push(dataLeft)
        
        // Send data
        bluetoothSerial.subscribe("\n", function(data) {
                                  if (data.slice(-5) == "CONT\n") {
                                  bluetoothSerial.write(appManager.serverManager.continueQueue.shift() + "\n", function() {}, function() {})
                                  } else {
                                  appManager.serverManager.sendResponse(data)
                                  }
                                  })
        bluetoothSerial.write(this.continueQueue.shift() + "\n", function() {}, function() {})
    }
}
