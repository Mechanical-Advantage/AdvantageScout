// Responsible for managing settings
function SettingsManager(appManager) {
    var cacheExpiration = 86400 //time to allow use of cached game data/config/version (seconds)

    // Retrieve app version number from cordova
    var appVersion = ""
    var appMode = "Unknown"
    var appVersionRemote = ""
    var outdatedAlertSent = false
    this.loadVersion = function () {
        if (!appManager.web) {
            cordova.getAppVersion.getVersionNumber(function (version) {
                cordova.plugins.IsDebug.getIsDebug(function (isDebug) {
                    appMode = isDebug ? "Debug" : "Release"
                    document.getElementsByClassName("versiontext")[0].innerHTML = appMode + " " + version.toString()
                    appVersion = version.toString()
                    if (appVersionRemote != "") {
                        var compareResult = compareVersions(appVersion, appVersionRemote)
                        if (compareResult != "same" && !outdatedAlertSent) {
                            outdatedAlertSent = true
                            if (compareResult == "older") {
                                appManager.notificationManager.alert("Update Recommended", "This app version is outdated. Ask the scouting team for help updating.")
                            } else {
                                appManager.notificationManager.alert("Server Outdated", "This app version may not be compatable with the server. Please talk to the scouting team for more information.")
                            }
                        }
                    }
                }, function () {
                    appManager.notificationManager.alert("Error", "Could not determine if running in debug mode")
                })
            })
        }
    }

    // Return current app version
    this.getVersion = function () {
        return appVersion
    }

    // Check version from server and alert if outdated
    this.checkVersion = function (checkVersion) {
        if (!appManager.web) {
            appVersionRemote = checkVersion
            if (appVersion != "") {
                this.loadVersion()
            }
        }
    }

    // Check if older or newer
    function compareVersions(local, remote) {
        var local = local.split(".")
        var remote = remote.split(".")
        var result = "same"
        for (var i = 0; i < 3; i++) {
            if (Number(local[i]) < Number(remote[i])) {
                result = "older"
                break
            } else if (Number(local[i]) > Number(remote[i])) {
                result = "newer"
                break
            }
        }
        return result
    }

    // Check if device name exists and open settings or write to text box
    this.divSetup = function () {
        if (window.localStorage.getItem("advantagescout_device") == null) {
            this.open()
        } else if (!appManager.web) {
            document.getElementById("name").value = window.localStorage.getItem("advantagescout_device")
            document.getElementById("imageQuality").value = window.localStorage.getItem("advantagescout_imagequality")
        }
        this.updateCacheTime()
    }

    // Create list in local storage for saved matches
    this.initLocalStorage = function () {
        if (window.localStorage.getItem("advantagescout_scoutdata") == null) {
            window.localStorage.setItem("advantagescout_scoutdata", "[]")
        }
        if (window.localStorage.getItem("advantagescout_imagequality") == null) {
            window.localStorage.setItem("advantagescout_imagequality", "25")
        }
    }

    // Write config and game into local storage
    this.saveDataCache = function (config, game, version) {
        window.localStorage.setItem("advantagescout_datacache", JSON.stringify({ "config": config, "game": game, "version": version }))
        window.localStorage.setItem("advantagescout_datacachetimestamp", Math.round(Date.now() / 1000))
        this.updateCacheTime()
    }

    // Update time of last dat cache
    this.updateCacheTime = function () {
        if (!appManager.web) {
            function formatDate(time) {
                var date = new Date(time * 1000)
                var month = date.getMonth() + 1
                var day = date.getDate()
                var hours = date.getHours()
                var minutes = date.getMinutes()
                var ampm = hours >= 12 ? "pm" : "am"
                hours = hours % 12
                hours = hours ? hours : 12 // the hour '0' should be '12'
                minutes = minutes < 10 ? "0" + minutes : minutes
                var strTime = month + "/" + day + " " + hours + ':' + minutes + ' ' + ampm
                return strTime
            }

            if (window.localStorage.getItem("advantagescout_datacachetimestamp") != null) {
                document.getElementById("cacheTime").innerHTML = formatDate(window.localStorage.getItem("advantagescout_datacachetimestamp"))
            }
        }
    }

    // Read config and game from local storage (if not expired)
    this.loadDataCache = function () {
        if (window.localStorage.getItem("advantagescout_datacache") != null) {
            if (Math.round(Date.now() / 1000) - window.localStorage.getItem("advantagescout_datacachetimestamp") < cacheExpiration) {
                var parsed = JSON.parse(window.localStorage.getItem("advantagescout_datacache"))
                appManager.loadData(parsed.config, parsed.game, parsed.version, true)
            }
        }
    }

    // Update local saved count on selection screen
    this.updateLocalCount = function () {
        if (!uploadLock) {
            var count = JSON.parse(window.localStorage.getItem("advantagescout_scoutdata")).length
            if (count == 0) {
                document.getElementById("localcount").innerHTML = "All matches uploaded"
            } else if (count == 1) {
                document.getElementById("localcount").innerHTML = "1 match saved locally"
            } else {
                document.getElementById("localcount").innerHTML = count + " matches saved locally"
            }
        }
    }

    // Display uploading message and percent
    var uploadLock = false
    this.setUploadProgress = function (current, total) {
        uploadLock = true
        var percent = Math.round((current / total) * 100).toString()
        document.getElementById("localcount").innerHTML = "Uploading... (" + percent + "%)"
    }

    // Switch from upload progress to matches saved display
    this.hideUploadProgress = function () {
        uploadLock = false
        this.updateLocalCount()
    }

    // Open settings screen
    this.open = function () {
        if (appManager.web) {
            window.location = "/config"
        } else {
            document.getElementById("selectionDiv").hidden = true
            document.getElementById("configDiv").hidden = false
        }
    }

    // Close settings screen
    this.close = function () {
        if (!appManager.web) {
            document.getElementById("selectionDiv").hidden = false
            document.getElementById("configDiv").hidden = true
            window.localStorage.setItem("advantagescout_device", document.getElementById("name").value)
            window.localStorage.setItem("advantagescout_imagequality", document.getElementById("imageQuality").value)
            appManager.serverManager.getData()
        }
    }
}
