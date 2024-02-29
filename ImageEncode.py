import base64
import binascii
import os
from PIL import Image
import io
import psycopg2
import sqlite3 as sql
db_global = "global.db"
db_games = "data_$GAME.db"
conn_global = sql.connect(db_global)
cur_global = conn_global.cursor()
event = cur_global.execute("SELECT value FROM config WHERE key='event'").fetchall()[0][0]
cur_global.execute("SELECT value FROM config WHERE key = 'game'")
game = str(cur_global.fetchall()[0][0])
conn_global.close()
conn_game = sql.connect(db_games.replace("$GAME", game))
cur_game = conn_game.cursor()
TeamImage = cur_game.execute("SELECT Team, Image FROM pit WHERE Event=?", (event,)).fetchall()
conn_grafana = psycopg2.connect(database="Grafana-Output",
                        host="127.0.0.1",
                        user="postgres",
                        password="MA6328",
                        port="5432")
cur_grafana = conn_grafana.cursor()
print(event)
# cur_grafana.execute("DELETE FROM Images WHERE Event=?", (event,))
sql_text = 'DELETE FROM "Images" WHERE "Event"=%s;'
sql_data = (event,)
cur_grafana.execute(sql_text, sql_data)
conn_grafana.commit()
for row in TeamImage:
    print(row[0])
    img_name = row[1]
    if os.path.isfile(img_name):
        with open(img_name, "rb") as image_file:
            data = base64.b64encode(image_file.read()).decode('utf-8')
            sql_text = ' INSERT INTO "Images" ("Event", "Team", "Image") VALUES (%s,%s,%s)'
            sql_data = (event, row[0], data,)
            # cur_grafana.execute("INSERT INTO Images (Event, Team, Image) VALUES (?, ?, ?)",
            #                     (event, row[0], data))
            cur_grafana.execute(sql_text, sql_data)
            conn_grafana.commit()


# with open("images/img_00000.jpg", "rb") as image_file:
#     data = base64.b64encode(image_file.read()).decode('utf-8')
#     print(data)
# f = open("encoded.txt", "a")
# f.write(data)
# f.close
