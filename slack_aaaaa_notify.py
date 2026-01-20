import os
from slack_sdk import WebClient
import sqlite3 as sql
import json
import os
from dotenv import load_dotenv
import time
import argparse
uploadTime=0
parser = argparse.ArgumentParser()
parser.add_argument("-u", '--uploadTime',default=0,type=int, help="Input upload time if program is restarted")
args = parser.parse_args()
uploadTime = args.uploadTime
print(uploadTime)
load_dotenv()
slack_token = os.getenv('SLACK_TOKEN')
botStateMap={
    2: "Comms issue",
    3: "Power issues",
    4: "Major malfunction",
    5: "Fell over",
    6: "Did not show",
}

db_global = "global.db"
db_match = "data_2025.db"
test_users = ['Areen Panda']

slack_token = os.getenv('SLACK_TOKEN')
client = WebClient(token=slack_token)
conn_global = sql.connect(db_global)
cur_global = conn_global.cursor()
event = cur_global.execute("SELECT value FROM config WHERE key='event'").fetchall()[0][0]
conn_game = sql.connect(db_match)
cur_game = conn_game.cursor()
current_blueteam = cur_global.execute("SELECT b1,b2,b3 FROM schedule WHERE b1=6328 or b2=6328 or b3=6328").fetchall()
current_redteam = cur_global.execute("SELECT r1,r2,r3 FROM schedule WHERE r1=6328 or r2=6328 or r3=6328").fetchall()
alliance_teams = []
for team in current_blueteam:
    print(list(team))
    alliance_teams.append(list(team)[0])
    alliance_teams.append(list(team)[1])
    alliance_teams.append(list(team)[2])
for team in current_redteam:
    print(list(team))
    alliance_teams.append(list(team)[0])
    alliance_teams.append(list(team)[1])
    alliance_teams.append(list(team)[2])
# print(current_blueteam)
# print(current_redteam)
# print(alliance_teams)
print(4925 in alliance_teams)
conn_global.close()


slackUid = "#frc_aa"
slackUid2 = "#frc_aaa"
# slackUid="U025R21C61M"
while (True):
    print("Waiting for 5 minutes")
    time.sleep(300)
    teamInfo=cur_game.execute("select Team,Match,UploadTime,BotState,Comment from match where UploadTime > ? and Event = ? and BotState>1", (uploadTime,event,)).fetchall()
    for team in teamInfo:
        print("Sending message for team ", team[0])
        botMsg=botStateMap[team[3]]
        msgText ="Team "+ str(team[0]) + "  Match " + \
        str(team[1]) + " had the following issue - "+botMsg +" - " + team[4]
        print(msgText)
        if team[2]>uploadTime:
            if team[0] in alliance_teams:
                response = client.chat_postMessage(
            channel=slackUid,
            text=msgText
            )
            response = client.chat_postMessage(
            channel=slackUid2,
            text=msgText
            )
        if team[2]>uploadTime:
            print(team[2])
            uploadTime=team[2]



    # if len(offBreakScouts) > 0:
    #     result = cur_global.execute(
    #         "update break_schedule set Notified=1 where BreakEnd = ? AND Notified=0", (breakEnd,))
    #     conn_global.commit()
