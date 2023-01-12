import hashlib
import json
import os
import sqlite3 as sql
import subprocess
import threading
import time
from pathlib import Path

import cherrypy


class SvelteInterface:
    """Automatically builds the game as necessary."""

    _game_data = None
    _db_global = None

    def __init__(self, db_global):
        self._db_global = db_global

    def get_game(self):
        """Returns a dictionary with the game bundle data."""
        return self._game_data

    def _get_absolute_path(self, *path):
        """Returns the absolute path based on a path relative to this folder."""
        joined_path = os.path.dirname(__file__)
        for item in path:
            joined_path = os.path.join(joined_path, item)
        return os.path.abspath(joined_path)

    def _build(self, game=""):
        node = subprocess.Popen(["npm run build -- \"" + game + "\""],
                                cwd=self._get_absolute_path("games"), stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, shell=True)
        code = node.wait()
        if code == 0:
            cherrypy.log(
                "Game build succeeded")
        else:
            cherrypy.log(
                "WARNING: Game build failed")

        self._game_data = {
            "css": open(self._get_absolute_path("games", "build", "game.css"), "r").read(),
            "js": open(self._get_absolute_path("games", "build", "game.js"), "r").read()
        }

    def _get_game_name(self):
        """Returns the name of the selected game."""
        conn_global = sql.connect(self._db_global)
        cur_global = conn_global.cursor()
        cur_global.execute("SELECT value FROM config WHERE key = 'game'")
        game = str(cur_global.fetchall()[0][0])
        conn_global.close()
        return game

    def _build_thread(self):
        last_modified_cache = {}
        last_game = None
        first_cycle = True
        while True:
            # Wait for file changes
            has_changed = False
            while not has_changed:
                game = self._get_game_name()
                if last_game != game:
                    last_game = game
                    has_changed = True

                current_files = [str(x) for x in Path(self._get_absolute_path(
                    "games", "config")).rglob("*.*")]

                for x in current_files:
                    if x not in last_modified_cache or last_modified_cache[x] != os.stat(x).st_mtime:
                        has_changed = True
                        last_modified_cache[x] = os.stat(x).st_mtime
                for x in last_modified_cache.keys():
                    if x not in current_files:
                        has_changed = True
                        del last_modified_cache[x]

                if not has_changed:
                    time.sleep(1)

            # Build the app
            if has_changed and not first_cycle:
                self._build(last_game)
            first_cycle = False

    def start(self):
        # Check for "node_modules"
        if not os.path.isdir(self._get_absolute_path("games", "node_modules")):
            launch_allowed = True
            response = input("Install Node modules for Svelte? (y-n) ")
            if response == "y" or response == "yes":
                node = subprocess.Popen(["npm install"],
                                        cwd=self._get_absolute_path("games"), shell=True)
                code = node.wait()
                if code == 0:
                    print("Successfully installed Node modules.\n")
                else:
                    print("Failed to install Node modules.\n")
                    launch_allowed = False
            else:
                print(
                    "Game builds will be skipped (expect things to be broken).\n")
                launch_allowed = False

            time.sleep(2)
            if not launch_allowed:
                return

        # Build initial version
        self._build(self._get_game_name())

        # Start threads
        threading.Thread(target=self._build_thread, daemon=True).start()


if __name__ == "__main__":
    svelte_interface = SvelteInterface()
    svelte_interface.start()
    while True:
        time.sleep(1)
