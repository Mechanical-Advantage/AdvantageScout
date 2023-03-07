import os
from slack_sdk import WebClient
import sqlite3 as sql
import json
from dotenv import load_dotenv

load_dotenv()

slack_token = os.getenv('SLACK_TOKEN')

db_global = "global.db"
test_users = ['UJCC5DAF6', 'UJD1564E9']
client = WebClient(token=slack_token)
conn_global = sql.connect(db_global)
cur_global = conn_global.cursor()
sendBreakSchedule = True
cur_global.execute("SELECT value FROM config WHERE key = 'schedule_match'")
nextMatch = str(cur_global.fetchall()[0][0])
nextMatch = 8
offBreakScouts = []
scouts = []
results = cur_global.execute(
    "select Scout,BreakEnd,BreakStart from break_schedule").fetchall()
scoutBreakInfo = {}
for result in results:
    breakStart = result[2]
    breakEnd = result[1]
    scouts = result[0].strip('][').split(', ')
    slackUid = ""
    for scout in scouts:
        scoutName = scout.strip('"')
        breakList = []
        breakList.append(breakStart)
        breakList.append(breakEnd)
        newList = []
        if scoutName in scoutBreakInfo:
            newList = scoutBreakInfo[scoutName]
            newList.append(breakList)

        else:
            newList.append(breakList)
        scoutBreakInfo[scoutName] = newList


for scout in scoutBreakInfo:
    breaks = scoutBreakInfo[scout]
    try:
        slackUid = cur_global.execute(
            "select userid from Slack_UserIDs where name = ? ", (scout,)).fetchall()[0][0]

    except:
        slackUid = "none"

    print("Sending break schedule to ", scout, " - ", slackUid)
    msgText = "You have the following scheduled breaks \r\n"
    for breakInfo in breaks:

        breakStart = breakInfo[0]
        breakEnd = breakInfo[1]

        msgText = msgText+"Starting on match " + \
            str(breakStart) + " ending on match " + str(breakEnd)+"\r\n"

    print(scout, msgText)
    if (slackUid in test_users):
        print("sending via slack")
        try:
            response = client.chat_postMessage(
                channel=slackUid,
                text=msgText)
        except:
            print("Message to ", scout, " failed")
