import os
import psycopg2
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
db_match = "data_2026.db"
test_users = ['Areen Panda']

slack_token = os.getenv('SLACK_TOKEN')
client = WebClient(token=slack_token)
conn_global = sql.connect(db_global)
cur_global = conn_global.cursor()
event = cur_global.execute("SELECT value FROM config WHERE key='event'").fetchall()[0][0]

conn_game = sql.connect(db_match)
cur_game = conn_game.cursor()

conn_grafana = psycopg2.connect(database="Grafana-Output",
                        host="5.tcp.ngrok.io",
                        user="postgres",
                        password="MA6328",
                        port="23010")
cur_grafana = conn_grafana.cursor()
slackUid = "#frc_aa"
# slackUid="U025R21C61M"
cur_grafana.execute('SELECT Match,team1,team2,team3 FROM "Schedule"')
print()
team_matches = {}
team_list = cur_grafana.fetchall()
for match in team_list:
    match_number = match[0]
    teams = [str(match[1]), str(match[2]), str(match[3])]
    if "6328" in teams:
        team_matches[match_number] = teams.remove("6328")
while (True):
    teamInfo = cur_game.execute("select Team,Match,UploadTime,BotState,Comment from match where UploadTime > ? and Event = ? and BotState>1", (uploadTime,event,)).fetchall()
    cur_global.execute("SELECT value FROM config WHERE key = 'schedule_match'")
    nextMatch = str(cur_global.fetchall()[0][0])
    for team in teamInfo:
        print(str(team[0]) )
        if str(team[0]) in [k for k, v in team_matches.items() if int(v) > team[1]]:
            print("Sending message for team ", team[0])
            botMsg = botStateMap[team[3]]
            msgText = "Team "+ str(team[0]) + "  Match " + \
            str(team[1]) + " had the following issue - "+botMsg +" - " + team[4]
            print(msgText)
            if team[2] > uploadTime:
                uploadTime=team[2]
            response = client.chat_postMessage(
                channel = slackUid,
                text = msgText
            )
    print("Waiting for 5 minutes")
    time.sleep(300)
    # if len(offBreakScouts) > 0:
    #     result = cur_global.execute(
    #         "update break_schedule set Notified=1 where BreakEnd = ? AND Notified=0", (breakEnd,))
    #     conn_global.commit()
