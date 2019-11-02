// Responsible for managing settings
function SettingsManager(appManager) {
    
    // Retrieve app version number
    var appVersion = ""
    this.getVersion = function() {
        if (!appManager.web) {
            cordova.getAppVersion.getVersionNumber(function(version) {
                                                   document.getElementsByClassName("versiontext")[0].innerHTML = "Version " + version.toString()
                                                   appVersion = version.toString()
                                                   })
        }
    }
    
    // Check version from server and alert if outdated
    var outdatedAlertSent = false
    this.checkVersion = function(checkVersion) {
        if (!appManager.web) {
            if (appVersion != checkVersion && !outdatedAlertSent) {
                outdatedAlertSent = true
                appManager.notificationManager.alert("Update Required", "This app version is outdated. Ask the scouting team for help updating.")
            }
        }
    }
    
    // Check if device name exists and open settings or write to text box
    this.checkDeviceName = function() {
        if (window.localStorage.getItem("advantagescout_device") == null) {
            this.open()
        } else if (!appManager.web) {
            document.getElementById("name").value = window.localStorage.getItem("advantagescout_device")
        }
    }
    
    // Update list of paired bluetooth devices
    this.refreshDeviceList = function() {
        if (!appManager.web) {
            bluetoothSerial.list(function(devices) {
                                 var serverSelect = document.getElementById("server")
                                 serverSelect.innerHTML = ""
                                 for (var i = 0; i < devices.length; i++) {
                                 var option = document.createElement("OPTION")
                                 option.value = devices[i].address
                                 option.innerHTML = devices[i].name
                                 serverSelect.appendChild(option)
                                 }
                                 
                                 if (window.localStorage.getItem("advantagescout_server") != null) {
                                 for (var i = 0; i < devices.length; i++) {
                                 if (devices[i].address == window.localStorage.getItem("advantagescout_server")) {
                                 serverSelect.selectedIndex = i
                                 }
                                 }
                                 }
                                 })
        }
    }
    
    // Create list in local storage for saved matches
    this.initLocalStorage = function() {
        if (window.localStorage.getItem("advantagescout_scoutdata") == null) {
            window.localStorage.setItem("advantagescout_scoutdata", "[]")
        }
        if (window.localStorage.getItem("advantagescout_server") == null) {
            window.localStorage.setItem("advantagescout_server", "")
        }
    }
    
    // Update local saved count on selection screen
    this.updateLocalCount = function() {
        var count = JSON.parse(window.localStorage.getItem("advantagescout_scoutdata")).length
        if (count == 0) {
            document.getElementById("localcount").innerHTML = "All matches uploaded"
        } else if (count == 1) {
            document.getElementById("localcount").innerHTML = "1 match saved locally"
        } else {
            document.getElementById("localcount").innerHTML = count + " matches saved locally"
        }
    }
    
    // Open settings screen
    this.open = function() {
        if (appManager.web) {
            window.location = "/config"
        } else {
            document.getElementById("selectionDiv").hidden = true
            document.getElementById("configDiv").hidden = false
        }
    }
    
    // Close settings screen
    this.close = function() {
        if (!appManager.web) {
            document.getElementById("selectionDiv").hidden = false
            document.getElementById("configDiv").hidden = true
            window.localStorage.setItem("advantagescout_device", document.getElementById("name").value)
            window.localStorage.setItem("advantagescout_server", document.getElementById("server").value)
        }
    }
}
