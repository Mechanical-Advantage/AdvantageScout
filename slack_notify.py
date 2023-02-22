import os
from slack_sdk import WebClient
import sqlite3 as sql
import json

db_global = "global.db" 
slack_token = "xoxb-613175484016-4825252694418-bV16MtapZ4CAifJrIiW5OLbM"
client = WebClient(token=slack_token)
conn_global = sql.connect(db_global)
cur_global = conn_global.cursor()
sendBreakSchedule = True
cur_global.execute("SELECT value FROM config WHERE key = 'schedule_match'")
nextMatch = str(cur_global.fetchall()[0][0])
nextMatch=8
offBreakScouts = []
try:
    results = cur_global.execute("select Scout,BreakEnd from break_schedule where BreakEnd - ? = 2 AND Notified=0", (nextMatch,)).fetchall()[0]
    print(results)
    offBreakScouts=json.loads(results[0])
    breakEnd=results[1]
except:
    offBreakScouts=[]
breakStart=0
for scoutOnBreak in offBreakScouts:
    slackUid=""
    try:
        slackUid=cur_global.execute("select userid from Slack_UserIDs where name = ? ", (scoutOnBreak,)).fetchall()[0][0]
    
    except:
        slackUid="none"
        print("Sending end of break message to ",scoutOnBreak,slackUid)
        msgText="You have a break is ending in 2 matches. Please return to the stands " 
    # response = client.chat_postEphemeral(
    #     channel="CHY2B720Z",
    #     text="Hello from my Linux VM via Python",
    #     user="UJD1564E9"
    # )
if len(offBreakScouts)>0:
    result = cur_global.execute("update break_schedule set Notified=1 where BreakEnd = ? AND Notified=0",(breakEnd,))
    conn_global.commit()
