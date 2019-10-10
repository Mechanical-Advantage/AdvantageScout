import sqlite3 as sql
import cherrypy
import json
import time
import threading
from pathlib import Path
import os
import sys

#Config
default_port = 8000 # can override w/ command line argument
host = "0.0.0.0"
bt_enable = True
bt_ports = ["/dev/cu.Bluetooth-Incoming-Port"]
db_global = "global.db" # database for data not tied to specific games
db_games = "data_$GAME.db" # database for collected scouting data
default_game = "2019"

#Import serial library
if bt_enable:
    import serial

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
        value TEXT
        ); """)
    cur_global.execute("INSERT INTO config (key, value) VALUES ('game', ?)", (default_game,))
    cur_global.execute("INSERT INTO config (key, value) VALUES ('event', '2017nhgrs')")
    cur_global.execute("INSERT INTO config (key, value) VALUES ('reverse_alliances', '0')")
    conn_global.commit()
    conn_global.close()

if not Path(db_global).is_file():
    print("Creating new global database")
    init_global()

#Connect to appropriate game database
def gamedb_connect():
    conn_global = sql.connect(db_global)
    cur_global = conn_global.cursor()
    cur_global.execute("SELECT value FROM config WHERE key = 'game'")
    game = str(cur_global.fetchall()[0][0])
    conn_game = sql.connect(db_games.replace("$GAME", game))
    conn_global.close()
    return({"conn": conn_game, "name": game})

#Initialize game db
def init_game():
    game_result = gamedb_connect()
    conn_game = game_result["conn"]
    cur_game = conn_game.cursor()

    config = json.loads(quickread("games" + os.path.sep + game_result["name"] + os.path.sep + "prefs.json"))
    create_text = "Event TEXT, Team INTEGER, Match INTEGER, DeviceName TEXT, Version TEXT, InterfaceType TEXT, Time INTEGER, UploadTime INTEGER, "
    for i in range(len(config["fields"])):
        create_text += config["fields"][i] + ","
    create_text = create_text[:-1]
    
    cur_game.execute("DROP TABLE IF EXISTS scout")
    cur_game.execute("CREATE TABLE scout (" + create_text + ")")
    conn_game.commit()
    conn_game.close()

def quickread(file):
    file = open(file, "r")
    result = file.read()
    file.close()
    return(result)

def currentTime():
    return(int(round(time.time())))

favicon_code = """
<link rel="apple-touch-icon" sizes="180x180" href="/static/img/apple-touch-icon.png"></link>
<link rel="icon" type="image/png" sizes="32x32" href="/static/img/favicon-32x32.png"></link>
<link rel="icon" type="image/png" sizes="192x192" href="/static/img/android-chrome-192x192.png"></link>
<link rel="icon" type="image/png" sizes="16x16" href="/static/img/favicon-16x16.png"></link>
<link rel="manifest" href="/static/img/site.webmanifest"></link>
<link rel="mask-icon" href="/static/img/safari-pinned-tab.svg" color="#012be5"></link>
<link rel="shortcut icon" href="/static/img/favicon.ico"></link>
<meta name="msapplication-TileColor" content="#012be5"></meta>
<meta name="msapplication-config" content="/static/img/browserconfig.xml"></meta>
<meta name="theme-color" content="#012be5"></meta>
    """

class main_server(object):
    @cherrypy.expose
    def index(self):
        output = """
<html>
    <head>
        <title>
            Advantage Scout
        </title>
        <link rel="stylesheet" type="text/css" href="/static/css/main.css"></link>
        <script src="/static/js/ButtonManager.js"></script>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
        $FAVICON_CODE
        <noscript>
            <style>
                div.hideonnoscript {
                    display: none;
                }
            </style>
        </noscript>
    </head>
    <body>
        <div id="selectionDiv" class="centered hideonnoscript">
            <div class="title">
                Advantage Scout
            </div>
            <div id="onlinetext" style="color: green;">
                Online
            </div>
            <div id="localcount">
                Loading...
            </div>
            Team:
            <input id="team" type="number" min="1" max="9999" step="1" class="teammatch"></input>
            <br>
            Match:
            <input id="match" type="number" min="1" max="999" step="1" class="teammatch"></input>
            <br>
            <span id="reverseAlliancesDiv" hidden>
                Alliance Position:
                <select id="reverseAlliances">
                    <option value="0">
                        red right, blue left
                    </option>
                    <option value="1">
                        red left, blue right
                    </option>
                </select>
                <br>
            </span>
            <div id="loadingtext">
                Loading...
            </div>
            <div id="startbuttons" hidden>
                <button id="visualstart" class="scoutstart" onclick="javascript:scoutStart(&quot;visual&quot;)">
                    Scout! (visual)
                </button>
                <br id="twobuttonbreak">
                <button id="classicstart" class="scoutstart" onclick="javascript:scoutStart(&quot;classic&quot;)">
                    Scout! (classic)
                </button>
            </div>
        </div>
        
        <div id="offlineWarningDiv" class="centered" hidden>
            <div class="title">
                Advantage Scout
            </div>
            <div class="subtitle">
                You're offline!
            </div>
            You can keep scouting for now, but please reconnect if possible.
            <br>
            <br>
            Ask someone on the scouting systems team for help if needed.
            <br>
            <br>
            <button class="scoutstart" onclick="javascript:idleStart(true)">
                Continue
            </button>
        </div>
        
        <div id="modeSwitcherDiv" class="modeswitcher" hidden>
            <div class="switcherbutton1" onclick="javascript:setMode(1)" style="font-weight: bold;">
                Autonomous
            </div>
            <div class="switcherbutton2" onclick="javascript:setMode(2)">
                Tele-operated
            </div>
            <div class="switcherbutton3" onclick="javascript:setMode(3)">
                End Game
            </div>
        </div>
        
        <div id="visualCanvasDiv" class="visualcanvasdiv" hidden>
            <canvas class="visualcanvas" width="3000" height="1600"></canvas>
        </div>
        
        <div id="classicDiv1" class="classicdiv" hidden>
        </div>
        
        <div id="classicDiv2" class="classicdiv" hidden>
        </div>
        
        <div id="classicDiv3" class="classicdiv" hidden>
        </div>
        
        <noscript>
            <div class="centered">
                <div class="title">
                    Advantage Scout
                </div>
                <div class="subtitle">
                    Seriously?
                </div>
                You can't scout without JavaScript!
            </div>
        </noscript>
    
        <script src="/static/js/main.js"></script>
    </body>
</html>
            """
        return(output.replace("$FAVICON_CODE", favicon_code))
    
    @cherrypy.expose
    def config(self):
        output = """
<html>
    <head>
        <title>
            Advantage Scout
        </title>
        <link rel="stylesheet" type="text/css" href="/static/css/main.css"></link>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        $FAVICON_CODE
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
            <button onclick="javascript:finish()" class="scoutstart">
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
            """
        return(output.replace("$FAVICON_CODE", favicon_code))
    
    @cherrypy.expose
    def export(self):
        return("""
<html>
<body>
<script>
document.body.innerHTML = window.localStorage.getItem("advantagescout_data")
</script>
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
        
        path = "games" + os.path.sep + str(game) + os.path.sep
        if Path(path + "CanvasManager.js").is_file():
            result = {
                "prefs": json.loads(quickread(path + "prefs.json")),
                "CanvasManager": quickread(path + "CanvasManager.js")
            }
        else:
            result = {
                "prefs": json.loads(quickread(path + "prefs.json"))
            }
        return(json.dumps(result))

    @cherrypy.expose
    def upload(self, data):
        game_result = gamedb_connect()
        conn_game = game_result["conn"]
        cur_game = conn_game.cursor()
        prefs = json.loads(quickread("games" + os.path.sep + str(game_result["name"]) + os.path.sep + "prefs.json"))
        result = {"success": False, "count": 0}
        try:
            data = json.loads(data)
        except:
            return(json.dumps(result))
        result["count"] = len(data)
        for i in range(len(data)):
            to_save = {}
            fields = prefs["fields"] + ["Event TEXT", "Team INTEGER", "Match INTEGER", "DeviceName TEXT", "Version TEXT", "InterfaceType TEXT", "Time INTEGER", "UploadTime INTEGER"]
            for f in range(len(fields)):
                field_name = fields[f].split(" ")[0]
                if field_name in data[i]:
                    to_save[field_name] = data[i][field_name]
            fields = ["UploadTime"]
            values = [str(currentTime())]
            for field, value in to_save.items():
                fields.append(field)
                values.append(str(value))
            cur_game.execute("INSERT INTO scout (" + ",".join(fields) + ") VALUES (" + ",".join(["?"] * len(fields)) + ")", tuple(values))
        conn_game.commit()
        conn_game.close()
        result["success"] = True
        return(json.dumps(result))

    @cherrypy.expose
    def admin(self):
        output = """
<html>
    <head>
        <title>
            Admin - Advantage Scout
        </title>
        <link rel="stylesheet" type="text/css" href="/static/css/admin.css"></link>
        $FAVICON_CODE
    </head>
    <body>
        <h1>
            Admin - Advantage Scout
        </h1>
        <h3>
            Config
        </h3>
        Game: 
        <input type="text" id="game"></input>
        <button onclick="javascript:save(&quot;game&quot;)">
            Save
        </button>
        <br>
        Event: 
        <input type="text" id="event"></input>
        <button onclick="javascript:save(&quot;event&quot;)">
            Save
        </button>
        <br>
        Alliance Position:
        <select id="reverse_alliances">
            <option value="0">
                red right, blue left
            </option>
            <option value="1">
                red left, blue right
            </option>
            <option value="2">
                select on device
            </option>
        </select>
        <button onclick="javascript:save(&quot;reverse_alliances&quot;)">
        Save
        </button>
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
            """
        return(output.replace("$FAVICON_CODE", favicon_code))

    @cherrypy.expose
    def get_devices(self):
        conn_global = sql.connect(db_global)
        cur_global = conn_global.cursor()
        cur_global.execute("SELECT * FROM devices ORDER BY last_heartbeat DESC")
        raw = cur_global.fetchall()
        data = []
        for i in range(len(raw)):
            data.append({"name": raw[i][0], "last_heartbeat": raw[i][1], "last_status": raw[i][2], "last_team": raw[i][3], "last_match": raw[i][4]})
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

    @cherrypy.expose
    def get_config(self):
        conn_global = sql.connect(db_global)
        cur_global = conn_global.cursor()
        cur_global.execute("SELECT value FROM config WHERE key = 'game'")
        data = {"game": cur_global.fetchall()[0][0]}
        cur_global.execute("SELECT value FROM config WHERE key = 'event'")
        data["event"] = cur_global.fetchall()[0][0]
        cur_global.execute("SELECT value FROM config WHERE key = 'reverse_alliances'")
        data["reverse_alliances"] = cur_global.fetchall()[0][0]
        conn_global.close()
        return(json.dumps(data))

    @cherrypy.expose
    def set_config(self, key, value):
        conn_global = sql.connect(db_global)
        cur_global = conn_global.cursor()
        cur_global.execute("UPDATE config SET value = ? WHERE key = ?", (value, key))
        conn_global.commit()
        conn_global.close()
        
        if key == "game":
            if Path(db_games.replace("$GAME", value)).is_file():
                response = "Updated game to \"" + value + "\""
            else:
                try:
                    init_game()
                    response = "Created database for game \"" + value + "\""
                except:
                    response = "Error: failed to create database for game \"" + value + "\". Check game prefs"
        elif key == "event":
            response = "Updated event to \"" + value + "\""
        elif key == "reverse_alliances":
            response = "Updated alliance position setting"
        else:
            response = "Error: unknown key \"" + key + "\""
        return(response)

    @cherrypy.expose
    def download(self):
        output = """
            <html>
                <head>
                    <title>
                        Download - Advantage Scout
                    </title>
                    <link rel="stylesheet" type="text/css" href="/static/css/main.css"></link>
                    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                    $FAVICON_CODE
                </head>
                <body>
                    <div class="centered">
                        <div class="title">
                            Advantage Scout
                        </div>
                        <div class="subtitle">
                            App download
                        </div>
                        Note: this app is for ANDROID ONLY
                        <br>
                        <br>
                        <a href="releases/AdvantageScout.apk" download class="scoutstart">
                            Download
                        </a>
                    </div>
                </body>
            </html>
            """
        return(output.replace("$FAVICON_CODE", favicon_code))

def log(output, before_text=""):
    if before_text == "":
        print(time.strftime("[%d/%b/%Y:%H:%M:%S] ") + output)
    else:
        print(before_text + time.strftime(" - - [%d/%b/%Y:%H:%M:%S] ") + output)

def bluetooth_server(port):
    try:
        ser = serial.Serial(port)
    except:
        log("WARNING - failed to connect to \"" + port + "\" Is the connection busy?")
        return()
    log("Started Bluetooth server on port \"" + port + "\"")
    while True:
        raw = ser.readline().decode("utf-8")[:-1]
        try:
            msg = json.loads(raw)
        except:
            log("Unable to parse request \"" + raw + "\"")

        if msg[1] == "load_data":
            config = quickread("cordova/config.xml").split('"')
            result = {"game": json.loads(main_server().load_game()), "config": json.loads(main_server().get_config()), "version": config[3]}
        elif msg[1] == "upload":
            result = json.loads(main_server().upload(msg[2][0]))
        elif msg[1] == "heartbeat":
            if len(msg[2]) > 1:
                main_server().heartbeat(msg[0], msg[2][0], msg[2][1], msg[2][2])
            else:
                main_server().heartbeat(msg[0], msg[2][0])
            result = "success"
        else:
            result = "error"
        response = [msg[0], result]
        ser.write((json.dumps(response) + "\n").encode('utf-8'))
        log("\"" + msg[1] + "\" from device \"" + msg[0] + "\"", port)


if __name__ == "__main__":
    #Start bluetooth servers
    if bt_enable:
        bt_servers = []
        for i in range(len(bt_ports)):
            bt_servers.append(threading.Thread(target=bluetooth_server, args=(bt_ports[i],), daemon=True))
            bt_servers[i].start()
    
    #Start web server
    port = default_port
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    cherrypy.config.update({'server.socket_port': port, 'server.socket_host': host})
    cherrypy.quickstart(main_server(), "/", {"/favicon.ico": {"tools.staticfile.on": True, "tools.staticfile.filename": os.getcwd() + "/static/img/favicon.ico"}, "/static": {"tools.staticdir.on": True, "tools.staticdir.dir": os.getcwd() + "/static"}, "/releases": {"tools.staticdir.on": True, "tools.staticdir.dir": os.getcwd() + "/cordova/releases"}})
