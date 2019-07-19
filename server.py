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
        last_status INTEGER,
        last_team INTEGER,
        last_match INTEGER
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

def quickread(file):
    file = open(file, "r")
    result = file.read()
    file.close()
    return(result)

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
            <div id="onlinetext" style="color: green;">
            </div>
            Team:
            <input id="team" type="number" min="1" max="9999" step="1" class="teammatch"></input>
            <br>
            Match:
            <input id="match" type="number" min="1" max="999" step="1" class="teammatch"></input>
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
    def heartbeat(self, device_name, state, team=-1, match=-1):
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
        if team != -1 and match != -1:
            cur_global.execute("UPDATE devices SET last_team = ?, last_match = ? WHERE name = ?", (team, match, device_name))
        conn_global.commit()
        conn_global.close()
        return()

    @cherrypy.expose
    def load_game(self):
        conn_global = sql.connect(db_global)
        cur_global = conn_global.cursor()
        cur_global.execute("SELECT value FROM config WHERE key = 'game'")
        game = cur_global.fetchall()[0][0]
        conn_global.close()
        
        path = "games/" + str(game) + "/"
        result = {
            "prefs": json.loads(quickread(path + "prefs.json")),
            "classic": {
                "auto": quickread(path + "auto.html"),
                "teleop": quickread(path + "teleop.html"),
                "endgame": quickread(path + "endgame.html")
            },
            "CanvasManager": quickread(path + "CanvasManager.js")
        }
        return(json.dumps(result))

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
        
        <script src="/static/js/admin.js"></script>
    </body>
</html>
            """)

    @cherrypy.expose
    def get_devices(self):
        conn_global = sql.connect(db_global)
        cur_global = conn_global.cursor()
        cur_global.execute("SELECT * FROM devices ORDER BY name")
        raw = cur_global.fetchall()
        data = []
        for i in range(len(raw)):
            data.append({"name": raw[i][0], "last_heartbeat": raw[i][1], "last_status": raw[i][2], "last_team": raw[i][3], "last_match": raw[i][4]})
        conn_global.close()
        return(json.dumps(data))

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
