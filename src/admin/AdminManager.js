// Responsible for overall commands and coordination between managers
function AdminManager() {
    // Instantiate managers
    this.configManager = new ConfigManager(this)
    this.matchScheduleManager = new MatchScheduleManager(this)
    // this.blockScheduleManager = new BlockScheduleManager(this)
    this.scoutPrefManager = new ScoutPrefManager(this)
    this.scoutListManager = new ScoutListManager(this)
    this.devicesManager = new DevicesManager(this)
    this.uploadedManager = new UploadedManager(this)

    // Send a request to the server
    this.request = function (method, url, response, data, error) {
        if (data == undefined) {
            data = {}
        }

        const http = new XMLHttpRequest()
        const form = new FormData()
        for (name in data) {
            form.append(name, data[name])
        }

        if (response != undefined) {
            http.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        response(this.responseText)
                    }
                }
            }
        }

        if (error != undefined) {
            http.onerror = function () {
                console.log(error)
                alert(error)
            }

            http.ontimeout = function () {
                console.log(error)
                alert(error)
            }
        }

        http.open(method, url)
        http.send(form)
    }

    // Page setup
    this.configManager.get()
    this.matchScheduleManager.get()
    setInterval(this.matchScheduleManager.get, 2000)
    this.scoutPrefManager.get()
    this.devicesManager.get()
    this.devicesManager.updateTable()
    this.devicesManager.createSocket()
    setInterval(this.devicesManager.updateTable, 100)
    this.uploadedManager.get()
    setInterval(this.uploadedManager.get, 2000)
}