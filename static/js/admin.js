var event = "2017nhgrs"

//Get config values
const http = new XMLHttpRequest()

http.onreadystatechange = function () {
    if (this.readyState == 4) {
        if (this.status == 200) {
            var result = JSON.parse(this.responseText)
            document.getElementById("game").value = result.game
            document.getElementById("event").value = result.event
            event = result.event
            document.getElementById("reverse_alliances").selectedIndex = result.reverse_alliances
            document.getElementById("dev_mode").selectedIndex = result.dev_mode
            document.getElementById("auto_schedule").selectedIndex = result.auto_schedule
            document.getElementById("eventcache").innerHTML = result.event_cache

            //Write scout list
            var scoutList = document.getElementById("scoutlist")
            var rows = [document.createElement("TR")]
            for (var scoutid in result.scouts) {
                var name = document.createElement("TD")
                name.innerHTML = result.scouts[scoutid].name
                name.style.backgroundColor = result.scouts[scoutid].enabled ? "#91ff9a" : "#ff9191"
                name.onclick = function () {
                    toggleScout(this)
                }
                name.classList.add("smallpad")
                rows.slice(-1)[0].appendChild(name)

                if ((Number(scoutid) + 1) % 5 == 0) {
                    scoutList.appendChild(rows.slice(-1)[0])
                    rows.push(document.createElement("TR"))
                }
            }
            scoutList.appendChild(rows.slice(-1)[0])
        }
    }
}

http.open("GET", "/get_config", true)
http.send()

//Toggle whether scout is enabled
function toggleScout(span) {
    const http = new XMLHttpRequest()

    http.onerror = function () {
        alert("Error toggling scout")
    }

    http.ontimeout = function () {
        alert("Error toggling scout")
    }

    http.open("PUT", "/toggle_scout?scout=" + encodeURIComponent(span.innerHTML), true)
    http.send()

    //Change background
    console.log(span.style.backgroundColor)
    span.style.backgroundColor = (span.style.backgroundColor == "rgb(145, 255, 154)") ? "#ff9191" : "#91ff9a"
}

//Update match cache on server
function refreshCache() {
    const http = new XMLHttpRequest()

    http.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                if (this.responseText.slice(0, 10) == "Downloaded") {
                    document.getElementById("eventcache").innerHTML = event
                }
                alert(this.responseText)
            }
        }
    }

    http.onerror = function () {
        alert("Error reaching server")
    }

    http.ontimeout = function () {
        alert("Error reaching server")
    }

    http.open("PUT", "/get_cache", true)
    http.send()
}

//Update match cache on server
function reschedule(forceMatch) {
    const http = new XMLHttpRequest()

    http.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                alert(this.responseText)
            }
        }
    }

    http.onerror = function () {
        alert("Error reaching server")
    }

    http.ontimeout = function () {
        alert("Error reaching server")
    }

    console.log("/reschedule" + ((forceMatch) ? "?force_match=" + encodeURIComponent(document.getElementById("manualSchedule").value) : ""))
    http.open("PUT", "/reschedule" + ((forceMatch) ? "?force_match=" + encodeURIComponent(document.getElementById("manualSchedule").value) : ""), true)
    http.send()
}

//Update schedule view
function getSchedule() {
    const http = new XMLHttpRequest()

    http.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                schedule = JSON.parse(this.responseText)
                var scheduleTable = document.getElementById("schedule")
                while (scheduleTable.firstChild) {
                    scheduleTable.removeChild(scheduleTable.firstChild)
                }
                document.getElementById("scheduleDiv").hidden = schedule.match == undefined
                if (schedule.match) {
                    document.getElementById("matchnumber").innerHTML = schedule.match
                    var teamRow = document.createElement("TR")
                    var scoutRow = document.createElement("TR")
                    for (var i in schedule.teams) {
                        var teamCell = document.createElement("TD")
                        var scoutCell = document.createElement("TD")
                        teamCell.classList.add("smallpad")
                        scoutCell.classList.add("smallpad")
                        teamCell.innerHTML = schedule.teams[i]
                        scoutCell.innerHTML = schedule.scouts[i]
                        if (i < 3) {
                            teamCell.style.backgroundColor = "#87c3ff"
                            scoutCell.style.backgroundColor = "#87c3ff"
                        } else {
                            teamCell.style.backgroundColor = "#ff6e6e"
                            scoutCell.style.backgroundColor = "#ff6e6e"
                        }
                        teamRow.appendChild(teamCell)
                        scoutRow.appendChild(scoutCell)
                    }
                    scheduleTable.appendChild(teamRow)
                    scheduleTable.appendChild(scoutRow)
                }
            }
        }
    }

    http.open("GET", "/get_schedule", true)
    http.send()
}
setInterval(function () { getSchedule() }, 2000)
getSchedule()

//Save config values
function save(key) {
    var value = document.getElementById(key).value

    if (key == "event") {
        event = value
    }

    const http = new XMLHttpRequest()

    http.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                alert(this.responseText)
            } else if (this.status == 500) {
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

    http.onreadystatechange = function () {
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
            for (var f = 0; f < 5; f++) {
                row.appendChild(document.createElement("TD"))
                row.lastChild.classList.add("devices")
            }
            row.classList.add(devicesSorted[colorLookup[colorId]][i].color)
            row.children[0].innerHTML = devicesSorted[colorLookup[colorId]][i].name.replace("<", "&lt;").replace(">", "&gt;")
            row.children[1].innerHTML = devicesSorted[colorLookup[colorId]][i].last_route
            row.children[2].innerHTML = devicesSorted[colorLookup[colorId]][i].status

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
            row.children[3].innerHTML = formatted + " ago"

            row.children[4].appendChild(document.createElement("BUTTON"))
            row.children[4].firstChild.onclick = function () { removeDevice(this.parentElement.parentElement.children[0].innerHTML) }
            row.children[4].firstChild.innerHTML = "Remove"
            table.appendChild(row)
        }
    }
}

//Remove device serverside
function removeDevice(device) {
    const http = new XMLHttpRequest()

    http.onreadystatechange = function () {
        if (this.readyState == 4) {
            getDevices()
            updateDeviceTable()
        }
    }

    http.open("POST", "/remove_device", true)
    http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    http.send("name=" + encodeURI(device))
}

//Web socket code
function createSocket() {
    var socket = new WebSocket("ws://" + window.location.hostname + ":8001")
    socket.onmessage = function (event) {
        devices = JSON.parse(event.data)
        updateDeviceTable()
    }
    socket.onclose = function () {
        createSocket()
    }
}

//Setup
getDevices()
updateDeviceTable()
createSocket()
setInterval(function () { updateDeviceTable() }, 100)

