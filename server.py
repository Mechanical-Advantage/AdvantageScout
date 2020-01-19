import scheduler
import sqlite3 as sql
import cherrypy
import tbapy
from simple_websocket_server import WebSocketServer, WebSocket
from jsmin import jsmin
import json
import base64
import time
import threading
from pathlib import Path
from enum import Enum
import os
import sys

#Config
default_port = 8000 # can override w/ command line argument
admin_socket_port = 8001 # port for admin web socket
forward_socket_port = 8002 # port for forwarding server (set "None" to disable)
host = "0.0.0.0"
bt_enable = True
bt_ports_incoming = ["COM3"] # not current, only for app versions < 1.4.0
bt_ports_outgoing = ["COM4", "COM5", "COM6", "COM7", "COM8", "COM10"]  # current implementation
bt_showheartbeats = True
tba = tbapy.TBA("KDjqaOWmGYkyTSgPCQ7N0XSezbIBk1qzbuxz8s5WfdNtd6k34yL46vU73VnELIrP")
db_global = "global.db" # database for data not tied to specific games
db_games = "data_$GAME.db" # database for collected scouting data
image_dir = "images" # folder for image data
default_game = "2019"

#Import serial library
if bt_enable:
    import serial

#Log output in cherrypy format
def log(output, before_text=""):
    if before_text == "":
        print(time.strftime("[%d/%b/%Y:%H:%M:%S] ") + output)
    else:
        print(before_text + time.strftime(" - - [%d/%b/%Y:%H:%M:%S] ") + output)

#Initialize global
def init_global():
    conn_global = sql.connect(db_global)
    cur_global = conn_global.cursor()
    cur_global.execute("DROP TABLE IF EXISTS devices")
    cur_global.execute("""CREATE TABLE devices (
        name TEXT,
        last_heartbeat INTEGER,
        last_route TEXT,
        last_battery INTEGER,
        last_charging INTEGER,
        last_status INTEGER,
        last_team INTEGER,
        last_match INTEGER
        ); """)
    cur_global.execute("DROP TABLE IF EXISTS scouts")
    cur_global.execute("""CREATE TABLE scouts (
        name TEXT,
        enabled INTEGER
        ); """)
    cur_global.execute("DROP TABLE IF EXISTS schedule_next")
    cur_global.execute("""CREATE TABLE schedule_next (
        team INTEGER,
        scout TEXT
        ); """)
    cur_global.execute("DROP TABLE IF EXISTS schedule")
    cur_global.execute("""CREATE TABLE schedule (
        match INTEGER,
        b1 INTEGER,
        b2 INTEGER,
        b3 INTEGER,
        r1 INTEGER,
        r2 INTEGER,
        r3 INTEGER
        ); """)
    cur_global.execute("DROP TABLE IF EXISTS config")
    cur_global.execute("""CREATE TABLE config (
        key TEXT,
        value TEXT
        ); """)
    cur_global.execute("INSERT INTO config (key, value) VALUES ('game', ?)", (default_game,))
    cur_global.execute("INSERT INTO config (key, value) VALUES ('event', '2017nhgrs')")
    cur_global.execute("INSERT INTO config (key, value) VALUES ('reverse_alliances', '0')")
    cur_global.execute("INSERT INTO config (key, value) VALUES ('dev_mode', '0')")
    cur_global.execute("INSERT INTO config (key, value) VALUES ('schedule_match', '-1')")
    cur_global.execute("INSERT INTO config (key, value) VALUES ('event_cached', 'none')")
    cur_global.execute("INSERT INTO config (key, value) VALUES ('auto_schedule', '0')")
    conn_global.commit()
    conn_global.close()

if not Path(db_global).is_file():
    log("Creating new global database")
    init_global()

if not os.path.exists(image_dir):
    log("Creating image directory")
    os.mkdir(image_dir)

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
    
    #Matches table
    create_text = "Event TEXT, Team INTEGER, Match INTEGER, DeviceName TEXT, Version TEXT, InterfaceType TEXT, Time INTEGER, UploadTime INTEGER, ScoutName TEXT, "
    for i in range(len(config["fields"])):
        create_text += config["fields"][i] + ","
    create_text = create_text[:-1]
    cur_game.execute("DROP TABLE IF EXISTS match")
    cur_game.execute("CREATE TABLE match (" + create_text + ")")

    #Pit scouting table
    if "pitFields" in config:
        create_text = "Event TEXT, Team INTEGER, DeviceName TEXT, Version TEXT, Time INTEGER, UploadTime INTEGER, ScoutName TEXT, "
        for i in range(len(config["pitFields"])):
            create_text += config["pitFields"][i] + ","
        create_text = create_text[:-1]
        cur_game.execute("DROP TABLE IF EXISTS pit")
        cur_game.execute("CREATE TABLE pit (" + create_text + ")")

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
        <script type="text/javascript" src="/managers.js"></script>
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

            <div id="selectionDiv_matchswitch">
                <button onclick="javascript:appManager.scoutManager.setSelection(&quot;pit&quot;)">
                    Pit Scout
                </button>
            </div>

            <div id="selectionDiv_pitswitch">
                <button onclick="javascript:appManager.scoutManager.setSelection(&quot;match&quot;)">
                    Match Scout
                </button>
            </div>

            <div id="scoutselectdiv">
                Scout:
                <select id="scoutselect"></select>
            </div>

            <div id="selectionDiv_match">
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
                    <button id="visualstart" class="scoutstart" onclick="javascript:appManager.scoutManager.start(&quot;visual&quot;)">
                        Scout! (visual)
                    </button>
                    <br id="twobuttonbreak">
                    <button id="classicstart" class="scoutstart" onclick="javascript:appManager.scoutManager.start(&quot;classic&quot;)">
                        Scout! (classic)
                    </button>
                </div>

                <div id="scheduleDiv" style="margin-top: 25px;" hidden>
                    Match <span id="schedulematch"></span> Schedule:
                    <table id="schedule"></table>
                </div>
            </div>
            
            <div id="selectionDiv_pit" hidden>
                Team:
                <input id="pitTeam" type="number" min="1" max="9999" step="1" class="teammatch"></input>
                <br>
                <button class="scoutstart" onclick="javascript:appManager.scoutManager.start(&quot;pit&quot;)">
                    Pit Scout!
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
            <button class="scoutstart" onclick="javascript:appManager.scoutManager.close(true, true)">
                Continue
            </button>
        </div>
        
        <div id="modeSwitcherDiv" class="modeswitcher" hidden>
            <div class="switcherbutton1" onclick="javascript:appManager.scoutManager.setMode(1)" style="font-weight: bold;">
                Autonomous
            </div>
            <div class="switcherbutton2" onclick="javascript:appManager.scoutManager.setMode(2)">
                Tele-operated
            </div>
            <div class="switcherbutton3" onclick="javascript:appManager.scoutManager.setMode(3)">
                End Game
            </div>
        </div>
        
        <div id="pitSwitcherDiv" class="modeswitcher pitswitcher" hidden>
            Pit Scout - <span id="pitNumber">????</span>
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
        
        <div id="pitClassicDiv" class="classicdiv" hidden>
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
    
        <script>
            var appManager = new AppManager(true)
        </script>
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
document.body.innerHTML = window.localStorage.getItem("advantagescout_scoutdata")
</script>
</body>
</html>
            """)
    
    @cherrypy.expose(["managers.js"])
    def managers(self):
        names = ["ButtonManager", "AppManager", "SettingsManager", "ScoutManager", "ClassicManager", "VisualManager", "WebNotificationManager", "WebServerManager"]
        output = ""
        for name in names:
            output += open("src/" + name + ".js", "r").read() + "\n"
        return(jsmin(output))
    
    @cherrypy.expose
    def heartbeat(self, device_name, state, battery=-1, charging=0, team=-1, match=-1, route=None):
        if route == None:
            route = cherrypy.request.remote.ip

        conn_global = sql.connect(db_global)
        cur_global = conn_global.cursor()
        cur_global.execute("SELECT name FROM devices")
        names = cur_global.fetchall()
        for i in range(len(names)):
            names[i] = names[i][0]
        if device_name not in names:
            cur_global.execute("INSERT INTO devices (name, last_heartbeat, last_route, last_battery, last_charging, last_status) VALUES (?, ?, ?, ?, ?, ?)", (device_name, currentTime(), route, battery, charging, state))
        else:
            cur_global.execute("UPDATE devices SET last_heartbeat = ?, last_route = ?, last_battery=?, last_charging = ?, last_status = ? WHERE name = ?", (currentTime(), route, battery, charging, state, device_name))
        if team != -1:
            cur_global.execute("UPDATE devices SET last_team = ? WHERE name = ?", (team, device_name))
        if match != -1:
            cur_global.execute("UPDATE devices SET last_match = ? WHERE name = ?", (match, device_name))
        conn_global.commit()
        conn_global.close()
        update_admin()
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
                "CanvasManager": jsmin(quickread(path + "CanvasManager.js"))
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
            if "InterfaceType" not in data[i]:
                continue
            pit_scout = data[i]["InterfaceType"] == "pit"
            if pit_scout:
                if ("Event" not in data[i]) or ("Team" not in data[i]) or ("DeviceName" not in data[i]) or ("Time" not in data[i]):
                    continue
                duplicate_count = cur_game.execute("SELECT COUNT(*) FROM pit WHERE Event=? AND Team=? AND DeviceName=? AND Time=?", (data[i]["Event"], data[i]["Team"], data[i]["DeviceName"], data[i]["Time"])).fetchall()[0][0]
            else:
                if ("Event" not in data[i]) or ("Team" not in data[i]) or ("Match" not in data[i]) or ("DeviceName" not in data[i]) or ("Time" not in data[i]):
                    continue
                duplicate_count = cur_game.execute("SELECT COUNT(*) FROM match WHERE Event=? AND Team=? AND Match=? AND DeviceName=? AND Time=?", (data[i]["Event"], data[i]["Team"], data[i]["Match"], data[i]["DeviceName"], data[i]["Time"])).fetchall()[0][0]
            
            if duplicate_count > 0:
                continue
            
            to_save = {}
            if pit_scout:
                fields = prefs["pitFields"] + ["Event TEXT", "Team INTEGER", "DeviceName TEXT", "Version TEXT", "Time INTEGER", "UploadTime INTEGER", "ScoutName TEXT"]
            else:
                fields = prefs["fields"] + ["Event TEXT", "Team INTEGER", "Match INTEGER", "DeviceName TEXT", "Version TEXT", "InterfaceType TEXT", "Time INTEGER", "UploadTime INTEGER", "ScoutName TEXT"]
            for f in range(len(fields)):
                field_name = fields[f].split(" ")[0]
                if field_name in data[i]:
                    if len(str(data[i][field_name])) > 23:
                        if data[i][field_name][:23] == "data:image/jpeg;base64,":
                            to_save[field_name] = save_image(data[i][field_name])
                        else:
                            to_save[field_name] = data[i][field_name]
                    else:
                        to_save[field_name] = data[i][field_name]

            fields = ["UploadTime"]
            values = [str(currentTime())]
            for field, value in to_save.items():
                fields.append(field)
                values.append(str(value))
            if pit_scout:
                table = "pit"
            else:
                table = "match"
            cur_game.execute("INSERT INTO " + table + " (" + ",".join(fields) + ") VALUES (" + ",".join(["?"] * len(fields)) + ")", tuple(values))
        conn_game.commit()
        conn_game.close()
        result["success"] = True
        return(json.dumps(result))

    @cherrypy.expose
    def get_schedule(self):
        conn_global = sql.connect(db_global)
        cur_global = conn_global.cursor()

        event = cur_global.execute("SELECT value FROM config WHERE key='event'").fetchall()[0][0]
        event_cached = cur_global.execute("SELECT value FROM config WHERE key='event_cached'").fetchall()[0][0]
        if event != event_cached:
            output = {}
        else:
            match = cur_global.execute("SELECT value FROM config WHERE key='schedule_match'").fetchall()[0][0]
            schedule = cur_global.execute("SELECT * FROM schedule_next").fetchall()
            teams = []
            scouts = []
            for row in schedule:
                teams.append(row[0])
                scouts.append(row[1])
            output = {"match": match, "teams": teams, "scouts": scouts}

        conn_global.close()
        return json.dumps(output)

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
        <div class="section">
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
            
            <br>
            Dev Mode:
            <select id="dev_mode">
                <option value="0">
                    disabled
                </option>
                <option value="1">
                    enabled
                </option>
            </select>
            <button onclick="javascript:save(&quot;dev_mode&quot;)">
                Save
            </button>

            <br>
            Scheduling Method:
            <select id="auto_schedule">
                <option value="0">
                    manual
                </option>
                <option value="1">
                    auto
                </option>
            </select>
            <button onclick="javascript:save(&quot;auto_schedule&quot;)">
                Save
            </button>
        </div>

        <div class="section">
            <h3>
                Scheduling
            </h3>
            Matches cached for event <span style="font-style: italic;" id="eventcache">none</span>.
            <button onclick="javascript:refreshCache()">
                Refresh
            </button>
            <br>
            <button onclick="javascript:reschedule(false)">
                Reschedule next match
            </button>
            <br>
            <input id="manualSchedule" type="number"></input>
            <button onclick="javascript:reschedule(true)">
                Force schedule
            </button>
            <div id="scheduleDiv" hidden>
                <br>
                Schedule for match <span id="matchnumber">0</span>:
                <table id="schedule"></table>
            </div>
        </div>

        <div class="section">
            <h3>
                Scout List
            </h3>
            <table id="scoutlist"></table>
        </div>
        
        <div class="section">
            <h3>
                Devices
            </h3>
            <table class="devices">
                <tbody id="deviceTable">
                    <tr>
                        <th class="devices">
                            Name
                        </th>
                        <th class="devices">
                            Route
                        </th>
                        <th class="devices">
                            Battery %
                        </th>
                        <th class="devices">
                            Status
                        </th>
                        <th class="devices">
                            Heartbeat
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>

        <div id="uploadedDiv" class="section" hidden>
            <h3>
                Uploaded Matches
            </h3>
            <table id="uploadedTable" class="uploadedtable">
                <tr>
                    <td class="uploadedheader">
                        Match
                    </td>
                    <td class="uploadedheader">
                        B1
                    </td>
                    <td class="uploadedheader">
                        B2
                    </td>
                    <td class="uploadedheader">
                        B3
                    </td>
                    <td class="uploadedheader">
                        R1
                    </td>
                    <td class="uploadedheader">
                        R2
                    </td>
                    <td class="uploadedheader">
                        R3
                    </td>
                </tr>
            </table>
        </div>
        
        <script src="/static/js/admin.js"></script>
    </body>
</html>
            """
        return(output.replace("$FAVICON_CODE", favicon_code))

    @cherrypy.expose
    def toggle_scout(self, scout):
        conn_global = sql.connect(db_global)
        cur_global = conn_global.cursor()
        new = 1 - cur_global.execute("SELECT enabled FROM scouts WHERE name=?", (scout,)).fetchall()[0][0]
        cur_global.execute("UPDATE scouts SET enabled=? WHERE name=?", (new,scout))
        conn_global.commit()
        conn_global.close()
        return

    @cherrypy.expose
    def get_devices(self):
        conn_global = sql.connect(db_global)
        cur_global = conn_global.cursor()
        cur_global.execute("SELECT * FROM devices ORDER BY last_heartbeat DESC")
        raw = cur_global.fetchall()
        data = []
        for i in range(len(raw)):
            data.append({"name": raw[i][0], "last_heartbeat": raw[i][1], "last_route": raw[i][2], "last_battery": raw[i][3], "last_charging": raw[i][4], "last_status": raw[i][5], "last_team": raw[i][6], "last_match": raw[i][7]})
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
        cur_global.execute("SELECT value FROM config WHERE key = 'dev_mode'")
        data["dev_mode"] = cur_global.fetchall()[0][0]
        cur_global.execute("SELECT * FROM scouts ORDER BY name")
        data["scouts"] = [{"name": x[0], "enabled": x[1] == 1} for x in cur_global.fetchall()]
        cur_global.execute("SELECT value FROM config WHERE key = 'event_cached'")
        data["event_cache"] = cur_global.fetchall()[0][0]
        cur_global.execute("SELECT value FROM config WHERE key = 'auto_schedule'")
        data["auto_schedule"] = cur_global.fetchall()[0][0]
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
        elif key == "dev_mode":
            if value == "0":
                response = "Developer mode disabled"
            else:
                response = "Developer mode enabled"
        elif key == "auto_schedule":
            if value == "0":
                response = "Auto scheduling disabled"
            else:
                response = "Auto scheduling enabled"
        else:
            response = "Error: unknown key \"" + key + "\""
        return(response)

    @cherrypy.expose
    def get_cache(self):
        conn_global = sql.connect(db_global)
        cur_global = conn_global.cursor()
        event = cur_global.execute("SELECT value FROM config WHERE key = 'event'").fetchall()[0][0]
        try:
            matchlist_raw = tba.event_matches(event)
            matchlist_raw.sort(key=lambda x: x.match_number)
        except:
            return "Error - could not retrieve schedule"

        if len(matchlist_raw) == 0:
            return "Error - no schedule available"

        cur_global.execute("DELETE FROM schedule")
        cur_global.execute("UPDATE config SET value=? WHERE key='event_cached'", (event,))
        for match_raw in matchlist_raw:
            if match_raw.comp_level == "qm":
                b1 = match_raw.alliances["blue"]["team_keys"][0][3:]
                b2 = match_raw.alliances["blue"]["team_keys"][1][3:]
                b3 = match_raw.alliances["blue"]["team_keys"][2][3:]
                r1 = match_raw.alliances["red"]["team_keys"][0][3:]
                r2 = match_raw.alliances["red"]["team_keys"][1][3:]
                r3 = match_raw.alliances["red"]["team_keys"][2][3:]
                cur_global.execute("INSERT INTO schedule(match,b1,b2,b3,r1,r2,r3) VALUES (?,?,?,?,?,?,?)", (match_raw.match_number,b1,b2,b3,r1,r2,r3))

        conn_global.commit()
        conn_global.close()
        return("Downloaded schedule for " + event + ".")

    @cherrypy.expose
    def reschedule(self, force_match=None):
        game_result = gamedb_connect()
        conn_game = game_result["conn"]
        cur_game = conn_game.cursor()
        conn_global = sql.connect(db_global)
        cur_global = conn_global.cursor()

        result = schedule_match(cur_game, cur_global, conn_global, force_match)

        conn_game.close()
        conn_global.close()
        return(result)


    @cherrypy.expose
    def get_uploaded(self):
        game_result = gamedb_connect()
        conn_game = game_result["conn"]
        cur_game = conn_game.cursor()
        conn_global = sql.connect(db_global)
        cur_global = conn_global.cursor()

        event = cur_global.execute(
            "SELECT value FROM config WHERE key='event'").fetchall()[0][0]
        event_cached = cur_global.execute(
            "SELECT value FROM config WHERE key='event_cached'").fetchall()[0][0]
        output = []
        if event == event_cached:
            matches = cur_global.execute("SELECT match,b1,b2,b3,r1,r2,r3 FROM schedule ORDER BY match").fetchall()
            for teams in matches:
                match_output = {"teams": teams[1:7], "uploaded": []}
                for team in teams[1:7]:
                    count = cur_game.execute("SELECT COUNT(*) FROM match WHERE Event=? AND Team=? AND Match=?", (event,team,teams[0])).fetchall()[0][0]
                    match_output["uploaded"].append(count > 0)
                output.append(match_output)

        conn_game.close()
        conn_global.close()
        return(json.dumps(output))


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

def save_image(raw):
    previous_images = os.listdir(image_dir)
    max_id = -1
    for name in previous_images:
        if len(name) > 3:
            if name[:4] == "IMG_":
                id = int(name[4:9])
                if id > max_id:
                    max_id = id
    
    file_path = image_dir + os.path.sep + "IMG_" + str(max_id + 1).zfill(5) + ".jpg"
    file = open(file_path, "wb")
    file.write(base64.decodebytes(raw[23:].encode("utf-8")))
    file.close()
    return(file_path)

def serial_readline(source, name, mode):
    #Attempt to connect repeatedly
    def connect(ser):
        while True:
            try:
                ser.open()
            except:
                x = 0
            else:
                break

    #Timeout thread, resets line if no data for 3 seconds
    def timeout():
        nonlocal full_line
        while True:
            time.sleep(0.5)
            if last_data == -2:
                break
            if full_line != "" and time.time() - last_data > 3:
                log("Request timed out", name)
                full_line = ""

    full_line = ""
    last_data = -1
    timeout = threading.Thread(target=timeout, daemon=True)
    timeout.start()
    while True:
        if mode == serial_mode.WEBSOCKET:
            wait = True
            while wait:
                time.sleep(0.2)
                try:
                    wait = len(forward_queues[source]) == 0
                except:
                    return(False)
            line = forward_queues[source].pop(0)
        else:
            if source.is_open:
                line = source.readline().decode("utf-8")    
            else:
                #Skip if not yet connected
                line = ""

        last_data = time.time()
        if line[-5:] == "CONT\n":
            full_line += line[:-5]
            if mode == serial_mode.WEBSOCKET:
                source.send_message("CONT\n")
            else:
                source.write("CONT\n".encode("utf-8"))
        elif line == "" and mode != serial_mode.WEBSOCKET:
            #Reconnect because device appears to be disconnected (timeout reached)
            if source.is_open:
                log("Disconnected, waiting", name)
            try:
                source.close()
            except:
                x = 0
            time.sleep(3)
            log("Trying to connect...", name)
            connect(source)
            log("Connected successfully, ready for data", name)
        else:
            full_line += line[:-1]
            break
    last_data = -2
    return(full_line)

class serial_mode(Enum):
    INCOMING = 0
    OUTGOING = 1
    WEBSOCKET = 2

def bluetooth_server(name, mode, client=None):
    if mode == serial_mode.WEBSOCKET:
        wait = True
        while wait:
            try:
                wait = len(forward_queues[client]) == 0
            except:
                return
        name = forward_queues[client].pop(0)
        log("Started forwarding thread", name)
    else:
        try:
            ser = serial.Serial()
            ser.port = name

            #Open immediately if incoming
            if mode == serial_mode.INCOMING:
                ser.open()
            else:
                ser.timeout = 5
        except:
            log("WARNING - failed to connect to \"" + name + "\" Is the connection busy?")
            return
        if mode == serial_mode.INCOMING:
            type = "incoming"
        else:
            type = "outgoing"
        log("Started Bluetooth server on " + type + " port \"" + name + "\"")

    while True:
        if mode == serial_mode.WEBSOCKET:
            raw = serial_readline(client, name, mode)
        else:
            raw = serial_readline(ser, name, mode)

        if raw == False:
            # Shutdown thread
            return

        try:
            msg = json.loads(raw)
        except:
            log("Unable to parse request", name)
            if mode == serial_mode.WEBSOCKET:
                client.send_message("[]\n")
            else:
                ser.write("[]\n".encode('utf-8'))
            continue

        if msg[1] == "load_data":
            config = quickread("cordova/config.xml").split('"')
            result = {"game": json.loads(main_server().load_game()), "config": json.loads(main_server().get_config()), "version": config[3]}
        elif msg[1] == "upload":
            result = json.loads(main_server().upload(msg[2][0]))
        elif msg[1] == "heartbeat":
            if len(msg[2]) > 3:
                main_server().heartbeat(device_name=msg[0], state=msg[2][0], battery=msg[2][1], charging=msg[2][2], team=msg[2][3], match=msg[2][4], route=name)
            else:
                main_server().heartbeat(device_name=msg[0], state=msg[2][0], battery=msg[2][1], charging=msg[2][2], route=name)
            result = "success"
        elif msg[1] == "get_schedule":
            result = json.loads(main_server().get_schedule())
        else:
            result = "error"
        response = [msg[0], result]
        if mode == serial_mode.WEBSOCKET:
            client.send_message(json.dumps(response) + "\n")
        else:
            ser.write((json.dumps(response) + "\n").encode('utf-8'))
        if bt_showheartbeats or msg[1] != "heartbeat":
            log("\"" + msg[1] + "\" from device \"" + msg[0] + "\"", name)

#Admin web socket server
admin_clients = []
def update_admin():
    data = main_server().get_devices()
    for client in admin_clients:
        client.send_message(data)

class admin_server(WebSocket):
    global admin_clients

    def handle(self):
        log("Received data \"" + self.data + "\"", self.address[0])

    def connected(self):
        log("Admin web socket opened", self.address[0])
        admin_clients.append(self)

    def handle_close(self):
        log("Admin web socket closed", self.address[0])
        admin_clients.remove(self)

#Forward web socket server
forward_queues = {}
forward_threads = {}
class forward_server(WebSocket):
    global forward_clients

    def handle(self):
        forward_queues[self].append(self.data)

    def connected(self):
        log("Forwarding web socket opened", self.address[0])
        forward_queues[self] = []
        forward_threads[self] = threading.Thread(target=bluetooth_server, args=(None,serial_mode.WEBSOCKET,self))
        forward_threads[self].start()

    def handle_close(self):
        log("Forwarding web socket closed", self.address[0])
        del forward_queues[self]
        del forward_threads[self]

def run_websocket(host, port, server):
    server = WebSocketServer(host, port, server)
    log("Starting web socket server on ws://" + host + ":" + str(port))
    server.serve_forever()
    log("Stopping web socket server on ws://" + host + ":" + str(port))

#Automatic scheduling thread
def scheduler_thread():
    game_result = gamedb_connect()
    conn_game = game_result["conn"]
    cur_game = conn_game.cursor()
    conn_global = sql.connect(db_global)
    cur_global = conn_global.cursor()

    last_event = ""
    last_match = -1
    while True:
        time.sleep(2)
        event = cur_global.execute("SELECT value FROM config WHERE key = 'event_cached'").fetchall()[0][0]
        enabled = cur_global.execute("SELECT value FROM config WHERE key = 'auto_schedule'").fetchall()[0][0] == "1"
        to_schedule = get_next_schedule_match(cur_game, cur_global)

        if (to_schedule != last_match or event != last_event) and enabled:
            if schedule_match(cur_game, cur_global, conn_global)[:3] == "Suc":
                last_event = event
                last_match = to_schedule

def get_next_schedule_match(cur_game, cur_global):
    event = cur_global.execute("SELECT value FROM config WHERE key = 'event_cached'").fetchall()[0][0]
    data = cur_game.execute("SELECT match, COUNT(match) FROM match WHERE Event=? GROUP BY match ORDER BY match DESC", (event,)).fetchall()
    to_schedule = -1
    for i in data:
        if i[1] > 3:
            to_schedule = i[0] + 1
            break
    if to_schedule == -1:
        to_schedule = 1
    return(to_schedule)

def schedule_match(cur_game, cur_global, conn_global, force_match=None):
    if force_match == None:
        to_schedule = get_next_schedule_match(cur_game, cur_global)
    else:
        to_schedule = force_match
    event = cur_global.execute("SELECT value FROM config WHERE key = 'event_cached'").fetchall()[0][0]
    log("Creating new schedule for match " + str(to_schedule))

    #Find teams in match
    teams = cur_global.execute("SELECT b1,b2,b3,r1,r2,r3 FROM schedule WHERE match=?", (to_schedule,)).fetchall()
    if len(teams) == 0:
        log("Could not create schedule for match " + str(to_schedule))
        return("Could not create schedule for match " + str(to_schedule))
    teams = teams[0]

    #Get scout records
    scouts = [x[0] for x in cur_global.execute("SELECT name FROM scouts WHERE enabled='1' ORDER BY name").fetchall()]
    if len(scouts) < 6:
        log("Not enough scouts to schedule match " + str(to_schedule) + " - HURRY!")
        return("Not enough scouts to schedule match " + str(to_schedule) + " - HURRY!")

    scout_records = []
    for scout in scouts:
        scoutdata = {"name": scout}
        records = cur_game.execute("SELECT Team, COUNT(*) FROM match WHERE ScoutName=? GROUP BY Team", (scout,)).fetchall()
        for row in records:
            scoutdata[row[0]] = row[1]
        pit_records = cur_game.execute("SELECT Team, COUNT(*) FROM pit WHERE ScoutName=? GROUP BY Team", (scout,)).fetchall()
        for row in pit_records:
            if row[0] in scoutdata:
                scoutdata[row[0]] += row[1] * 5
            else:
                scoutdata[row[0]] = row[1] * 5
        scoutdata["total"] = cur_game.execute("SELECT COUNT(*) FROM match WHERE Event=? AND ScoutName=?", (event,scout)).fetchall()[0][0]
        scout_records.append(scoutdata)
    
    schedule = scheduler.get_schedule(teams=teams, scout_records=scout_records, total_priority=0.5, prefs={})

    #Write to db
    cur_global.execute("DELETE FROM schedule_next")
    cur_global.execute("UPDATE config SET value=? WHERE key='schedule_match'", (to_schedule,))
    for team in teams:
        cur_global.execute("INSERT INTO schedule_next(team,scout) VALUES (?,?)", (team,schedule[team]))
    conn_global.commit()
    return("Successfully created schedule for match " + str(to_schedule))


if __name__ == "__main__":
    #Start bluetooth servers
    if bt_enable:
        bt_servers = []
        for i in range(len(bt_ports_outgoing)):
            bt_servers.append(threading.Thread(target=bluetooth_server, args=(bt_ports_outgoing[i],serial_mode.OUTGOING), daemon=True))
            bt_servers[i].start()
        for i in range(len(bt_ports_incoming)):
            bt_servers.append(threading.Thread(target=bluetooth_server, args=(bt_ports_incoming[i],serial_mode.INCOMING), daemon=True))
            bt_servers[i + len(bt_ports_outgoing)].start()
    
    #Start forwarding server
    if forward_socket_port != None:
        forward_server_thread = threading.Thread(target=run_websocket, args=(host, forward_socket_port, forward_server), daemon=True)
        forward_server_thread.start()

    #Start admin server
    admin_server_thread = threading.Thread(target=run_websocket, args=(host, admin_socket_port, admin_server), daemon=True)
    admin_server_thread.start()

    #Start auto scheduling thread
    schedule_thread = threading.Thread(target=scheduler_thread, daemon=True)
    schedule_thread.start()

    #Start web server
    port = default_port
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    cherrypy.config.update({'server.socket_port': port, 'server.socket_host': host})
    cherrypy.quickstart(main_server(), "/", {"/favicon.ico": {"tools.staticfile.on": True, "tools.staticfile.filename": os.getcwd() + "/static/img/favicon.ico"}, "/static": {"tools.staticdir.on": True, "tools.staticdir.dir": os.getcwd() + "/static"}, "/releases": {"tools.staticdir.on": True, "tools.staticdir.dir": os.getcwd() + "/cordova/releases"}})
