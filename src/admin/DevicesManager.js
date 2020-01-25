// Responsible for the device list section
function DevicesManager(adminManager) {
    var devices = []

    //Retrieve device data from server
    this.get = function () {
        adminManager.request("GET", "/get_devices", function (data) {
            devices = JSON.parse(data)
        }, {}, "Failed to retrieve device list.")
    }

    //Recreate table based on local device data
    this.updateTable = function () {
        //Sort devices
        var devicesSorted = { "red": [], "yellow": [], "green": [], "purple": [] }
        for (var i = 0; i < devices.length; i++) {
            var diff = Math.round(Date.now() / 1000) - devices[i].last_heartbeat
            var status
            var color
            if (diff > 30) {
                status = "Inactive"
                color = "red"
            } else if (devices[i].last_status == 0) {
                status = "Idle"
                color = "yellow"
            } else if (devices[i].last_status == 1) {
                status = "Auto<br>" + devices[i].last_team + ", M" + devices[i].last_match
                color = "green"
            } else if (devices[i].last_status == 2) {
                status = "Tele-op<br>" + devices[i].last_team + ", M" + devices[i].last_match
                color = "green"
            } else if (devices[i].last_status == 3) {
                status = "Endgame<br>" + devices[i].last_team + ", M" + devices[i].last_match
                color = "green"
            } else if (devices[i].last_status == 4) {
                status = "Offline Warning"
                color = "yellow"
            } else if (devices[i].last_status == 5) {
                status = "Pit Scout<br>" + devices[i].last_team
                color = "purple"
            } else {
                status = "Unknown"
                color = "yellow"
            }
            devicesSorted[color].push(JSON.parse(JSON.stringify(devices[i])))
            devicesSorted[color][devicesSorted[color].length - 1].status = status
            devicesSorted[color][devicesSorted[color].length - 1].color = color
        }
        devicesSorted["red"].sort((a, b) => (a.last_heartbeat < b.last_heartbeat) ? 1 : -1)
        devicesSorted["yellow"].sort((a, b) => (a.name > b.name) ? 1 : -1)
        devicesSorted["green"].sort((a, b) => (a.name > b.name) ? 1 : -1)
        devicesSorted["purple"].sort((a, b) => (a.name > b.name) ? 1 : -1)

        //Create table
        var table = document.getElementById("deviceTable")
        while (table.children[1]) {
            table.removeChild(table.children[1])
        }
        var colorLookup = ["green", "purple", "yellow", "red"]
        for (var colorId = 0; colorId < 4; colorId++) {
            for (var i = 0; i < devicesSorted[colorLookup[colorId]].length; i++) {
                var row = document.createElement("TR")
                for (var f = 0; f < 6; f++) {
                    row.appendChild(document.createElement("TD"))
                    row.lastChild.classList.add("devices")
                }
                row.classList.add(devicesSorted[colorLookup[colorId]][i].color)
                row.children[0].innerHTML = devicesSorted[colorLookup[colorId]][i].name.replace("<", "&lt;").replace(">", "&gt;")
                row.children[1].innerHTML = devicesSorted[colorLookup[colorId]][i].last_route
                var battery = Math.round(devicesSorted[colorLookup[colorId]][i].last_battery).toString() + "%"
                row.children[2].innerHTML = battery == "-1%" ? "NA" : battery
                if (devicesSorted[colorLookup[colorId]][i].last_charging == 1) {
                    row.children[2].style.textDecoration = "underline"
                }
                row.children[3].innerHTML = devicesSorted[colorLookup[colorId]][i].status

                var diff = Math.round(Date.now() / 1000) - devicesSorted[colorLookup[colorId]][i].last_heartbeat
                hours = Math.floor(diff / 3600)
                diff -= hours * 3600
                minutes = Math.floor(diff / 60)
                seconds = diff - minutes * 60

                formatted = ""
                if (hours != 0) {
                    formatted = String(hours) + "h "
                }
                if (minutes != 0) {
                    formatted = formatted + String(minutes) + "m "
                }
                if (seconds != 0) {
                    formatted = formatted + String(seconds) + "s "
                }
                formatted = formatted.substring(0, formatted.length - 1);
                if (formatted == "") {
                    formatted = "0s"
                }
                row.children[4].innerHTML = formatted + " ago"

                row.children[5].appendChild(document.createElement("BUTTON"))
                row.children[5].firstChild.onclick = function () { adminManager.devicesManager.removeDevice(this.parentElement.parentElement.children[0].innerHTML) }
                row.children[5].firstChild.innerHTML = "Remove"
                table.appendChild(row)
            }
        }
    }

    //Remove device serverside
    this.removeDevice = function (device) {
        adminManager.request("POST", "/remove_device", function (data) {
            get()
            updateTable()
        }, {
            name: device
        }, "Failed to remove device.")
    }

    //Web socket code
    this.createSocket = function () {
        var socket = new WebSocket("ws://" + window.location.hostname + ":8001")
        socket.onmessage = function (event) {
            devices = JSON.parse(event.data)
            adminManager.devicesManager.updateTable()
        }
        socket.onclose = function () {
            adminManager.devicesManager.createSocket()
        }
    }
}