// canvas object in variable 'canvas'
// alliances reversed in variable 'reverseAlliances' -> no reverse = red on right
// call uploadData() to trigger upload (required if using visual for endgame)
// width = 3000px, height = 1600px
var mode = 0 // 0 = auto, 1 = teleop, 2 = endgame
this.setMode = function (newMode) { // REQUIRED FUNCTION
    if ((mode == 0 && newMode == 1) || (mode == 1 && newMode == 0)) {
        dataLog = []
        data["ShootPosition"] = ""
    }
    mode = newMode
    render()
}

// Color definitions and stuff
var leftColor = (reverseAlliances) ? "#ff0000" : "#0000de"
var rightColor = (reverseAlliances) ? "#0000de" : "#ff0000"
var leftHighlightColor = (reverseAlliances) ? "#ff7575" : "#6666ff"
var rightHighlightColor = (reverseAlliances) ? "#6666ff" : "#ff7575"
var yellow = "#FFFF00"
var outline = "#000000"
var fieldBackground = "#d1d1d1"
var text = "#000000"
var textWhite = "#ffffff"
var success = "#00d936"
var failure = "#b30000"
var climbText = ["L", "M", "H", "T"]
var popupCenter = null
var shootingLocationSuccesses = 0;
var shootingLocationFailures = 0;
var displayStartPosition = "";
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
const fieldCoordinate = [300, 200, 2500, 200, 2700, 400, 2700, 1400, 500, 1400, 300, 1200, 300, 200]
const bottomLeftFender = [1530, 950, 1587, 1105, 1246, 940, 1370, 890, 1530, 950]
const bottomRightFender = [1650, 770, 1815, 695, 1667, 1095, 1590, 935, 1650, 770]
const topLeftFender = [1350, 830, 1180, 905, 1334, 505, 1410, 670, 1350, 830]
const topRightFender = [1470, 650, 1398, 487, 1778, 639, 1630, 710, 1470, 650]
const leftLaunchPad = [300, 200, 880, 200, 880, 700, 300, 700, 300, 200]
const rightLaunchPad = [2080, 900, 2700, 900, 2200, 1400, 2080, 1400, 2080, 900]



this.getData = function () { // REQUIRED FUNCTION
    toSend = jsonCopy(data)
    if (!("AllianceColor" in data)) {
        toSend["AllianceColor"] = 0
    } else if (reverseAlliances) {
        toSend["AllianceColor"] = 1 - toSend["AllianceColor"]
    }
    //toSend["UpperSecondsBetween"] = toSend["UpperSecondsBetween"].join()
    delete toSend["ClimbCounter"]
    delete toSend["ClimbText"]
    delete toSend["ShootPosition"]
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
    "StartPositionZone": 0,
    "ClimbCounter": [0, 0, 0, 0],
    "ClimbText": ["L", "M", "H", "T"],
    "ShootPosition": ""
}
//data["AllianceColor"] = 1
var scoreSelectTime = 0
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

// Gets color of climb boxes
function getClimbBoxColor(climbText) {
    if (climbText == "L" || climbText == "M" || climbText == "H" || climbText == "T") {
        return fieldBackground
    }
    if (climbText == "A") {
        return yellow
    }
    if (climbText == "S") {
        return success
    }
    if (climbText == "F") {
        return failure
    }
}

function flippedCoordinates(shootLocation) {
    x = shootLocation.split(",")[0]
    y = shootLocation.split(",")[1]
    if ((reverseAlliances && data["AllianceColor"] == 0) || (!reverseAlliances && data["AllianceColor"] == 1)) {
        var flipX = Math.round(3000 - x)
        var flipY = Math.round(1600 - y)
        //console.log(reverseAlliances, data["AllianceColor"], shootLocation, x, y, flipX, flipY)
        return flipX + "," + flipY
    }
    else {
        //console.log(data["AllianceColor"], reverseAlliances, Math.round(x - 300), Math.round(y - 200))
        return Math.round(x) + "," + Math.round(y)
    }
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
    }
    setFieldPath()
    context.fill()
    context.stroke()

    //center line
    context.beginPath()
    context.moveTo(1235, 200)
    context.lineTo(1765, 1400)
    context.stroke()

    // tarmac
    drawObjects(bottomLeftTarmac, leftColor, black)
    drawObjects(bottomRightTarmac, rightColor, black)
    drawObjects(topLeftTarmac, leftColor, black)
    drawObjects(topRightTarmac, rightColor, black)


    //top left tarmac fender line
    context.beginPath()
    context.setLineDash([5, 15])
    context.moveTo(1334, 505)
    context.lineTo(1180, 905)
    context.stroke()

    //top right tarmac fender line
    context.moveTo(1398, 487)
    context.lineTo(1778, 634)
    context.stroke()


    //bottom right tarmac fender line
    context.moveTo(1815, 695)
    context.lineTo(1667, 1095)
    context.stroke()

    //bottom left tarmac fender line
    context.moveTo(1587, 1105)
    context.lineTo(1210, 960)
    context.stroke()
    context.beginPath()
    context.setLineDash([])

    // Draw start position
    if (mode == 0) {
        if (data["StartPosition"] != "") {
            position = displayStartPosition.split(",")
            context.strokeRect(position[0] - 25, position[1] - 25, 50, 50)
            console.log(position[0], position[1])
            context.stroke()
        }
    }

    if (mode == 0 || mode == 1) {
        if (data["ShootPosition"] != "") {
            position = data["ShootPosition"].split(",")
            // context.strokeRect(position[0] - 25, position[1] - 25, 50, 50)
            context.beginPath()
            context.arc(position[0], position[1], 50, 0, 2 * Math.PI)
            context.fillStyle = yellow;
            context.fill()
            context.stroke()
        }
    }

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
        context.fillStyle = getClimbBoxColor(data["ClimbText"][0])
        context.fillRect((data["AllianceColor"] == 0) ? 0 : 2750, 0, 250, 250)
        context.stroke()
        context.fillStyle = getClimbBoxColor(data["ClimbText"][1])
        context.fillRect((data["AllianceColor"] == 0) ? 0 : 2750, 450, 250, 250)
        context.stroke()
        context.fillStyle = getClimbBoxColor(data["ClimbText"][2])
        context.fillRect((data["AllianceColor"] == 0) ? 0 : 2750, 900, 250, 250)
        context.stroke()
        context.fillStyle = getClimbBoxColor(data["ClimbText"][3])
        context.fillRect((data["AllianceColor"] == 0) ? 0 : 2750, 1350, 250, 250)
        context.stroke()

        context.textAlign = "center"
        context.textBaseline = "middle"
        context.fillStyle = text
        context.strokeStyle = black
        context.font = "150px sans-serif"
        for (i = 0; i < 4; i++) {
            context.fillText(data["ClimbText"][i], (data["AllianceColor"] == 0) ? 125 : 2875, 125 + i * 450)

        }
        context.stroke()
    }

    //scoring boxes
    if (mode == 1 || mode == 0) {
        context.fillStyle = success
        context.fillRect((data["AllianceColor"] == 0) ? 2750 : 0, 0, 250, 300)
        context.fillRect((data["AllianceColor"] == 0) ? 2750 : 0, 900, 250, 300)
        context.stroke()


        context.fillStyle = failure
        context.fillRect((data["AllianceColor"] == 0) ? 2750 : 0, 375, 250, 300)
        context.fillRect((data["AllianceColor"] == 0) ? 2750 : 0, 1275, 250, 300)
        context.stroke()

        context.textAlign = "center"
        context.textBaseline = "middle"
        context.fillStyle = text
        context.strokeStyle = black
        context.font = "200px sans-serif"

        context.fillText((mode == 0) ? data["AutoUpperSuccess"] : data["TeleUpperSuccess"], (data["AllianceColor"] == 0) ? 2875 : 125, 150)

        context.fillText((mode == 0) ? data["AutoUpperFailures"] : data["TeleUpperFailures"], (data["AllianceColor"] == 0) ? 2875 : 125, 525)

        context.fillText((mode == 0) ? data["AutoLowerSuccess"] : data["TeleLowerSuccess"], (data["AllianceColor"] == 0) ? 2875 : 125, 1050)

        context.fillText((mode == 0) ? data["AutoLowerFailures"] : data["TeleLowerFailures"], (data["AllianceColor"] == 0) ? 2875 : 125, 1425)

    }

    // Draw moved from line symbols
    if ((mode == 0) && "AllianceColor" in data) {
        centerX = (data["AllianceColor"] == 0) ? 750 : 2250

        // context.beginPath()
        // context.fillStyle = outline
        // context.arc(centerX, 100, 25, 0, 2 * Math.PI)
        // context.fill()
        // context.moveTo(400, 200)

        if (data["Taxi"] == 1) {
            context.beginPath()
            context.moveTo(centerX - 205, 100)
            context.lineTo(centerX + 205, 100)
            context.moveTo(centerX - 155, 50)
            context.lineTo(centerX - 205, 100)
            context.lineTo(centerX - 155, 150)
            context.moveTo(centerX + 155, 50)
            context.lineTo(centerX + 205, 100)
            context.lineTo(centerX + 155, 150)
            context.stroke()
        }
        context.font = "250px sarif"
        context.textAlign = "center"
        context.textBaseline = "bottom"
        context.fillText("\uD83D\uDE95", centerX, 150)
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
    if (dataLog.length > 0) {
        context.fillStyle = "#e3e3e3"
        context.fillRect(1750, 1450, 250, 150)

        context.textBaseline = "middle"
        context.textAlign = "center"
        context.font = "70px sans-serif"
        context.fillStyle = "#000000"
        context.fillText("Undo", 1875, 1525)
    }

    if (popupCenter != null) {
        context.strokeStyle = "black"
        context.font = "120px sans-serif"

        context.lineWidth = 5
        context.fillStyle = "green"
        context.fillRect(popupCenter[0] - 100, popupCenter[1] - 250, 200, 200)
        context.strokeRect(popupCenter[0] - 100, popupCenter[1] - 250, 200, 200)
        context.fillStyle = "black"
    }


}


render()

function toRadians(degrees) {
    return degrees * (Math.PI / 180.0)
}
function rotX(x, y, theta) {
    console.log(x * Math.cos(toRadians(theta)) - y * Math.sin(toRadians(theta)) + 1200)
    return x * Math.cos(toRadians(theta)) - y * Math.sin(toRadians(theta)) + 1200


}
function rotY(x, y, theta) {
    console.log(x * Math.sin(toRadians(theta)) + y * Math.cos(toRadians(theta)) + 600)
    return x * Math.sin(toRadians(theta)) + y * Math.cos(toRadians(theta)) + 600
}


function climbButton(climbLevel, climbIndex) {
    var time = new Date().getTime() / 1000
    switch (data["ClimbCounter"][climbIndex]) {
        case 0:
            data["ClimbText"][climbIndex] = "L"
            break;
        case 1:
            data["ClimbText"][climbIndex] = "A"
            data[climbLevel].push(1, time)
            break;
        case 2:
            data["ClimbText"][climbIndex] = "S"
            data[climbLevel].push(1, time)
            break;
        case 3:
            data["ClimbText"][climbIndex] = "F"
            data[climbLevel].pop()
            data[climbLevel].pop()
            data[climbLevel].push(1, time)
            break
        default:
            break;
    }
}

function inZone(vertices, testx, testy) {
    let vertx = []
    let verty = []
    let nvert = vertices.length / 2
    for (i = 0; i < vertices.length; i += 2) {
        vertx.push(vertices[i])
        verty.push(vertices[i + 1])
    }
    var c = 0
    for (i = 0, j = nvert - 1; i < nvert; j = i++) {
        if (((verty[i] > testy) != (verty[j] > testy)) &&
            (testx < (vertx[j] - vertx[i]) * (testy - verty[i]) / (verty[j] - verty[i]) + vertx[i]))
            c = !c;
    }
    return c;
}


function startPositionZone(x, y) {
    // 1 - right fender
    // 2 - right tarmac
    // 3- left fender
    // 4 - left tarmac
    if (inZone(topRightFender, x, y)) {
        return 1
    }
    else if (inZone(bottomRightFender, x, y)) {
        return 3
    }
    else if (inZone(bottomLeftFender, x, y)) {
        return 1
    }
    else if (inZone(topLeftFender, x, y)) {
        return 3
    }
    else if (inZone(topRightTarmac, x, y)) {
        return 2
    }

    else if (inZone(bottomLeftTarmac, x, y)) {
        return 4
    }
    else if (inZone(bottomRightTarmac, x, y)) {
        return 2
    }
    else if (inZone(topLeftTarmac, x, y)) {
        return 4
    }
}

function shootPositionZone(x, y) {
    // 1 - own left fender (top left)
    // 2 - own left tarmac (top left)
    // 3 - own right fender (bottom left)
    // 4 - own right tarmac (bottom left)
    // 5 - own launchpad (left)
    // 6 - own side (left)
    // 7 - opponent left fender (top right)
    // 8 - opponent left tarmac (top right)
    // 9 - opponent right fender (bottom right)
    // 10 - opponent right tarmac (bottom right)
    // 11 - opponent launchpad (right)
    // 12 - opponent side (right)
    shootZone = 0
    var zoneCoordinates = flippedCoordinates(x + "," + y)
    x = zoneCoordinates.split(",")[0]
    y = zoneCoordinates.split(",")[1]
    if (x < 1200) {

        shootZone = 6
    }
    else {
        shootZone = 12
    }

    if (inZone(topLeftTarmac, x, y)) {
        shootZone = 2
    }

    if (inZone(bottomRightTarmac, x, y)) {
        shootZone = 10
    }


    if (inZone(bottomLeftTarmac, x, y)) {
        shootZone = 4
    }

    if (inZone(topRightTarmac, x, y)) {
        shootZone = 8
    }

    if (inZone(topLeftFender, x, y)) {
        shootZone = 1
    }

    if (inZone(bottomRightFender, x, y)) {
        shootZone = 9
    }

    if (inZone(topRightFender, x, y)) {
        shootZone = 7
    }

    if (inZone(bottomLeftFender, x, y)) {
        shootZone = 3
    }

    if (inZone(rightLaunchPad, x, y)) {
        shootZone = 11
    }

    if (inZone(leftLaunchPad, x, y)) {
        shootZone = 5
    }
    console.log(x, y, shootZone)
    return shootZone;
}







canvas.addEventListener("click", event => {
    var rect = canvas.getBoundingClientRect();
    var x = (event.clientX - rect.left) / rect.width * canvas.width
    var y = (event.clientY - rect.top) / rect.height * canvas.height

    if (data["StartPosition"] == "" && mode == 0) {
        if (inZone(bottomLeftTarmac, x, y) || inZone(topLeftTarmac, x, y)) {
            addToDataLog()
            displayStartPosition = x + "," + y
            data["AllianceColor"] = reverseAlliances
            data["StartPosition"] = flippedCoordinates(x + "," + y)
        }
        if (inZone(bottomRightTarmac, x, y) || inZone(topRightTarmac, x, y)) {
            addToDataLog()
            displayStartPosition = x + "," + y
            data["AllianceColor"] = 1 - reverseAlliances
            data["StartPosition"] = flippedCoordinates(x + "," + y)
        }
        data["StartPositionZone"] = startPositionZone(x, y)
    }
    //else if (data["StartPosition"] == "" && mode == 0) {
    //     if (inZone(bottomLeftTarmac, x, y) || inZone(topLeftTarmac, x, y)) {
    //         addToDataLog()
    //         data["AllianceColor"] = reverseAlliances
    //         data["StartPosition"] = flippedCoordinates(x + "," + y)
    //     }
    //     if (inZone(bottomRightTarmac, x, y) || inZone(topRightTarmac, x, y)) {
    //         addToDataLog()
    //         data["AllianceColor"] = 1 - reverseAlliances
    //         data["StartPosition"] = flippedCoordinates(x + "," + y)
    //     }
    // }
    else if (data["StartPosition"] != "") {
        if (inZone(fieldCoordinate, x, y)) {
            scoreSelectTime = new Date().getTime() / 1000
            data["ShootPosition"] = x + "," + y
            shootingLocationSuccesses = 0;
            shootingLocationFailures = 0;
        }
    }
    render()
})





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

buttonManager.addButton("LowClimbLeft", new Button(0, 0, 250, 250, function () {
    if ("AllianceColor" in data && mode == 1) {

        if ((data["AllianceColor"] == 0)) {
            addToDataLog()
            data["ClimbCounter"][0] += 1
            climbButton("ClimbLow", 0)
            render()
        }

    }


}))

buttonManager.addButton("MidClimbLeft", new Button(0, 450, 250, 250, function () {
    if ("AllianceColor" in data && mode == 1) {

        if ((data["AllianceColor"] == 0)) {
            addToDataLog()
            data["ClimbCounter"][1] += 1

            climbButton("ClimbMid", 1)

            render()

        }

    }


}))

buttonManager.addButton("HighClimbLeft", new Button(0, 900, 250, 250, function () {
    if ("AllianceColor" in data && mode == 1) {

        if ((data["AllianceColor"] == 0)) {
            addToDataLog()
            data["ClimbCounter"][2] += 1

            climbButton("ClimbHigh", 2)

            render()

        }

    }


}))

buttonManager.addButton("TraversalClimbLeft", new Button(0, 1350, 250, 250, function () {
    if ("AllianceColor" in data && mode == 1) {

        if ((data["AllianceColor"] == 0)) {
            addToDataLog()
            data["ClimbCounter"][3] += 1

            climbButton("ClimbTraversal", 3)

            render()

        }

    }


}))


buttonManager.addButton("LowClimbRight", new Button(2750, 0, 250, 250, function () {
    if ("AllianceColor" in data && mode == 1) {

        if ((data["AllianceColor"] == 1)) {
            addToDataLog()
            data["ClimbCounter"][0] += 1

            climbButton("ClimbLow", 0)

            render()

        }

    }


}))

buttonManager.addButton("MidClimbRight", new Button(2750, 450, 250, 250, function () {
    if ("AllianceColor" in data && mode == 1) {

        if ((data["AllianceColor"] == 1)) {
            addToDataLog()
            data["ClimbCounter"][1] += 1

            climbButton("ClimbMid", 1)

            render()

        }

    }


}))

buttonManager.addButton("HighClimbRight", new Button(2750, 900, 250, 250, function () {
    if ("AllianceColor" in data && mode == 1) {

        if ((data["AllianceColor"] == 1)) {
            addToDataLog()
            data["ClimbCounter"][2] += 1

            climbButton("ClimbHigh", 2)

            render()

        }

    }


}))

buttonManager.addButton("TraversalClimbRight", new Button(2750, 1350, 250, 250, function () {
    if ("AllianceColor" in data && mode == 1) {

        if ((data["AllianceColor"] == 1)) {
            addToDataLog()
            data["ClimbCounter"][3] += 1

            climbButton("ClimbTraversal", 3)

            render()

        }

    }
}))




buttonManager.addButton("LeftUpperSuccess", new Button(0, 0, 250, 300, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 1) {
            if ((mode == 0)) {
                addToDataLog()
                data["AutoUpperSuccess"] += 1
            }
            else {
                addToDataLog()
                data["TeleUpperSuccess"] += 1
            }
            shootingLocationSuccesses += 1
            var temp = {
                "x": flippedCoordinates(data["ShootPosition"]).split(",")[0],
                "y": flippedCoordinates(data["ShootPosition"]).split(",")[1],
                "mode": mode,
                "US": 1,
                "UF": 0,
                "LS": 0,
                "LF": 0,
                "ShootingPositionZone": shootPositionZone(data["ShootPosition"].split(",")[0], data["ShootPosition"].split(",")[1]),
                "time": scoreSelectTime
            }
            data["ScoringData"].push(temp)
            render()
        }
    }
}))

buttonManager.addButton("LeftUpperFailures", new Button(0, 375, 250, 300, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 1) {
            if ((mode == 0)) {
                addToDataLog()
                data["AutoUpperFailures"] += 1

            }
            else {
                addToDataLog()
                data["TeleUpperFailures"] += 1
            }
            shootingLocationFailures += 1
            var temp = {
                "x": flippedCoordinates(data["ShootPosition"]).split(",")[0],
                "y": flippedCoordinates(data["ShootPosition"]).split(",")[1],
                "mode": mode,
                "US": 0,
                "UF": 1,
                "LS": 0,
                "LF": 0,
                "ShootingPositionZone": shootPositionZone(data["ShootPosition"].split(",")[0], data["ShootPosition"].split(",")[1]),
                "time": scoreSelectTime
            }
            data["ScoringData"].push(temp)
            render()
        }
    }
}))

buttonManager.addButton("LeftLowerSuccess", new Button(0, 900, 250, 300, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 1) {
            if ((mode == 0)) {
                addToDataLog()
                data["AutoLowerSuccess"] += 1

            }
            else {
                addToDataLog()
                data["TeleLowerSuccess"] += 1
            }
            shootingLocationSuccesses += 1
            var temp = {
                "x": flippedCoordinates(data["ShootPosition"]).split(",")[0],
                "y": flippedCoordinates(data["ShootPosition"]).split(",")[1],
                "mode": mode,
                "US": 0,
                "UF": 0,
                "LS": 1,
                "LF": 0,
                "ShootingPositionZone": shootPositionZone(data["ShootPosition"].split(",")[0], data["ShootPosition"].split(",")[1]),
                "time": scoreSelectTime
            }
            data["ScoringData"].push(temp)
            render()
        }
    }
}))

buttonManager.addButton("LeftLowerFailures", new Button(0, 1275, 250, 300, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 1) {
            if ((mode == 0)) {
                addToDataLog()
                data["AutoLowerFailures"] += 1

            }
            else {
                addToDataLog()
                data["TeleLowerFailures"] += 1
            }
            shootingLocationFailures += 1
            var temp = {
                "x": flippedCoordinates(data["ShootPosition"]).split(",")[0],
                "y": flippedCoordinates(data["ShootPosition"]).split(",")[1],
                "mode": mode,
                "US": 0,
                "UF": 0,
                "LS": 0,
                "LF": 1,
                "ShootingPositionZone": shootPositionZone(data["ShootPosition"].split(",")[0], data["ShootPosition"].split(",")[1]),
                "time": scoreSelectTime
            }
            data["ScoringData"].push(temp)
            render()
        }
    }
}))


buttonManager.addButton("RightUpperSuccess", new Button(2750, 0, 250, 300, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 0) {
            if ((mode == 0)) {
                addToDataLog()
                data["AutoUpperSuccess"] += 1

            }
            else {
                addToDataLog()
                data["TeleUpperSuccess"] += 1
            }
            shootingLocationSuccesses += 1
            var temp = {
                "x": flippedCoordinates(data["ShootPosition"]).split(",")[0],
                "y": flippedCoordinates(data["ShootPosition"]).split(",")[1],
                "mode": mode,
                "US": 1,
                "UF": 0,
                "LS": 0,
                "LF": 0,
                "ShootingPositionZone": shootPositionZone(data["ShootPosition"].split(",")[0], data["ShootPosition"].split(",")[1]),
                "time": scoreSelectTime
            }
            data["ScoringData"].push(temp)
            render()
        }
    }
}))

buttonManager.addButton("RightUpperFailures", new Button(2750, 375, 250, 300, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 0) {
            if ((mode == 0)) {
                addToDataLog()
                data["AutoUpperFailures"] += 1

            }
            else {
                addToDataLog()
                data["TeleUpperFailures"] += 1
            }
            shootingLocationFailures += 1
            var temp = {
                "x": flippedCoordinates(data["ShootPosition"]).split(",")[0],
                "y": flippedCoordinates(data["ShootPosition"]).split(",")[1],
                "mode": mode,
                "US": 0,
                "UF": 1,
                "LS": 0,
                "LF": 0,
                "ShootingPositionZone": shootPositionZone(data["ShootPosition"].split(",")[0], data["ShootPosition"].split(",")[1]),
                "time": scoreSelectTime
            }
            data["ScoringData"].push(temp)
            render()
        }
    }
}))

buttonManager.addButton("RightLowerSuccess", new Button(2750, 900, 250, 300, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 0) {
            if ((mode == 0)) {
                addToDataLog()
                data["AutoLowerSuccess"] += 1

            }
            else {
                addToDataLog()
                data["TeleLowerSuccess"] += 1
            }
            shootingLocationSuccesses += 1
            var temp = {
                "x": flippedCoordinates(data["ShootPosition"]).split(",")[0],
                "y": flippedCoordinates(data["ShootPosition"]).split(",")[1],
                "mode": mode,
                "US": 0,
                "UF": 0,
                "LS": 1,
                "LF": 0,
                "ShootingPositionZone": shootPositionZone(data["ShootPosition"].split(",")[0], data["ShootPosition"].split(",")[1]),
                "time": scoreSelectTime
            }
            data["ScoringData"].push(temp)
            render()
        }
    }
}))

buttonManager.addButton("RightLowerFailures", new Button(2750, 1275, 250, 300, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 0) {
            if ((mode == 0)) {
                addToDataLog()
                data["AutoLowerFailures"] += 1

            }
            else {
                addToDataLog()
                data["TeleLowerFailures"] += 1
            }
            shootingLocationFailures += 1
            var temp = {
                "x": flippedCoordinates(data["ShootPosition"]).split(",")[0],
                "y": flippedCoordinates(data["ShootPosition"]).split(",")[1],
                "mode": mode,
                "US": 0,
                "UF": 0,
                "LS": 0,
                "LF": 1,
                "ShootingPositionZone": shootPositionZone(data["ShootPosition"].split(",")[0], data["ShootPosition"].split(",")[1]),
                "time": scoreSelectTime
            }
            data["ScoringData"].push(temp)
            render()
        }
    }
}))


buttonManager.addButton("UndoButton", new Button(1750, 1450, 250, 150, function () {
    if (dataLog.length > 0) {
        data = dataLog.pop()
        render()
    }
}))

