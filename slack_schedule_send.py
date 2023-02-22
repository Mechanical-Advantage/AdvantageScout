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
scouts=[]
results = cur_global.execute("select Scout,BreakEnd,BreakStart from break_schedule").fetchall()

for result in results:
    breakStart=result[2]
    breakEnd=result[1]
    scouts=results[0][0].strip('][').split(', ')
    slackUid=""
    for scout in scouts:
        scoutname=scout.strip('"')
        try:
            slackUid=cur_global.execute("select userid from Slack_UserIDs where name = ? ", (scoutname,)).fetchall()[0][0]
        
        except:
            slackUid="none"

        print("Sending break schedule to ",scoutname,slackUid,breakStart,breakEnd)
        msgText="You have a break starting on match " + str(breakStart) + " ending on match " + str(breakEnd)

    # response = client.chat_postEphemeral(
            #     channel="CHY2B720Z",
            #     text="Hello from my Linux VM via Python",
            #     user="UJD1564E9"
            # )


