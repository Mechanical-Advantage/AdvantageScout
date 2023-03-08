import csv
import sqlite3 as sql
import shutil
conn1 = sql.connect("global.db")
cur1 = conn1.cursor()
cur1.execute("SELECT value FROM config WHERE key = 'event'")
Event = cur1.fetchall()[0][0]
print(Event)
conn = sql.connect(
    "C:\\mascout\\AdvantageScout\\data_2023.db")
cur = conn.cursor()
# event_name
cur.execute("SELECT Team,Image FROM pit WHERE Event = ? order by Team", (Event,))
Pitscout = cur.fetchall()
for row in Pitscout:
    if (row[1] != ''):
        newFileName = str(row[0]) + "_" + Event
        shutil.copy(row[1], 'Images\\' + Event + '\\' + newFileName)
conn.close()
conn1.close()
