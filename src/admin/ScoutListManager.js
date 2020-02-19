// Responsible for the scout list section
function ScoutListManager(adminManager) {
    // Create table based on config data
    this.create = function (data) {
        var scoutList = document.getElementById("scoutlist")
        while (scoutList.firstChild) {
            scoutList.removeChild(scoutList.firstChild)
        }
        var rows = [document.createElement("TR")]
        for (var scoutid in data) {
            var name = document.createElement("TD")
            name.innerHTML = data[scoutid].name
            name.style.backgroundColor = data[scoutid].enabled ? "#91ff9a" : "#ff9191"
            name.onclick = function () {
                adminManager.scoutListManager.toggleScout(this)
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

    // Toggle scout and send data to server
    this.toggleScout = function (span) {
        adminManager.request("PUT", "/toggle_scout", undefined, {
            scout: span.innerHTML
        }, "Failed to toggle scout.")
        span.style.backgroundColor = (span.style.backgroundColor == "rgb(145, 255, 154)") ? "#ff9191" : "#91ff9a"
    }

    // Add scout and refresh list
    this.addScout = function () {
        var name = document.getElementById("addScoutName").value
        if (name == "") {
            alert("Please enter a scout name.")
            return
        }
        adminManager.request("POST", "/add_scout", function () {
            alert("Added scout \"" + name + "\"")
            document.getElementById("addScoutName").value = ""
            adminManager.configManager.get(true)
        }, {
            scout: name
        }, "Failed to add scout \"" + name + "\"")
    }
}