import os
from slack_sdk import WebClient
import sqlite3 as sql
import json
import os
from dotenv import load_dotenv
import time
load_dotenv()

db_global = "global.db"
test_users = ['Keith White', 'Ayush Kulkarni', 'Manthan Acharya', 'Areen Panda']

slack_token = os.getenv('SLACK_TOKEN')
client = WebClient(token=slack_token)
conn_global = sql.connect(db_global)
cur_global = conn_global.cursor()
sendBreakSchedule = True
def Break_Notify():
    time.sleep(10)
    cur_global.execute("SELECT value FROM config WHERE key = 'schedule_match'")
    nextMatch = str(cur_global.fetchall()[0][0])
    #nextMatch = 8
    print("Next match is ", nextMatch)
    offBreakScouts = []
    try:
        results = cur_global.execute(
            "select Scout,BreakEnd from break_schedule where BreakEnd - ? = 2 AND Notified=0", (nextMatch,)).fetchall()[0]
        print(results)
        offBreakScouts = json.loads(results[0])
        breakEnd = results[1]
    except:
        offBreakScouts = []
    breakStart = 0
    for scoutOnBreak in offBreakScouts:
        slackUid = ""

        try:
            slackUid = cur_global.execute(
                "select userid from Slack_UserIDs where name = ? ", (scoutOnBreak,)).fetchall()[0][0]

        except:
            slackUid = "none"
        print("Sending end of break message to ", scoutOnBreak, slackUid)
        msgText = "Match " + \
            str(nextMatch) + " is next. You have a break is ending in 2 matches. Please return to the stands "
        response = client.chat_postMessage(
            channel=slackUid,
            text=msgText
        )
    if len(offBreakScouts) > 0:
        result = cur_global.execute(
            "update break_schedule set Notified=1 where BreakEnd = ? AND Notified=0", (breakEnd,))
        conn_global.commit()
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
def Login_Notify():
    time.sleep(10)
    print("sleep over")
    currentScoutList = get_scouts()
    for index in currentScoutList:
        if index in test_users:
            if currentScoutList[index] != initialScoutList[index]:
                if currentScoutList[index] == 1:
                    slack_notify(index, "You are Signed In.")
                    print("Sign in")
                else:
                    slack_notify(index, "You are Signed Out")
                    print("Sign out")
            initialScoutList[index] = currentScoutList[index]
initialScoutList = get_scouts()
while (True):
    Login_Notify()