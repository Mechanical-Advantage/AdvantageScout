import subprocess
import os

target_devices =[
    {
        "ip": "172.16.42.11:5555",
        "name": "6328 Scout 1"
    },
    {
        "ip": "172.16.42.12:5555",
        "name": "6328 Scout 2"
    },
    {
        "ip": "172.16.42.13:5555",
        "name": "6328 Scout 3"
    },
    {
        "ip": "172.16.42.16:5555",
        "name": "6328 Scout 4"
    }
]

def run(args, timeout=-1):
    if timeout == -1:
        return(subprocess.run(args, stdout=subprocess.PIPE).stdout.decode('utf-8'))
    try:
        return(subprocess.run(args, stdout=subprocess.PIPE, timeout=timeout).stdout.decode('utf-8'))
    except subprocess.TimeoutExpired:
        return("timeout")
    

def devices():
    output = []
    data = run(["adb", "devices"]).split("\n")[1:-2]
    for i in data:
        split = i[:-1].split("\t")
        if split[1] == "device":
            output.append(split[0])
    return(output)

#Get list of devices to connect to
to_connect = []
connected = []
device_list = devices()
for device in target_devices:
    if device["ip"] in device_list:
        connected.append(device)
    else:
        to_connect.append(device)
if len(to_connect) != 0:
    print("Trying to connect to devices:")
    [print(x["name"] + " (" + x["ip"] + ")") for x in to_connect]

#Attempt connections to missing devices
failed_connections = []
for device in to_connect:
    result = run(["adb", "connect", device["ip"]], timeout=3)
    if result[:9] == "connected":
        connected.append(device)
    else:
        failed_connections.append(device)

#Print lists of devices and confirm installation
if (len(to_connect)) != 0:
    print()
print("Connected devices:")
[print(x["name"] + " (" + x["ip"] + ")") for x in connected]
print()
print("Disconnected devices:")
if len(failed_connections) == 0:
    print("None")
else:
    [print(x["name"] + " (" + x["ip"] + ")") for x in failed_connections]
print()
print("Current version: " + open("cordova/config.xml", "r").read().split('"')[3])
if input("Continue installation? (y-n) ") != "y":
    print("Installation cancelled")
    exit()

#Install apk
for device in connected:
    print("Installing on " + device["name"] + " (" + device["ip"] + ")...", end="\r")
    run(["adb", "-s", device["ip"], "install", "-r", os.path.join("cordova", "releases", "AdvantageScout.apk")])
    print("Installed on " + device["name"] + " (" + device["ip"] + ")    ")

#Disconnect if needed
print()
if input("Disconnect from devices? (y-n) ") == "y":
    for device in connected:
        run(["adb", "disconnect", device["ip"]])
    print("Disconnected successfully")