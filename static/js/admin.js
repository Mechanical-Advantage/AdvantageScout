//Get config values
const http = new XMLHttpRequest()

http.onreadystatechange = function() {
    if (this.readyState == 4) {
        if (this.status == 200) {
            var result = JSON.parse(this.responseText)
            document.getElementById("game").value = result.game
            document.getElementById("event").value = result.event
            document.getElementById("reverse_alliances").selectedIndex = result.reverse_alliances
            document.getElementById("dev_mode").selectedIndex = result.dev_mode
        }
    }
}

http.open("GET", "/get_config", true)
http.send()

//Save config values
function save(key) {
    var value = document.getElementById(key).value
    const http = new XMLHttpRequest()
    
    http.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                alert(this.responseText)
            } else if (this.status == 500){
                alert("Error: internal server error")
            } else {
                alert("Error: unknown error")
            }
        }
    }
    
    http.open("PUT", "/set_config", true)
    http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    http.send("key=" + key + "&value=" + encodeURI(value))
}

//Retrieve device data from server
var devices = []
function getDevices() {
    const http = new XMLHttpRequest()
    
    http.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                devices = JSON.parse(this.responseText)
            }
        }
    }
    
    http.open("GET", "/get_devices", true)
    http.send()
}

//Recreate table based on local device data
function updateDeviceTable() {
    //Sort devices
    var devicesSorted = {"red": [], "yellow": [], "green": []}
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
    
    //Create table
    var table = document.getElementById("deviceTable")
    while (table.children[1]) {
        table.removeChild(table.children[1])
    }
    var colorLookup = ["green", "yellow", "red"]
    for (var colorId = 0; colorId < 3; colorId++) {
        for (var i = 0; i < devicesSorted[colorLookup[colorId]].length; i++) {
            var row = document.createElement("TR")
            for (var f = 0; f < 4; f++) {
                row.appendChild(document.createElement("TD"))
            }
            row.children[0].innerHTML = devicesSorted[colorLookup[colorId]][i].name
            row.classList.add(devicesSorted[colorLookup[colorId]][i].color)
            row.children[1].innerHTML = devicesSorted[colorLookup[colorId]][i].status
            
            var diff = Math.round(Date.now() / 1000) - devicesSorted[colorLookup[colorId]][i].last_heartbeat
            hours = Math.floor(diff/3600)
            diff -= hours*3600
            minutes = Math.floor(diff/60)
            seconds = diff - minutes*60
            
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
            row.children[2].innerHTML = formatted + " ago"
            
            row.children[3].appendChild(document.createElement("BUTTON"))
            row.children[3].firstChild.onclick = function() {removeDevice(this.parentElement.parentElement.children[0].innerHTML)}
            row.children[3].firstChild.innerHTML = "Remove"
            table.appendChild(row)
        }
    }
}

//Remove device serverside
function removeDevice(device) {
    const http = new XMLHttpRequest()
    
    http.onreadystatechange = function() {
        if (this.readyState == 4) {
            getDevices()
            updateDeviceTable()
        }
    }
    
    http.open("POST", "/remove_device", true)
    http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    http.send("name=" + encodeURI(device))
}
getDevices()
updateDeviceTable()
setInterval(function() {getDevices()}, 3000)
setInterval(function() {updateDeviceTable()}, 1000)
