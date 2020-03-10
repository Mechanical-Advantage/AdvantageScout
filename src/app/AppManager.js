// Responsible for overall commands and coordination between managers
function AppManager(web) {
    this.web = web
    this.state = 0
    this.team
    this.match
    this.config
    this.game
    this.schedule
    this.battery = -1
    this.charging = 0

    // Instantiate managers
    this.settingsManager = new SettingsManager(this)
    this.scoutManager = new ScoutManager(this)
    this.classicManager = new ClassicManager(this)
    this.visualManager = new VisualManager(this)
    this.notificationManager
    this.serverManager
    if (web) {
        this.notificationManager = new WebNotificationManager(this)
        this.serverManager = new WebServerManager(this)
    } else {
        this.notificationManager = new AppNotificationManager(this)
        this.serverManager = new AppServerManager(this)
    }

    // Respond to back button on mobile app
    this.backButton = function () {
        if (this.state == 0) {
            if (!document.getElementById("configDiv").hidden) {
                this.settingsManager.close()
            }
        } else {
            if (this.state == 1 || this.state == 5) {
                this.notificationManager.confirm("Stop Scouting?", "Your data will NOT be saved!", ["Leave", "Stay"], function (result) {
                    if (result == 1) {
                        appManager.scoutManager.close(false, true)
                    }
                })
            } else {
                this.scoutManager.setMode(this.state - 1)
            }
        }
    }

    // Load config, game, and version from server managers
    this.loadData = function (config, game, version, cached) {
        this.config = config
        this.game = game
        if (!web) {
            this.settingsManager.checkVersion(version)
        }
        if (!cached) {
            this.settingsManager.saveDataCache(config, game, version)
        }
        this.scoutManager.loadData()
    }

    // Get current battery level
    function getBattery() {
        navigator.getBattery().then(function (battery) {
            appManager.battery = battery.level * 100
            appManager.charging = battery.charging ? 1 : 0
        })
    }

    // Check if schedule present
    this.scheduleAvailable = function () {
        if (this.schedule == undefined) {
            return false
        } else {
            return this.schedule.match != undefined
        }
    }

    // Show messages
    this.showMessages = function (messages) {
        if (messages.length > 0) {
            if (messages.length == 1) {
                this.notificationManager.alert("New Message", messages[0])
            } else {
                this.notificationManager.alert(messages.length.toString() + " New Messages", messages.join("\n\n"))
            }
        }
    }

    // App setup
    this.settingsManager.loadVersion()
    this.settingsManager.initLocalStorage()
    this.settingsManager.divSetup()
    this.settingsManager.initSavePitNotes()
    this.settingsManager.updateLocalCount()
    this.scoutManager.resizeTextInit()
    this.scoutManager.updateHelpButton()
    this.serverManager.init()
    this.serverManager.getData()
    this.settingsManager.loadDataCache()
    if (navigator.getBattery != undefined) {
        getBattery()
        setInterval(getBattery, 2000)
    }
}
