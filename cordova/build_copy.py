# Copies shared codebase from web source to cordova source before build

import os
import shutil

try:
    shutil.rmtree(os.path.join("www", "src"))
except FileNotFoundError:
    pass
shutil.copytree(os.path.join("..", "src", "app"), os.path.join("www", "src"))
