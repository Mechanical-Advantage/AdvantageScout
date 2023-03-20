import os
from slack_sdk import WebClient
import sqlite3 as sql
import json
import os
# from dotenv import load_dotenv
import time
# load_dotenv()

db_global = "global.db"
conn_global = sql.connect(db_global)
cur_global = conn_global.cursor()
test_users = ['Keith White', 'Ayush Kulkarni']
def get_scouts():
    cur_global.execute("SELECT * FROM scouts ORDER BY name")
    results = cur_global.fetchall()
    scouts = []
    for i in range(len(results)):
        scouts.append({"name": results[i][0], "enabled": results[i][1] == 1})
    print(len(results))
    print(scouts)
    return (json.dumps(scouts))
# slack_token = os.getenv('SLACK_TOKEN')
# client = WebClient(token=slack_token)
# while (True):
#     time.sleep(10)
InitialScoutList = get_scouts()
#     #nextMatch = 8
#     ScoutsState = {}
#     print(results[0])
while (True):
    time.sleep(10)
