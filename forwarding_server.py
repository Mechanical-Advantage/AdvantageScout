import websocket
import serial
import threading
import signal
import time
from enum import Enum
import sys

#Config
server_address = "ws://192.168.1.135:8002"
device_name = "forwarder" # added before port name for "route"
bt_ports_incoming = [] # not current, only for app versions < 1.4.0
bt_ports_outgoing = ["COM3", "COM4", "COM5", "COM6"] # current implementation
debug_logs = False # log when data is sent

#Log output in cherrypy format
def log(output, before_text=""):
    if before_text == "":
        print(time.strftime("[%d/%b/%Y:%H:%M:%S] ") + output)
    else:
        print(before_text + time.strftime(" - - [%d/%b/%Y:%H:%M:%S] ") + output)

class serial_mode(Enum):
    INCOMING = 0
    OUTGOING = 1

#Read data from serial, reconnecting if needed
def serial_readline(source, name):
    global sockets

    #Attempt to connect repeatedly
    def connect(ser):
        while True:
            try:
                ser.open()
            except:
                x = 0
            else:
                break

    line = ""
    while True:
        if source.is_open:
            line = source.readline().decode("utf-8")
        else:
            #Skip if not yet connected
            line = ""

        if line == "":
            #Reconnect because device appears to be disconnected (timeout reached)
            if source.is_open:
                log("Disconnected, waiting", name)
            try:
                source.close()
            except:
                x = 0
            sockets[name]["serial"] = None
            time.sleep(3)
            log("Trying to connect...", name)
            connect(source)
            sockets[name]["serial"] = source
            log("Connected successfully, forwarding", name)
        else:
            break
    return(line)

#Maintain bluetooth connection and handle incoming traffic
def bluetooth_server(name, mode):
    try:
        ser = serial.Serial()
        ser.port = name

        #Open immediately if incoming
        if mode == serial_mode.INCOMING:
            ser.open()
            sockets[name]["serial"] = ser
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
        raw = serial_readline(ser, name)
        if debug_logs:
            log("Received data from serial (" + str(len(raw)) + ")", name)
        if sockets[name]["web"] == None:
            log("Web socket not open, cannot forward from serial", name)
            ser.write("[]\n".encode('utf-8'))
        else:
            sockets[name]["web"].send(raw)

#Maintain web socket connection for serial port
def websocket_client(port, remote_name):
    global sockets

    def on_error(ws, error):
        print(error)

    def on_open(ws):
        ws.send(remote_name)
        nonlocal connected
        connected = True
        sockets[port]["web"] = ws
        log("Web socket connected", port)

    def on_message(ws, message):
        if debug_logs:
            log("Received data from web socket (" + str(len(message)) + ")", port)
        if sockets[port]["serial"] == None:
            log("Serial port not open, cannot forward from web socket", port)
        else:
            sockets[port]["serial"].write(message.encode('utf-8'))

    connected = False
    ws = websocket.WebSocketApp(server_address, on_open=on_open, on_message=on_message)
    log("Connecting to web socket...", port)
    while True:
        ws.run_forever()
        if connected:
            connected = False
            sockets[port]["web"] = None
            log("Web socket disconnected, trying to reconnect...", port)

#Initialize socket list
sockets = {}
for socket in bt_ports_incoming + bt_ports_outgoing:
    sockets[socket] = {
        "serial": None,
        "web": None,
    }

#Start web socket clients
web_servers = []
all_ports = bt_ports_incoming + bt_ports_outgoing
for i in range(len(all_ports)):
    web_servers.append(threading.Thread(target=websocket_client, args=(all_ports[i], device_name + "/" + all_ports[i],), daemon=True))
    web_servers[i].start()

#Start bluetooth servers
bt_servers = []
for i in range(len(bt_ports_outgoing)):
    bt_servers.append(threading.Thread(target=bluetooth_server, args=(bt_ports_outgoing[i],serial_mode.OUTGOING), daemon=True))
    bt_servers[i].start()
for i in range(len(bt_ports_incoming)):
    bt_servers.append(threading.Thread(target=bluetooth_server, args=(bt_ports_incoming[i],serial_mode.INCOMING), daemon=True))
    bt_servers[i + len(bt_ports_outgoing)].start()

def shutdown(sig, frame):
    sys.exit(0)

signal.signal(signal.SIGINT, shutdown)
while True:
    time.sleep(30)