import hid
import time 
import requests
import threading
import os
import random
from playsound3 import playsound

SOUNDS_DIR = "sounds/"

def get_random_sound():
    try:
        files = [f for f in os.listdir(SOUNDS_DIR) if f.lower().endswith(".mp3")] 
        return os.path.join(SOUNDS_DIR, random.choice(files))
    except:
        pass

def click():
    try:
        random_path = get_random_sound()
        playsound(random_path, block=False)
    except:
        pass
    
    try:
        response = requests.post(
            "http://localhost:8000/send_shift_message", 
            data={"forceShiftToggle": "true", "ts": int(round(time.time() * 1000))},
        )
        print(f"Server Status: {response.status_code}")
        print("*" * 20 + " Starting Teleop " + "*" * 20)
    except requests.exceptions.RequestException as e:
        print(f"Server Error: {e}")

class PowerMateScanner(threading.Thread):
    def __init__(self, callback):
        super().__init__()
        self.callback = callback
        self.daemon = True
        self.running = True
        self.device = hid.device()
        self.connected = False

    def attempt_connect(self):
        try:
            self.device.open(0x077d, 0x0410)
            self.device.set_nonblocking(1)
            self.connected = True
            print("PowerMate connected")
            return True
        except OSError:
            self.connected = False
            return False

    def run(self):
        last_button_state = 0
        
        while self.running:
            if not self.connected:
                if self.attempt_connect():
                    pass
                else:
                    time.sleep(2)
                    continue

            try:
                report = self.device.read(6)
                if report:
                    current_button_state = report[0]
                    if current_button_state == 1 and last_button_state == 0:
                        self.callback()
                    last_button_state = current_button_state
                
            except OSError:
                print("PowerMate disconnected")
                self.connected = False
                self.device.close()
            
            time.sleep(0.01)

    def stop(self):
        self.running = False
        self.device.close()

if __name__ == "__main__":
    scanner = PowerMateScanner(callback=click)
    scanner.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        scanner.stop()