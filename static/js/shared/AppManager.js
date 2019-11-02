// Responsible for overall commands and coordination between managers
function AppManager(web) {
    this.web = web
    this.state = 0
    this.team
    this.match
    this.config
    this.game
    
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
    this.backButton = function() {
        this.notificationManager.alert("What a surprise!", "The back button was pushed!")
    }
    
    // Load config, game, and version from server managers
    this.loadData = function(config, game, version, cached) {
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
    
    // App setup
    this.settingsManager.getVersion()
    this.settingsManager.checkDeviceName()
    this.settingsManager.refreshDeviceList()
    this.settingsManager.initLocalStorage()
    this.settingsManager.updateLocalCount()
    this.scoutManager.resizeTextInit()
    this.serverManager.initHeartbeatLoop()
    this.serverManager.getData()
    this.settingsManager.loadDataCache()
}
