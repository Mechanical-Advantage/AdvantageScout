import csv
import sqlite3 as sql
from fpdf import FPDF
pdf = FPDF()
conn1 = sql.connect("global.db")
cur1 = conn1.cursor()
cur1.execute("SELECT value FROM config WHERE key = 'event'")
Event = cur1.fetchall()[0][0]
print(Event)
conn = sql.connect(
    "C:\\mascout\\AdvantageScout\\data_2023.db")
cur = conn.cursor()
# event_name
cur.execute("SELECT * FROM pit WHERE Event = ? order by Team", (Event,))
Pitscout = cur.fetchall()

# THE LOOKUP
# if row[column] == 1:
#     lists[name_lookup[column]["section"]].append(name_lookup[column]["value"])
#
# THE JOIN
# ", ".join(lists[list_name])

# name_lookup = {
#     11: {
#         "section": "auto",
#         "value": "can move from initiation line"
#     },
#     13: {
#         "section": "auto",
#         "value": "can deliver upper"
#     },
#     14: {
#         "section": "auto",
#         "value": "can deliver lower"
#     },
#     15: {
#         "section": "shoot_to",
#         "value": "upper goal"
#     },
#     16: {
#         "section": "shoot_to",
#         "value": "lower goal"
#     },
#     17: {
#         "section": "wheel",
#         "value": "can do rotation control"
#     },
#     18: {
#         "section": "wheel",
#         "value": "can do position control"
#     },
#     21: {
#         "section": "shoot_from",
#         "value": "wall"
#     },
#     22: {
#         "section": "shoot_from",
#         "value": "opponent side"
#     },
#     23: {
#         "section": "shoot_from",
#         "value": "own side"
#     }
# }
# lists = {
#     "auto": [],
#     "shoot_to": [],
#     "shoot_from": [],
#     "wheel": []
# }
# THE LOOKUP
# if row[column] == 1:
#     lists[name_lookup[column]["section"]].append(name_lookup[column]["value"])
#
# THE JOIN
# ", ".join(lists[list_name])

for row in Pitscout:
    #     lists = {
    #         "auto": [],
    #         "shoot_to": [],
    #         "shoot_from": [],
    #         "wheel": []
    #     }
    #     for column in name_lookup.keys():
    #         if row[column] == 1:
    #             lists[name_lookup[column]["section"]].append(
    #                 name_lookup[column]["value"])
    #     if row[20] == 0:
    #         canliftoutput = "No"
    #     else:
    #         canliftoutput = "Yes"

    pdf.add_page()
    pdf.set_font('Arial', 'B', 30)
    pdf.cell(40, 10, 'Team ' + str(row[1]), ln=1)
    pdf.set_font('Arial', '', 14)
    pdf.cell(40, 10, 'Drive Train: ' + row[7], ln=1)
    pdf.cell(40, 10, 'Length: ' + str(row[9]))
    pdf.cell(40, 10, 'Width: ' + str(row[8]), ln=1)
    pdf.cell(40, 10, 'Multiple Drive Teams?: ' + str(row[10]), ln=1)
    pdf.cell(40, 10, 'Programming Language: ' + str(row[14]), ln=1)
    pdf.cell(40, 10, 'Gyro?: ' + str(row[16]), ln=1)
    pdf.cell(40, 10, 'Build Quality: ' + str(row[13]))
    pdf.cell(40, 10, 'Bumper Quality: ' + str(row[15]), ln=1)
    pdf.cell(40, 10, 'Comment: ' + str(row[11]), ln=1)
    pdf.cell(40, 10, str(row[12]), ln=1)
    if len(row[12]) >= 1:
        pdf.image("path on scouting laptop" + row[12], 10, 120, 125)
    # pdf.cell(40, 10, 'Top Speed: ' + str(row[8]), ln=1)
    # pdf.cell(40, 10, 'Weight: ' + str(row[9]))
    # pdf.cell(40, 10, 'Height: ' + str(row[10]), ln=1)
    # pdf.cell(40, 10, 'Max Reach: ' + str(row[17]))
    # pdf.cell(50, 10, 'Can Lift Others: ' + canliftoutput)
    # pdf.cell(40, 10, 'Multiple Drive Teams: ' + row[24], ln=1)
    # pdf.cell(40, 10, 'Auto Comment: ' + row[12], ln=1)
    # pdf.cell(40, 10, 'Auto Capabilities: ' + ", ".join(lists["auto"]),  ln=1)
    # pdf.cell(40, 10, 'Shooting Capabilities: ' +
    #          ", ".join(lists["shoot_to"]),  ln=1)
    # pdf.cell(40, 10, 'Shooting Positions: ' +
    #          ", ".join(lists["shoot_from"]),  ln=1)
    # pdf.cell(40, 10, 'Wheel Capabilities: ' + ", ".join(lists["wheel"]),  ln=1)
    # pdf.cell(40, 10, 'Comments: ' + str(row[25]), ln=1)

    # if len(row[26]) >= 1:
    #     pdf.image("c:\mascout\\AdvantageScout\\" + row[26], 10, 120, 125)

pdf.output('pitscout.pdf', 'F')
conn.close()
conn1.close()
