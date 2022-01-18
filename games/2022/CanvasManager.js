// canvas object in variable 'canvas'
// alliances reversed in variable 'reverseAlliances' -> no reverse = red on right
// call uploadData() to trigger upload (required if using visual for endgame)
// width = 3000px, height = 1600px
var mode = 0 // 0 = auto, 1 = teleop, 2 = endgame
this.setMode = function (newMode) { // REQUIRED FUNCTION
    if ((mode == 0 && newMode == 1) || (mode == 1 && newMode == 0)) {
        dataLog = []
    }
    mode = newMode
    render()
}

// Color definitions and stuff
var leftColor = (reverseAlliances) ? "#ff0000" : "#0000de"
var rightColor = (reverseAlliances) ? "#0000de" : "#ff0000"
var leftHighlightColor = (reverseAlliances) ? "#ff7575" : "#6666ff"
var rightHighlightColor = (reverseAlliances) ? "#6666ff" : "#ff7575"
var outline = "#000000"
var fieldBackground = "#d1d1d1"
var text = "#000000"
var textWhite = "#ffffff"
var success = "#00d936"
var failure = "#b30000"
var climbText = ["L", "M", "H", "T"]
const black = "#000000"
const mediumGray = "#D1D1D1"
const darkGray = "#A9A9A9"
const lightGray = "#D3D3D3"
const deflectorsBottomRight = [1548, 1051, 1563, 988, 1521, 898, 1557, 882, 1597, 974, 1653, 1004, 1548, 1051];
const defelectorsBottomLeft = [1249, 848, 1312, 863, 1402, 821, 1418, 857, 1326, 897, 1296, 953, 1249, 848];
const deflectorsTopLeft = [1452, 549, 1437, 612, 1479, 702, 1434, 718, 1403, 626, 1347, 596, 1452, 549];
const deflectorsTopRight = [1751, 752, 1688, 737, 1598, 779, 1582, 743, 1674, 703, 1704, 647, 1751, 752]
const bottomLeftTarmac = [1530, 950, 1640, 1200, 1345, 1200, 1130, 1000, 1370, 890, 1530, 950]
const topLeftTarmac = [1350, 830, 1100, 940, 1100, 645, 1300, 430, 1410, 670, 1350, 830]
const topRightTarmac = [1470, 650, 1360, 400, 1655, 400, 1870, 600, 1630, 710, 1470, 650]
const bottomRightTarmac = [1650, 770, 1900, 660, 1900, 955, 1700, 1170, 1590, 935, 1650, 770]



this.getData = function () { // REQUIRED FUNCTION
    toSend = jsonCopy(data)
    if (!("AllianceColor" in data)) {
        toSend["AllianceColor"] = 0
    } else if (reverseAlliances) {
        toSend["AllianceColor"] = 1 - toSend["AllianceColor"]
    }
    toSend["UpperSecondsBetween"] = toSend["UpperSecondsBetween"].join()
    delete toSend["LastUpperButton"]
    return toSend
}

function jsonCopy(original) {
    return JSON.parse(JSON.stringify(original))
}

var context = canvas.getContext("2d")
var buttonManager = new ButtonManager(canvas)
const secondsBetweenThreshold = 15 // # of secs needed to reset scoring timer
var data = {
    "Taxi": 0,
    "StartPosition": "",
    "AutoUpperSuccess": 0,
    "AutoLowerSuccess": 0,
    "AutoUpperFailures": 0,
    "AutoLowerFailures": 0,
    "TeleUpperSuccess": 0,
    "TeleLowerSuccess": 0,
    "TeleUpperFailures": 0,
    "TeleLowerFailures": 0,
    "ScoringData": [],
    "ClimbLow": [],
    "ClimbMid": [],
    "ClimbHigh": [],
    "ClimbTraversal": [],
    "climbCounter": [0, 0, 0, 0]
}
data["AllianceColor"] = 0
var controlRotationSelected = true
var dataLog = []

function addToDataLog() {
    dataLog.push(jsonCopy(data))
}

function recordTime() {
    var time = new Date().getTime() / 1000
    var diff = time - data["LastUpperButton"]
    if (diff < secondsBetweenThreshold) {
        data["UpperSecondsBetween"].push(diff.toFixed(3))
    }
    data["LastUpperButton"] = time
}

function drawObjects(coordinates, fillColor, strokeColor) {
    context.beginPath()
    context.fillStyle = fillColor
    context.strokeStyle = strokeColor
    context.moveTo(coordinates[0], coordinates[1])
    for (i = 2; i < coordinates.length; i += 2) {
        context.lineTo(coordinates[i], coordinates[i + 1])
    }
    context.closePath()
    context.fill()
    context.stroke()
}

// Set ponytails
const ponytails = [Math.random() > 0.5, Math.random() > 0.5, Math.random() > 0.5, Math.random() > 0.5, Math.random() > 0.5, Math.random() > 0.5]
//draw people
function drawFigure(x, y, color, ponytails, armDirection) {
    context.lineWidth = 8
    context.strokeStyle = color
    context.beginPath()
    context.arc(x, y - 75, 25, 0, 2 * Math.PI)

    // Arms
    if (armDirection == 1) {
        context.moveTo(x + 25, y + 25)
        context.lineTo(x, y - 25)
        context.lineTo(x - 25, y + 25)
    } else if (armDirection == 0) {
        context.moveTo(x - 55, y - 25)
        context.lineTo(x, y - 25)
        context.moveTo(x, y - 25)
        context.lineTo(x - 50, y - 5)
    } else if (armDirection == 2) {
        context.moveTo(x + 55, y - 25)
        context.lineTo(x, y - 25)
        context.moveTo(x, y - 25)
        context.lineTo(x + 50, y - 5)
    }

    // Legs
    context.moveTo(x + 25, y + 100)
    context.lineTo(x, y + 50)
    context.lineTo(x - 25, y + 100)

    // Body
    context.moveTo(x, y + 50)
    context.lineTo(x, y - 50)

    // Ponytails
    if (ponytails) {
        context.moveTo(x + 25, y - 75)
        context.arc(x + 50, y - 75, 25, Math.PI, 0.6 * Math.PI, true)
        context.moveTo(x - 25, y - 75)
        context.arc(x - 50, y - 75, 25, 0, 0.4 * Math.PI)
    }
    context.stroke()
}

function render() {
    context.clearRect(0, 0, 3000, 1600)

    function setFieldPath() {
        //outerbox
        context.beginPath()
        context.moveTo(300, 200)
        context.lineTo(2500, 200)
        context.lineTo(2700, 400)
        context.lineTo(2700, 1400)
        context.lineTo(500, 1400)
        context.lineTo(300, 1200)
        context.lineTo(300, 200)
        context.lineWidth = 10
        context.fillStyle = "#D1D1D1"
        context.strokeStyle = black
        context.stroke()
    }
    setFieldPath()
    context.fill()

    //center line
    context.beginPath()
    context.moveTo(1235, 200)
    context.lineTo(1765, 1400)
    context.stroke()


    drawObjects(bottomLeftTarmac, leftColor, black)
    drawObjects(bottomRightTarmac, rightColor, black)
    drawObjects(topLeftTarmac, leftColor, black)
    drawObjects(topRightTarmac, rightColor, black)


    // left hanger
    context.fillStyle = leftColor
    context.lineStyle = leftColor
    context.rect(300, 200, 460, 424)

    //context.strokeStyle = "gray"
    context.stroke()
    context.beginPath()
    context.lineStyle = leftColor
    context.moveTo(442, 200)
    context.lineTo(442, 624)
    context.moveTo(532, 200)
    context.lineTo(532, 624)
    context.moveTo(622, 200)
    context.lineTo(622, 624)
    context.moveTo(760, 200)
    context.lineTo(760, 624)
    context.strokeStyle = leftColor
    context.lineWidth = 10
    context.stroke()

    // right hanger
    context.beginPath()
    context.fillStyle = rightColor
    context.lineStyle = rightColor
    context.rect(2210, 976, 490, 424)
    context.strokeStyle = black
    context.stroke()
    context.beginPath()
    context.lineStyle = rightColor
    context.moveTo(2558, 976)
    context.lineTo(2558, 1400)
    context.moveTo(2468, 976)
    context.lineTo(2468, 1400)
    context.moveTo(2378, 976)
    context.lineTo(2378, 1400)
    context.moveTo(2210, 976)
    context.lineTo(2210, 1400)
    context.strokeStyle = rightColor
    context.stroke()



    //center hub square
    context.beginPath()
    context.strokeStyle = black
    context.fillStyle = lightGray
    context.translate(1427, 641)
    context.rotate(21 * Math.PI / 180)
    context.fillRect(0, 0, 250, 250)
    context.strokeRect(0, 0, 250, 250)
    context.rotate(-21 * Math.PI / 180)
    context.translate(-1427, -641)
    context.stroke()

    drawObjects(defelectorsBottomLeft, darkGray, black)
    drawObjects(deflectorsBottomRight, darkGray, black)
    drawObjects(deflectorsTopLeft, darkGray, black)
    drawObjects(deflectorsTopRight, darkGray, black)

    // hub circle
    context.fillStyle = darkGray
    context.beginPath()
    context.arc(1500, 800, 105, 0, 2 * Math.PI)
    context.closePath()
    context.fill()
    context.stroke()

    // climb boxes
    if ((mode == 1) && ("AllianceColor" in data)) {
        context.fillRect((data["AllianceColor"] == 0) ? 0 : 2750, 0, 250, 250)
        context.fillRect((data["AllianceColor"] == 0) ? 0 : 2750, 450, 250, 250)
        context.fillRect((data["AllianceColor"] == 0) ? 0 : 2750, 900, 250, 250)
        context.fillRect((data["AllianceColor"] == 0) ? 0 : 2750, 1350, 250, 250)
        context.stroke()

        context.textAlign = "center"
        context.textBaseline = "middle"
        context.fillStyle = text
        context.strokeStyle = black
        context.font = "150px sans-serif"
        for (i = 0; i < 4; i++) {
            context.fillText(climbText[i], (data["AllianceColor"] == 0) ? 125 : 2875, 125 + i * 450)

        }

        context.stroke()
    }

    // Draw starting positions
    if (mode == 0) {

        // Highlight
        if ("StartPos" in data) {
            context.fillStyle = (data["AllianceColor"] == 0) ? rightHighlightColor : leftHighlightColor
            if (data["AllianceColor"] == 0) {
                context.fillRect(675, 1000 - data["StartPos"] * 400, 150, 400)
            } else {
                context.fillRect(2175, 200 + data["StartPos"] * 400, 150, 400)
            }
        }

    }

    // Draw moved from line symbols
    if ((mode == 0) && "AllianceColor" in data) {
        centerX = (data["AllianceColor"] == 0) ? 750 : 2250

        context.beginPath()
        context.fillStyle = outline
        context.arc(centerX, 100, 25, 0, 2 * Math.PI)
        context.fill()

        if (data["Taxi"] == 1) {
            context.beginPath()
            context.moveTo(centerX - 105, 100)
            context.lineTo(centerX + 105, 100)
            context.moveTo(centerX - 55, 50)
            context.lineTo(centerX - 105, 100)
            context.lineTo(centerX - 55, 150)
            context.moveTo(centerX + 55, 50)
            context.lineTo(centerX + 105, 100)
            context.lineTo(centerX + 55, 150)
            context.stroke()
        }
    }

    // Draw scoring area
    if ("AllianceColor" in data) {
        leftX = (data["AllianceColor"] == 0) ? 25 : 2575
        context.fillStyle = success

        // Write numbers
        context.textAlign = "center"
        context.textBaseline = "middle"
        context.font = "130px sans-serif"
        context.fillStyle = text
    }

    // Undo button
    if (dataLog.length > 0) {
        context.fillStyle = "#e3e3e3"
        context.fillRect(1750, 1450, 250, 150)

        context.textBaseline = "middle"
        context.textAlign = "center"
        context.font = "70px sans-serif"
        context.fillStyle = "#000000"
        context.fillText("Undo", 1875, 1525)
    }

    // Stick figures
    // if (("AllianceColor" in data) ? data["AllianceColor"] == 0 : true) {
    //     drawFigure((mode == 0) ? 50 : 200, 325, leftColor, ponytails[0], (mode == 0) ? 1 : 2)
    //     drawFigure((mode == 0) ? 50 : 200, 800, leftColor, ponytails[1], (mode == 0) ? 1 : 2)
    //     drawFigure((mode == 0) ? 50 : 200, 1275, leftColor, ponytails[2], (mode == 0) ? 1 : 2)
    // }
    // if (("AllianceColor" in data) ? data["AllianceColor"] == 1 : true) {
    //     drawFigure((mode == 0) ? 2950 : 2800, 325, rightColor, ponytails[3], (mode == 0) ? 1 : 0)
    //     drawFigure((mode == 0) ? 2950 : 2800, 800, rightColor, ponytails[4], (mode == 0) ? 1 : 0)
    //     drawFigure((mode == 0) ? 2950 : 2800, 1275, rightColor, ponytails[5], (mode == 0) ? 1 : 0)
    // }

    // Write team number
    if (mode == 0) {
        context.textBaseline = "middle"
        context.textAlign = "center"
        context.font = "70px sans-serif"
        context.fillStyle = "#000000"
        context.fillText("You are scouting team " + appManager.team.toString(), 1500, 100)
    }
}
render()



buttonManager.addButton("TaxiLeft", new Button(600, 0, 300, 200, function () {
    if (mode == 0 && "AllianceColor" in data) {
        if (data["AllianceColor"] == 0) {
            data["Taxi"] = 1 - data["Taxi"]
            render()
        }
    }
}))

buttonManager.addButton("TaxiRight", new Button(2100, 0, 300, 200, function () {
    if (mode == 0 && "AllianceColor" in data) {
        if (data["AllianceColor"] == 1) {
            data["Taxi"] = 1 - data["Taxi"]
            render()
        }
    }
}))

buttonManager.addButton("LowClimb", new Button(0, 0, 250, 250, function () {
    if ((mode == 1)) {
        data["climbCounter"][0] += 1
        switch (data["climbCounter"][0]) {
            case 1:
                climbText[0] = "A"
                break;
            case 2:
                climbText[0] = "S"
                break;
            case 3:
                climbText[0] = "F"
                break
            default:
                break;
        }
        render()
    }
}))


buttonManager.addButton("UndoButton", new Button(1750, 1450, 250, 150, function () {
    if (dataLog.length > 0) {
        data = dataLog.pop()
        render()
    }
}))

