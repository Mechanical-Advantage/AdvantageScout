import base64
import binascii
import os
from PIL import Image
import io
import psycopg2
import sqlite3 as sql
import argparse
parser = argparse.ArgumentParser()
db_global = "global.db"
db_games = "d:\\data_2025SuperScout.db"
conn_global = sql.connect(db_global)
cur_global = conn_global.cursor()
event = cur_global.execute("SELECT value FROM config WHERE key='event'").fetchall()[0][0]
cur_global.execute("SELECT value FROM config WHERE key = 'game'")
game = str(cur_global.fetchall()[0][0])
#db_games = "data_"+game+".db"
conn_games = sql.connect(db_games)
cur_games = conn_games.cursor()
print(db_games)
print(game)
match_data = cur_games.execute("SELECT * FROM match WHERE event = ?", (event,)).fetchall()
conn_global.close()
# conn_game = sql.connect(db_games.replace("$GAME", game))
# cur_game = conn_game.cursor()
# TeamImage = cur_game.execute("SELECT Team, Image FROM pit WHERE Event=?", (event,)).fetchall()
conn_grafana = psycopg2.connect(database="Grafana-Output",
                        host="5.tcp.ngrok.io",
                        user="postgres",
                        password="MA6328",
                        port="23010")
cur_grafana = conn_grafana.cursor()
sql_text = 'DELETE FROM "SupesTable" WHERE "Event"=%s;'
sql_data = (event,)
cur_grafana.execute(sql_text, sql_data)
conn_grafana.commit()      
for match in match_data:
    #print(match)
    sql_text = 'INSERT INTO "SupesTable" ("Event", "Team", "Match", "DeviceName", "Version", "InterfaceType", "Time", "UploadTime", "ScoutName", "AllianceColor", "ReversedAlliance", "StartPosition", "StartGamePiece", "StartConfig", "Comment", "AutoComment", "TeleComment", "EndgameComment", "DisabledComment", "BotState", "AutoBotState", "TeleBotState", "EndgameBotState", "AutoSynergyRating", "TeleSynergyRating", "DefenseRating", "TeamRating1", "TeamRating2", "TeamRating3", "PlayingDefenseDuration", "UnderDefenseDuration", "DNP", "DNPComment", "DriverTeam", "DriverSkill", "DriverSpeed", "DefenseOnly", "Team1", "Team2", "Team3", "Team1Comment", "Team2Comment", "Team3Comment") VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'    
    sql_data = (match[0],match[1],match[2],match[3],match[4],match[5],match[6],match[7],match[8],match[9],match[10],match[11],match[12],match[13],match[14],match[15],match[16],match[17],match[18],match[19],match[20],match[21],match[22],match[23],match[24],match[25],match[26],match[27],match[28],match[29],match[30],match[31],match[32],match[33],match[34],match[35],match[36],match[37],match[38],match[39],match[40],match[41],match[42])
    cur_grafana.execute(sql_text, sql_data)
    conn_grafana.commit()