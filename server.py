import sqlite3 as sql
import cherrypy
import os
from pathlib import Path
import time
import json

#Config
port = 8000
host = "192.168.0.68"
db_global = "global.db" # database for data not tied to specific games
db_games = "data_$GAME.db" # database for collected scouting data
default_game = "2019"

#Initialize global db
def init_global():
    conn_global = sql.connect(db_global)
    cur_global = conn_global.cursor()
    cur_global.execute("DROP TABLE IF EXISTS devices")
    cur_global.execute("""CREATE TABLE devices (
        name TEXT,
        last_heartbeat INTEGER,
        last_status TEXT
        ); """)
    cur_global.execute("DROP TABLE IF EXISTS config")
    cur_global.execute("""CREATE TABLE config (
        key TEXT,
        value INTEGER
        ); """)
    cur_global.execute("INSERT INTO config (key, value) VALUES ('game', ?)", (default_game,))
    cur_global.execute("INSERT INTO config (key, value) VALUES ('event', '2017nhgrs')")
    conn_global.commit()
    conn_global.close()
temp_path = Path(db_global)
if not temp_path.is_file():
    print("Creating new global database")
    init_global()

#Connect to appropriate game database
def gamedb_connect():
    conn_global = sql.connect(db_global)
    cur_global = conn_global.cursor()
    cur_global.execute("SELECT value FROM config WHERE key = 'game'")
    conn_game = sql.connect(db_games.replace("$GAME", cur_global.fetchall()[0][0]))
    conn_global.close()
    return(conn_game)

def currentTime():
    return(int(round(time.time())))

class main_server(object):
    @cherrypy.expose
    def index(self):
        return("""
<html>
    <head>
        <title>
            Advantage Scout
        </title>
        <link rel="stylesheet" type="text/css" href="/static/css/main.css"></link>
        <script src="/static/js/ButtonManager.js"></script>
    </head>
    <body>
        <div id="selectionDiv" class="centered">
            <div class="title">
                Advantage Scout
            </div>
            Team:
            <input id="team" type="number" min="1" max="9999" step="1" style="width: 100px;"></input>
            <br>
            Match:
            <input id="match" type="number" min="1" max="999" step="1" style="width: 100px;"></input>
            <br>
            <button class="scoutstart" onclick="javascript:scoutStart(&quot;visual&quot;)">
                Scout! (visual)
            </button>
            <br>
            <button class="scoutstart" onclick="javascript:scoutStart(&quot;classic&quot;)">
                Scout! (classic)
            </button>
        </div>
    
        <script src="/static/js/main.js"></script>
    </body>
</html>
            """)
    
    @cherrypy.expose
    def config(self):
        return("""
<html>
    <head>
        <title>
            Advantage Scout
        </title>
        <link rel="stylesheet" type="text/css" href="/static/css/main.css"></link>
        <script>
            function finish() {
                window.localStorage.setItem("advantagescout_device", document.getElementById("name").value)
                window.location = "/"
            }
        </script>
    </head>
    <body>
        <div class="centered">
            <div class="title">
                Advantage Scout
            </div>
            Enter a device name:
            <br>
            <input type="text" id="name"></input>
            <br>
            <button onclick="javascript:finish()">
                Finish
            </button>
            <script>
                var name = window.localStorage.getItem("advantagescout_device")
                if (name != "null") {
                    document.getElementById("name").value = name
                }
            </script>
        </div>
    </body>
</html>
            """)

    @cherrypy.expose
    def admin(self):
        return("""
<html>
    <head>
        <title>
            Admin - Advantage Scout
        </title>
        <link rel="stylesheet" type="text/css" href="/static/css/admin.css"></link>
    </head>
    <body>
        <h1>
            Admin - Advantage Scout
        </h1>
        <h3>
            Config
        </h3>
        Game: <input type="text" id="game"></input><button onclick="javascript:save(&quot;game&quot;)">Save</button>
        <br>
        Event: <input type="text" id="event"></input><button onclick="javascript:save(&quot;event&quot;)">Save</button>
        <h3>
            Devices
        </h3>
        <table>
            <tbody id="deviceTable">
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Status
                    </th>
                    <th>
                        Heartbeat
                    </th>
                </tr>
            </tbody>
        </table>
        
        <script>
            //Get config values
            const http = new XMLHttpRequest()
            
            http.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        var result = JSON.parse(this.responseText)
                        document.getElementById("game").value = result.game
                        document.getElementById("event").value = result.event
                    }
                }
            }
            
            http.open("GET", "/get_config", true)
            http.send()
            
            //Save config values
            function save(key) {
                var value = document.getElementById(key).value
                const http = new XMLHttpRequest()
                http.open("POST", "/set_config", true)
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
                var table = document.getElementById("deviceTable")
                while (table.children[1]) {
                    table.removeChild(table.children[1])
                }
                for (var i = 0; i < devices.length; i++) {
                    var row = document.createElement("TR")
                    for (var f = 0; f < 4; f++) {
                        row.appendChild(document.createElement("TD"))
                    }
                    row.children[0].innerHTML = devices[i].name
                    
                    var diff = Math.round((Date.now() / 1000) - devices[i].last_heartbeat)
                    var status
                    if (diff > 8) {
                        status = "Disconnected"
                        row.classList.add("red")
                    } else if (devices[i].last_status == 0) {
                        status = "Idle"
                        row.classList.add("yellow")
                    } else if (devices[i].last_status == 1) {
                        status = "Auto"
                        row.classList.add("green")
                    } else if (devices[i].last_status == 2) {
                        status = "Tele-op"
                        row.classList.add("green")
                    } else if (devices[i].last_status == 3) {
                        status = "Endgame"
                        row.classList.add("green")
                    } else if (devices[i].last_status == 4) {
                        status = "Offline Warning"
                        row.classList.add("yellow")
                    } else {
                        status = "Unknown"
                        row.classList.add("yellow")
                    }
                    row.children[1].innerHTML = status
                    
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
        </script>
    </body>
</html>
            """)

    @cherrypy.expose
    def heartbeat(self, device_name, state):
        conn_global = sql.connect(db_global)
        cur_global = conn_global.cursor()
        cur_global.execute("SELECT name FROM devices")
        names = cur_global.fetchall()
        for i in range(len(names)):
            names[i] = names[i][0]
        if device_name not in names:
            cur_global.execute("INSERT INTO devices (name, last_heartbeat, last_status) VALUES (?, ?, ?)", (device_name, currentTime(), state))
        else:
            cur_global.execute("UPDATE devices SET last_heartbeat = ?, last_status = ? WHERE name = ?", (currentTime(), state, device_name))
        conn_global.commit()
        conn_global.close()
        return()

    @cherrypy.expose
    def set_config(self, key, value):
        conn_global = sql.connect(db_global)
        cur_global = conn_global.cursor()
        cur_global.execute("UPDATE config SET value = ? WHERE key = ?", (value, key))
        conn_global.commit()
        conn_global.commit()
        conn_global.close()
        return()

    @cherrypy.expose
    def get_config(self):
        conn_global = sql.connect(db_global)
        cur_global = conn_global.cursor()
        cur_global.execute("SELECT value FROM config WHERE key = 'game'")
        data = {"game": cur_global.fetchall()[0][0]}
        cur_global.execute("SELECT value FROM config WHERE key = 'event'")
        data["event"] = cur_global.fetchall()[0][0]
        conn_global.close()
        return(json.dumps(data))

    @cherrypy.expose
    def get_devices(self):
        conn_global = sql.connect(db_global)
        cur_global = conn_global.cursor()
        cur_global.execute("SELECT * FROM devices ORDER BY name")
        raw = cur_global.fetchall()
        data = []
        for i in range(len(raw)):
            data.append({"name": raw[i][0], "last_heartbeat": raw[i][1], "last_status": raw[i][2]})
        conn_global.close()
        return(json.dumps(data))

    @cherrypy.expose
    def remove_device(self, name):
        conn_global = sql.connect(db_global)
        cur_global = conn_global.cursor()
        cur_global.execute("DELETE FROM devices WHERE name = ?", (name,))
        conn_global.commit()
        conn_global.close()
        return()

if __name__ == "__main__":
    cherrypy.config.update({'server.socket_port': port, 'server.socket_host': host})
    cherrypy.quickstart(main_server(), "/", {"/favicon.ico": {"tools.staticfile.on": True, "tools.staticfile.filename": os.getcwd() + "/static/img/favicon.ico"}, "/static": {"tools.staticdir.on": True, "tools.staticdir.dir": os.getcwd() + "/static"}})
