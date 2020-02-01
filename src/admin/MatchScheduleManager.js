// Responsible for the match scheduling section
function MatchScheduleManager(adminManager) {
    //Update match cache on server
    this.refreshCache = function (fromTBA) {
        adminManager.request("PUT", "/get_cache", function (data) {
            if (data.slice(0, 10) == "Downloaded") {
                document.getElementById("eventcache").innerHTML = adminManager.configManager.getEvent()
            }
            alert(data)
        }, {
            source: fromTBA ? "tba" : "csv"
        }, "Failed to reach server.")
    }

    //Update match cache on server
    this.reschedule = function (forceMatch) {
        adminManager.request("PUT", "/reschedule", function (data) {
            alert(data)
        }, {
            force_match: (forceMatch) ? document.getElementById("manualSchedule").value : 0
        }, "Failed to reach server.")
    }

    //Update schedule view
    this.get = function () {
        adminManager.request("GET", "/get_schedule", function (data) {
            schedule = JSON.parse(data)
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
        })
    }
}