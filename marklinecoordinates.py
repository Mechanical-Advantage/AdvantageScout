pickupCoordinates={
    "sz1": [42,199],
    "sz2": [140,115],
    "sz3": [42,30],
    "sz4": [140,30],
    "sz5": [140,199],
    "sz6": [140,260],
    "sz7": [42,246],
    "AutoFloorSpike0NoteCollect":[220,30],
    "AutoFloorSpike1NoteCollect":[220,115],
    "AutoFloorSpike2NoteCollect":[220,184],
    "AutoFloorCenterline0NoteCollect":[320,30],
    "AutoFloorCenterline1NoteCollect":[320,115],
    "AutoFloorCenterline2NoteCollect":[320,184],
    "AutoFloorCenterline3NoteCollect":[320,250],
    "AutoFloorCenterline4NoteCollect":[320,315]
}

markLineCoords=[]

# testData=["sz1","AutoFloorSpike0NoteCollect","AutoFloorCenterline2NoteCollect","AutoFloorCenterline3NoteCollect","AutoFloorSpike2NoteCollect"]
testData=["sz6"]
if (len(testData) ==1):
    testData.append(testData[0])
if (len(testData)!=0):
    for x in range(0, len(testData)-1):
        markLine=[]
        startCoord=pickupCoordinates[testData[x]]
        endCoord=pickupCoordinates[testData[x+1]]
        markLine.append(startCoord)
        markLine.append(endCoord)
        markLineCoords.append(markLine)