import hid
import time 
import requests
from playsound3 import playsound
import threading

def click():
    response = requests.post("http://localhost:8000/send_shift_message", data={"forceShiftToggle": "true", "ts": int(round(time.time() * 1000))})
    playsound("sounds/Beep.mp3", block=False)
    print(f"Server Status: {response.status_code}")
    print("*" * 20 + "Starting Teleop" + "*" * 20)

class PowerMateScanner(threading.Thread):
    def __init__(self, callback):
        super().__init__()
        self.callback = callback
        self.daemon = True
        self.running = True
        
        self.device = hid.device()
        try:
            self.device.open(0x077d, 0x0410)
            self.device.set_nonblocking(1)
            print("PowerMate connected.")
        except OSError:
            print("Could not open PowerMate.")
            self.running = False

    def run(self):
        last_button_state = 0
        while self.running:
            report = self.device.read(6)
            if report:
                current_button_state = report[0]
                
                if current_button_state == 1 and last_button_state == 0:
                    self.callback()
                
                last_button_state = current_button_state
            
            time.sleep(0.01)

    def stop(self):
        self.running = False
        self.device.close()

if __name__ == "__main__":
    scanner = PowerMateScanner(callback=click)
    scanner.start()
    while True:
        time.sleep(1)
