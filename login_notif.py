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
    scouts = {}
    for i in range(len(results)):
        scouts[results[i][0]] = results[i][1]
    # print(len(results))
    # print(scouts)
    return (scouts)
def slack_notify(name, message):
    try:
        slackUid = cur_global.execute(
            "select userid from Slack_UserIDs where name = ? ", (name,)).fetchall()[0][0]
    except:
        slackUid = "none"
    print("Sending sign in/out message to  ",name, slackUid)
    response = client.chat_postMessage(
            channel=slackUid,
            text=message
        )
# slack_token = os.getenv('SLACK_TOKEN')
# client = WebClient(token=slack_token)
# while (True):
#     time.sleep(10)
initialScoutList = get_scouts()
print(initialScoutList)
#     #next`Match = 8
#     ScoutsState = {}
#     print(results[0])

while (True):
    time.sleep(10)
    print("sleep over")
    currentScoutList = get_scouts()
    for index in currentScoutList:
        if currentScoutList[index] != initialScoutList[index]:
            if currentScoutList[index] == 1:
                print("Sign in")
            else:
                print("Sign out")
            initialScoutList[index] = currentScoutList[index]
        # for scout in index:
        #     if scout in initialScoutList:
        #         if index["enabled"] == initialScoutList[index["key"].value()]:
        #             print(index["name"], index["enabled"])
        #         else:
        #             print("manthan you're wrong")