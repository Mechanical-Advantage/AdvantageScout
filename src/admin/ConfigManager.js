// Responsible for the config section
function ConfigManager(adminManager) {
    var event = "2017nhgrs"

    // Get last event sent to the server
    this.getEvent = function () {
        return event
    }

    // Update config from server
    this.get = function () {
        adminManager.request("GET", "/get_config", function (data) {
            var result = JSON.parse(data)
            document.getElementById("game").value = result.game
            document.getElementById("event").value = result.event
            event = result.event
            document.getElementById("reverse_alliances").selectedIndex = result.reverse_alliances
            document.getElementById("dev_mode").selectedIndex = result.dev_mode
            document.getElementById("auto_schedule").selectedIndex = result.auto_schedule
            document.getElementById("eventcache").innerHTML = result.event_cache

            adminManager.scoutListManager.create(result.scouts)
        }, {}, "Failed to get configuration.")
    }

    // Send config value to server
    this.save = function (key) {
        var value = document.getElementById(key).value

        if (key == "event") {
            event = value
        }

        adminManager.request("PUT", "/set_config", function (data) {
            alert(data)
        }, {
            key: key,
            value: value
        }, "Failed to update configuration.")
    }
}