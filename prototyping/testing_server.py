import cherrypy
import hashlib
import json
import os
import sys

#Config
default_port = 8000 # can override w/ command line argument
host = "0.0.0.0"
canvas_manager_path = "CanvasManager.js"

class testing_server(object):
    @cherrypy.expose
    def index(self):
        return("""
<html><head>
<title>Testing - Advantage Scout</title>
<link rel="stylesheet" type="text/css" href="/static/css/index.css"></link>
<script src="/static/js/ButtonManager.js"></script>
<script src="/static/js/js-sha1.js"></script>
</head><body>

<canvas class="outer-canvas" width="3450" height="1840"></canvas>
<canvas class="inner-canvas" width="3000" height="1600"></canvas>

<script src="/static/js/index.js"></script>
</body></html>
            """)

    @cherrypy.expose
    def get_update(self, client_hash=""):
        canvas_manager = open(canvas_manager_path, "r").read()
        server_hash = hashlib.sha1(canvas_manager.encode("utf-8")).hexdigest()
        if server_hash == client_hash:
            return(json.dumps({"reload": False, "data": ""}))
        else:
            return(json.dumps({"reload": True, "data": canvas_manager}))

if __name__ == "__main__":
    port = default_port
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    cherrypy.config.update({'server.socket_port': port, 'server.socket_host': host})
    cherrypy.quickstart(testing_server(), "/", {"/static": {"tools.staticdir.on": True, "tools.staticdir.dir": os.getcwd() + "/static"}})
