import csv
import tbapy

# Initialize TBA API with your API key
tba = tbapy.TBA('xwLB4UY3L9BUHcEbzB0phRviy7qtRnRFI0D2cdemxweyyQBIMqTJaHwEA4H8xO3Y')

# Fetch match data
teamInfo = tba.event_teams('2025new')
main_list = []
target_word = "true"
event="2025new"
tempData=[]
# Loop through each match
for team in teamInfo:
    teamNumber=team["key"].lstrip("frc")
    print(teamNumber)
    tempData.append(event) 
    tempData.append(teamNumber)   
    main_list.append(tempData)
    tempData=[]



# CSV Header Row
headers = ["Event", "Team"]

# Write data to CSV file
with open("teams.csv", mode="w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(headers)  # Write header row
    writer.writerows(main_list)  # Write all match data rows

print("CSV file 'teams.csv' has been successfully created!")

