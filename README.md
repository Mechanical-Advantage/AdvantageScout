# Advantage Scout
Advantage Scout is a custom web based scouting system, which is intended to connect to both team and student devices over Bluetooth PAN. The site is build as a 'web app' using JavaScript, meaning it can run without a persistent connection to the server. It is designed to work on a wide variety of screen sizes in any orientation. Features two scouting layouts which can be switched based on user preference:

* **Classic layout** - Uses standard inputs (selectors, counters, textboxes, etc.) simliar to many other scouting apps
* **Visual layout** - Shows an interactive diagram of the field so that the movement of game pieces and/or the robot can be modeled visually

The setup of each year's game is fully customizable by editting a JSON preferences file and writing your own 'canvas manager' in JavaScript, which is responible for managing the visual layout. The collected data will be saved in a SQLite database.

## Setup
The web server is designed to run on Python 3. To check your python version, open a command prompt/terminal and enter `python --version` You may also have Python 3 installed separately as `python3`, so try running `python3 --version` If Python 3 is not installed on your system, you can download it from https://www.python.org/downloads/

Launch the web server by navigating to the root folder of the repository and running
```
python server.py [port] OR python3 server.py [port]
```
The server will run on port 8000 by default. The default port, host ip, and database paths can be modified in `server.py`

### Navigation guide
* **(host)/** - Main scouting page. Navigate here on scouting devices.
* **(host)/config** - Sets device name. Will be opened automatically on new devices.
* **(host)/admin** - System overview. Configures current game, event, and alliance positions. Shows the status of all devices.
* **(host)/export** - Manual data export. Produces raw JSON of any matches currently saved offline.
