// Responsible for the scout preference section
function ScoutPrefManager(adminManager) {
    var prefs = {}

    // Retrieve preferences from server
    this.get = function () {
        adminManager.request("GET", "/get_scoutprefs", function (data) {
            prefs = JSON.parse(data)
            render()
        }, {}, "Failed to get scout preferences.")
    }

    // Send current preferences to server
    function send() {
        adminManager.request("POST", "/set_scoutprefs", undefined, {
            data: JSON.stringify(prefs)
        }, "Failed to update scout preferences.")
    }

    // Render preferences based on data
    function render() {
        var prefsTable = document.getElementById("prefsTable")
        while (prefsTable.children[1]) {
            prefsTable.removeChild(prefsTable.children[1])
        }
        if (prefs.length == 0) {
            var row = document.createElement("TR")
            row.appendChild(document.createElement("TD"))
            row.children[0].style.fontStyle = "italic"
            row.children[0].innerHTML = "No preferences"
            prefsTable.appendChild(row)
        }
        for (var index = 0; index < prefs.length; index++) {
            var row = document.createElement("TR")
            row.appendChild(document.createElement("TD"))
            row.children[0].classList.add("prefscell")
            row.children[0].innerHTML = prefs[index]["team"]

            row.appendChild(document.createElement("TD"))
            row.children[1].classList.add("prefscell")
            row.children[1].innerHTML = prefs[index]["scout"]

            row.appendChild(document.createElement("TD"))
            row.children[2].classList.add("prefscell")

            row.children[2].appendChild(document.createElement("BUTTON"))
            row.children[2].children[0].innerHTML = "\u2b06"
            row.children[2].children[0].disabled = index == 0
            row.children[2].children[0].onclick = function () {
                var row = this.parentElement.parentElement
                var tableChildren = Array.from(row.parentElement.children)
                adminManager.scoutPrefManager.updatePrefs(tableChildren.indexOf(row) - 1, 0)
            }

            row.children[2].appendChild(document.createElement("BUTTON"))
            row.children[2].children[1].innerHTML = "\u2b07"
            row.children[2].children[1].disabled = index == prefs.length - 1
            row.children[2].children[1].onclick = function () {
                var row = this.parentElement.parentElement
                var tableChildren = Array.from(row.parentElement.children)
                adminManager.scoutPrefManager.updatePrefs(tableChildren.indexOf(row) - 1, 1)
            }

            row.children[2].appendChild(document.createElement("BUTTON"))
            row.children[2].children[2].innerHTML = "\u{1F5D1}"
            row.children[2].children[2].onclick = function () {
                var row = this.parentElement.parentElement
                var tableChildren = Array.from(row.parentElement.children)
                adminManager.scoutPrefManager.updatePrefs(tableChildren.indexOf(row) - 1, 2)
            }

            prefsTable.appendChild(row)
        }
    }

    // Rearrange or remove preference
    this.updatePrefs = function (index, action) {
        if (action == 0 || action == 1) {
            record = prefs.splice(index, 1)[0]
            prefs.splice(index + ((action == 0) ? -1 : 1), 0, record)
        } else if (action == 2) {
            prefs.splice(index, 1)
        }
        render()
        send()
    }

    //Add scout preference
    this.addPref = function () {
        var team = document.getElementById("prefsTeam").value
        var scout = document.getElementById("prefsScout").value
        document.getElementById("prefsTeam").value = ""
        document.getElementById("prefsScout").value = ""
        prefs.push({
            "team": team,
            "scout": scout,
        })
        render()
        send()
    }
}