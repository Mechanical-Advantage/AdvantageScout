import csv
import tbapy

# Initialize TBA API with your API key
tba = tbapy.TBA('xwLB4UY3L9BUHcEbzB0phRviy7qtRnRFI0D2cdemxweyyQBIMqTJaHwEA4H8xO3Y')

# Fetch match data
matchInfo = tba.event_matches('2025week0')
main_list = []
target_word = "true"

# Loop through each match
for match in matchInfo:
    if match["comp_level"] == "qm":
        blueMatch_data = [
            match["match_number"],
            match["alliances"]["blue"]["team_keys"],
            0,
            match["alliances"]["blue"]["score"],
            match["score_breakdown"]["blue"]["autoMobilityPoints"],
            match["score_breakdown"]["blue"]["autoPoints"],
            match["score_breakdown"]["blue"]["endGameBargePoints"],
            match["score_breakdown"]["blue"]["teleopCoralCount"],
            match["score_breakdown"]["blue"]["netAlgaeCount"],
            match["score_breakdown"]["blue"]["autoReef"]["trough"],
            match["score_breakdown"]["blue"]["teleopReef"]["trough"],

        ]
        data = match["score_breakdown"]["blue"]["autoReef"]["botRow"]
        count = sum(value is True for value in data.values())
        blueMatch_data.append(count)
       
        data = match["score_breakdown"]["blue"]["autoReef"]["midRow"]
        count = sum(value is True for value in data.values())
        blueMatch_data.append(count)

        data = match["score_breakdown"]["blue"]["autoReef"]["topRow"]
        count = sum(value is True for value in data.values())
        blueMatch_data.append(count)

        data = match["score_breakdown"]["blue"]["teleopReef"]["botRow"]
        count = sum(value is True for value in data.values())
        blueMatch_data.append(count)
       
        data = match["score_breakdown"]["blue"]["teleopReef"]["midRow"]
        count = sum(value is True for value in data.values())
        blueMatch_data.append(count)

        data = match["score_breakdown"]["blue"]["teleopReef"]["topRow"]
        count = sum(value is True for value in data.values())
        blueMatch_data.append(count)

        main_list.append(blueMatch_data)


        redMatch_data = [
            match["match_number"],
            match["alliances"]["red"]["team_keys"],
            1,
            match["alliances"]["red"]["score"],
            match["score_breakdown"]["red"]["autoMobilityPoints"],
            match["score_breakdown"]["red"]["autoPoints"],
            match["score_breakdown"]["red"]["endGameBargePoints"],
            match["score_breakdown"]["red"]["teleopCoralCount"],
            match["score_breakdown"]["red"]["netAlgaeCount"],
            match["score_breakdown"]["red"]["autoReef"]["trough"],
            match["score_breakdown"]["red"]["teleopReef"]["trough"],
        ]
        
        data = match["score_breakdown"]["red"]["autoReef"]["botRow"]
        count = sum(value is True for value in data.values())
        redMatch_data.append(count)
       
        data = match["score_breakdown"]["red"]["autoReef"]["midRow"]
        count = sum(value is True for value in data.values())
        redMatch_data.append(count)

        data = match["score_breakdown"]["red"]["autoReef"]["topRow"]
        count = sum(value is True for value in data.values())
        redMatch_data.append(count)

        data = match["score_breakdown"]["red"]["teleopReef"]["botRow"]
        count = sum(value is True for value in data.values())
        redMatch_data.append(count)
       
        data = match["score_breakdown"]["red"]["teleopReef"]["midRow"]
        count = sum(value is True for value in data.values())
        redMatch_data.append(count)

        data = match["score_breakdown"]["red"]["teleopReef"]["topRow"]
        count = sum(value is True for value in data.values())
        redMatch_data.append(count)
        
        main_list.append(redMatch_data)
       



# CSV Header Row
headers = [
    "Match Number", "Teams", "Alliance Color", "Score", "Mobility", "Auto", "Endgame","Teleop Coral Count", "Net Algae Count", "autol1", "telel1", "autol2","autol3","autol4", "telel2","telel3","telel4",
]

# Write data to CSV file
with open("match_data.csv", mode="w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(headers)  # Write header row
    writer.writerows(main_list)  # Write all match data rows

print("CSV file 'match_data.csv' has been successfully created!")

