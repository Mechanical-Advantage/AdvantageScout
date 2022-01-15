// canvas object in variable 'canvas'
// alliances reversed in variable 'reverseAlliances' -> no reverse = red on right
// call uploadData() to trigger upload (required if using visual for endgame)
// width = 3000px, height = 1600px
var mode = 0 // 0 = auto, 1 = teleop, 2 = endgame
this.setMode = function (newMode) { // REQUIRED FUNCTION
    mode = newMode
    dataLog = []
    buttonManager.setEnabled("blueHab1L", mode == 0)
    buttonManager.setEnabled("blueHab1C", mode == 0)
    buttonManager.setEnabled("blueHab1R", mode == 0)
    buttonManager.setEnabled("blueHab2L", mode == 0)
    buttonManager.setEnabled("blueHab2R", mode == 0)
    buttonManager.setEnabled("redHab1R", mode == 0)
    buttonManager.setEnabled("redHab1C", mode == 0)
    buttonManager.setEnabled("redHab1L", mode == 0)
    buttonManager.setEnabled("redHab2R", mode == 0)
    buttonManager.setEnabled("redHab2L", mode == 0)
    buttonManager.setEnabled("blueCrossedLineToggle", mode == 0)
    buttonManager.setEnabled("redCrossedLineToggle", mode == 0)
    render()
}
this.getData = function () { // REQUIRED FUNCTION
    if (!("AllianceColor" in data)) {
        data["AllianceColor"] = 0
    }
    if (reverseAlliances) {
        data["AllianceColor"] = 1 - data["AllianceColor"]
    }
    data["AutoRocketCargo"] = rocketData[0]["cargo"][3] + rocketData[0]["cargo"][4] + rocketData[0]["cargo"][5] + rocketData[0]["cargo"][9] + rocketData[0]["cargo"][10] + rocketData[0]["cargo"][11]
    data["AutoRocketCargoFailures"] = rocketData[0]["cargo"][0] + rocketData[0]["cargo"][1] + rocketData[0]["cargo"][2] + rocketData[0]["cargo"][6] + rocketData[0]["cargo"][7] + rocketData[0]["cargo"][8]
    data["AutoRocketHatch"] = rocketData[0]["hatch"][3] + rocketData[0]["hatch"][4] + rocketData[0]["hatch"][5] + rocketData[0]["hatch"][9] + rocketData[0]["hatch"][10] + rocketData[0]["hatch"][11]
    data["AutoRocketHatchFailures"] = rocketData[0]["hatch"][0] + rocketData[0]["hatch"][1] + rocketData[0]["hatch"][2] + rocketData[0]["hatch"][6] + rocketData[0]["hatch"][7] + rocketData[0]["hatch"][8]
    data["RocketL1Cargo"] = rocketData[1]["cargo"][5] + rocketData[1]["cargo"][11]
    data["RocketL1CargoFailures"] = rocketData[1]["cargo"][2] + rocketData[1]["cargo"][8]
    data["RocketL1Hatch"] = rocketData[1]["hatch"][5] + rocketData[1]["hatch"][11]
    data["RocketL1HatchFailures"] = rocketData[1]["hatch"][2] + rocketData[1]["hatch"][8]
    data["RocketL2Cargo"] = rocketData[1]["cargo"][4] + rocketData[1]["cargo"][10]
    data["RocketL2CargoFailures"] = rocketData[1]["cargo"][1] + rocketData[1]["cargo"][7]
    data["RocketL2Hatch"] = rocketData[1]["hatch"][4] + rocketData[1]["hatch"][10]
    data["RocketL2HatchFailures"] = rocketData[1]["hatch"][1] + rocketData[1]["hatch"][7]
    data["RocketL3Cargo"] = rocketData[1]["cargo"][3] + rocketData[1]["cargo"][9]
    data["RocketL3CargoFailures"] = rocketData[1]["cargo"][0] + rocketData[1]["cargo"][6]
    data["RocketL3Hatch"] = rocketData[1]["hatch"][3] + rocketData[1]["hatch"][9]
    data["RocketL3HatchFailures"] = rocketData[1]["hatch"][0] + rocketData[1]["hatch"][6]
    return data
}

var context = canvas.getContext("2d")
var buttonManager = new ButtonManager(canvas)
var data = { "AutoShipHatch": 0, "AutoShipHatchFailures": 0, "AutoShipCargo": 0, "AutoShipCargoFailures": 0, "ShipHatch": 0, "ShipHatchFailures": 0, "ShipCargo": 0, "ShipCargoFailures": 0 }
var dataLog = []
var rocketData = { 0: { "hatch": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "cargo": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }, 1: { "hatch": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "cargo": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] } }
var rocketDataLog = []
var selectedPiece = "none"
var redColor = "#ff0000"
var redHighlightColor = "#ff7575"
var blueColor = "#0000de"
var blueHighlightColor = "#6666ff"
if (reverseAlliances) {
    redColor = "#0000de"
    redHighlightColor = "#6666ff"
    blueColor = "#ff0000"
    blueHighlightColor = "#ff7575"
}

const rocketButtonX = [1825, 1825, 1825, 1975, 1975, 1975, 1825, 1825, 1825, 1975, 1975, 1975]
const rocketButtonY = [30, 180, 330, 30, 180, 330, 1120, 1270, 1420, 1120, 1270, 1420]
const rocketButtonSuccess = [false, false, false, true, true, true, false, false, false, true, true, true]

function jsonCopy(original) {
    return JSON.parse(JSON.stringify(original))
}

function saveData() {
    dataLog.push(jsonCopy(data))
    rocketDataLog.push(jsonCopy(rocketData))
}

function render() {
    context.clearRect(0, 0, 3000, 1600)

    // main background
    context.fillStyle = "#d1d1d1"
    context.fillRect(300, 200, 2400, 1200)

    // blue HAB background
    context.fillStyle = blueColor
    context.fillRect(300, 500, 350, 600)
    if ("StartLevel" in data && "StartPos" in data && data["AllianceColor"] == 1 && mode == 0) {
        context.fillStyle = blueHighlightColor
        context.fillRect(650 + (data["StartLevel"] * -175), 500 + (data["StartPos"] * 200), 175, 200)
    }

    // red HAB background
    context.fillStyle = redColor
    context.fillRect(2350, 500, 350, 600)
    if ("StartLevel" in data && "StartPos" in data && data["AllianceColor"] == 0 && mode == 0) {
        context.fillStyle = redHighlightColor
        context.fillRect(2175 + (data["StartLevel"] * 175), 900 + (data["StartPos"] * -200), 175, 200)
    }

    // cargo & hatch
    if ("AllianceColor" in data) {
        if (selectedPiece == "cargo") {
            context.lineWidth = 20
            context.fillStyle = "#bd6500"
        } else {
            context.lineWidth = 5
            context.fillStyle = "#ff8800"
        }
        context.beginPath()

        context.arc(2875 + (data["AllianceColor"] * -2750), 600, 100, 0, 2 * Math.PI)
        context.fill()
        context.stroke()

        if (selectedPiece == "hatch") {
            context.lineWidth = 20
            context.fillStyle = "#c7ba00"
        } else {
            context.lineWidth = 5
            context.fillStyle = "#fff34d"
        }
        context.beginPath()
        context.arc(2875 + (data["AllianceColor"] * -2750), 1000, 100, 0, 2 * Math.PI)
        context.fill()
        context.stroke()

        context.beginPath()
        context.fillStyle = "#ffffff"
        context.arc(2875 + (data["AllianceColor"] * -2750), 1000, 32, 0, 2 * Math.PI)
        context.fill()
        context.stroke()

    }

    // blue cargo ship
    context.beginPath()
    context.lineWidth = 5
    context.fillStyle = blueColor
    context.moveTo(1000, 670)
    context.lineTo(1000, 930)
    context.lineTo(1200, 960)
    context.lineTo(1500, 960)
    context.lineTo(1500, 640)
    context.lineTo(1200, 640)
    context.closePath()
    context.fill()
    context.stroke()

    // red cargo ship
    context.beginPath()
    context.lineWidth = 5
    context.fillStyle = redColor
    context.moveTo(2000, 670)
    context.lineTo(2000, 930)
    context.lineTo(1800, 960)
    context.lineTo(1500, 960)
    context.lineTo(1500, 640)
    context.lineTo(1800, 640)
    context.closePath()
    context.fill()
    context.stroke()

    // cargo ship buttons
    if ("AllianceColor" in data) {
        context.fillStyle = "#00d936"
        context.fillRect(1740 + (data["AllianceColor"] * -680), 700, 200, 200)
        context.lineWidth = 5
        context.strokeRect(1740 + (data["AllianceColor"] * -680), 700, 200, 200)

        context.fillStyle = "#b30000"
        context.fillRect(1540 + (data["AllianceColor"] * -280), 700, 200, 200)
        context.lineWidth = 5
        context.strokeRect(1540 + (data["AllianceColor"] * -280), 700, 200, 200)

        context.textAlign = "center"
        context.textBaseline = "middle"
        context.font = "140px sans-serif"
        context.fillStyle = "#000000"
        var shipSuccesses = ""
        var shipFailures = ""
        if (selectedPiece != "none") {
            var pieceText = selectedPiece.charAt(0).toUpperCase() + selectedPiece.slice(1)
            if (mode == 0) {
                shipSuccesses = data["AutoShip" + pieceText]
                shipFailures = data["AutoShip" + pieceText + "Failures"]
            } else {
                shipSuccesses = data["Ship" + pieceText]
                shipFailures = data["Ship" + pieceText + "Failures"]
            }
        }
        context.fillText(shipSuccesses, 1840 + (data["AllianceColor"] * -680), 800)
        context.fillText(shipFailures, 1640 + (data["AllianceColor"] * -280), 800)

    }

    // OUTLINE PATH START
    context.beginPath()
    context.lineWidth = 5
    context.lineCap = "butt"

    // main outline
    context.strokeStyle = "#000000"
    context.strokeRect(300, 200, 2400, 1200)

    // HAB lines
    context.moveTo(650, 200)
    context.lineTo(650, 1400)

    context.moveTo(2350, 200)
    context.lineTo(2350, 1400)

    // blue HAB outline
    context.strokeRect(300, 500, 350, 600)
    context.moveTo(475, 500)
    context.lineTo(475, 1100)

    context.moveTo(300, 700)
    context.lineTo(650, 700)

    context.moveTo(300, 900)
    context.lineTo(650, 900)

    context.moveTo(300, 700)
    context.lineTo(475, 900)

    context.moveTo(300, 900)
    context.lineTo(475, 700)

    // red HAB outline
    context.strokeRect(2350, 500, 350, 600)
    context.moveTo(2525, 500)
    context.lineTo(2525, 1100)

    context.moveTo(2350, 700)
    context.lineTo(2700, 700)

    context.moveTo(2350, 900)
    context.lineTo(2700, 900)

    context.moveTo(2525, 700)
    context.lineTo(2700, 900)

    context.moveTo(2525, 900)
    context.lineTo(2700, 700)

    // OUTLINE PATH END
    context.stroke()

    // blue rockets
    context.lineWidth = 5
    context.fillStyle = blueColor
    context.fillRect(850, 5, 350, 500)
    context.strokeRect(850, 5, 350, 500)
    context.fillRect(850, 1095, 350, 500)
    context.strokeRect(850, 1095, 350, 500)

    // red rockets
    context.lineWidth = 5
    context.fillStyle = redColor
    context.fillRect(1800, 5, 350, 500)
    context.strokeRect(1800, 5, 350, 500)
    context.fillRect(1800, 1095, 350, 500)
    context.strokeRect(1800, 1095, 350, 500)

    // rocket buttons
    if ("AllianceColor" in data) {
        context.lineWidth = 5
        context.textAlign = "center"
        context.textBaseline = "middle"
        context.font = "110px sans-serif"
        for (var i = 0; i < rocketButtonX.length; i++) {
            var allianceShift
            if (rocketButtonSuccess[i]) {
                context.fillStyle = "#00d936"
                allianceShift = -1100
            } else {
                context.fillStyle = "#b30000"
                allianceShift = -800
            }
            context.fillRect(rocketButtonX[i] + (data["AllianceColor"] * allianceShift), rocketButtonY[i], 150, 150)
            context.strokeRect(rocketButtonX[i] + (data["AllianceColor"] * allianceShift), rocketButtonY[i], 150, 150)

            var value = ""
            if (selectedPiece != "none") {
                value = rocketData[mode][selectedPiece][i]
            }
            context.fillStyle = "#000000"
            context.fillText(value, rocketButtonX[i] + 75 + (data["AllianceColor"] * allianceShift), rocketButtonY[i] + 75)
        }
    }

    // crossed line arrow
    context.lineWidth = 15
    context.lineCap = "round"
    context.beginPath()
    if ("AllianceColor" in data && mode == 0) {
        if (!("CrossedLine" in data)) {
            data["CrossedLine"] = 0
        }
        var pointLeft = data["CrossedLine"] == 0
        if (data["AllianceColor"] == 0) {
            pointLeft = !pointLeft
        }
        var offset = data["AllianceColor"] * -1700 + 1700
        context.moveTo(580 + offset, 100)
        context.lineTo(720 + offset, 100)
        if (pointLeft) {
            context.moveTo(580 + offset, 100)
            context.lineTo(630 + offset, 50)
            context.moveTo(580 + offset, 100)
            context.lineTo(630 + offset, 150)
        } else {
            context.moveTo(720 + offset, 100)
            context.lineTo(670 + offset, 50)
            context.moveTo(720 + offset, 100)
            context.lineTo(670 + offset, 150)
        }
        context.stroke()
    }

    // rocket level text
    if ("AllianceColor" in data) {
        context.textBaseline = "middle"
        context.font = "70px sans-serif"
        context.fillStyle = "#000000"
        if (data["AllianceColor"] == 1) {
            context.textAlign = "left"
            context.fillText("L3", 1230, 105)
            context.fillText("L2", 1230, 255)
            context.fillText("L1", 1230, 405)
            context.fillText("L3", 1230, 1195)
            context.fillText("L2", 1230, 1345)
            context.fillText("L1", 1230, 1495)
        } else {
            context.textAlign = "right"
            context.fillText("L3", 1770, 105)
            context.fillText("L2", 1770, 255)
            context.fillText("L1", 1770, 405)
            context.fillText("L3", 1770, 1195)
            context.fillText("L2", 1770, 1345)
            context.fillText("L1", 1770, 1495)
        }
    }

    // undo button
    if (dataLog.length > 0) {
        context.fillStyle = "#e3e3e3"
        context.fillRect(1375, 1450, 250, 150)

        context.textBaseline = "middle"
        context.textAlign = "center"
        context.font = "70px sans-serif"
        context.fillStyle = "#000000"
        context.fillText("Undo", 1500, 1525)
    }
}
render()

buttonManager.addButton("blueHab1L", new Button(475, 500, 175, 200, function () {
    data["AllianceColor"] = 1
    data["StartLevel"] = 1
    data["StartPos"] = 0
    render()
}))
buttonManager.addButton("blueHab1C", new Button(475, 700, 175, 200, function () {
    data["AllianceColor"] = 1
    data["StartLevel"] = 1
    data["StartPos"] = 1
    render()
}))
buttonManager.addButton("blueHab1R", new Button(475, 900, 175, 200, function () {
    data["AllianceColor"] = 1
    data["StartLevel"] = 1
    data["StartPos"] = 2
    render()
}))
buttonManager.addButton("blueHab2L", new Button(300, 500, 175, 200, function () {
    data["AllianceColor"] = 1
    data["StartLevel"] = 2
    data["StartPos"] = 0
    render()
}))
buttonManager.addButton("blueHab2R", new Button(300, 900, 175, 200, function () {
    data["AllianceColor"] = 1
    data["StartLevel"] = 2
    data["StartPos"] = 2
    render()
}))
buttonManager.addButton("redHab1R", new Button(2350, 500, 175, 200, function () {
    data["AllianceColor"] = 0
    data["StartLevel"] = 1
    data["StartPos"] = 2
    render()
}))
buttonManager.addButton("redHab1C", new Button(2350, 700, 175, 200, function () {
    data["AllianceColor"] = 0
    data["StartLevel"] = 1
    data["StartPos"] = 1
    render()
}))
buttonManager.addButton("redHab1L", new Button(2350, 900, 175, 200, function () {
    data["AllianceColor"] = 0
    data["StartLevel"] = 1
    data["StartPos"] = 0
    render()
}))
buttonManager.addButton("redHab2R", new Button(2525, 500, 175, 200, function () {
    data["AllianceColor"] = 0
    data["StartLevel"] = 2
    data["StartPos"] = 2
    render()
}))
buttonManager.addButton("redHab2L", new Button(2525, 900, 175, 200, function () {
    data["AllianceColor"] = 0
    data["StartLevel"] = 2
    data["StartPos"] = 0
    render()
}))
buttonManager.addButton("blueCrossedLineToggle", new Button(530, 0, 240, 200, function () {
    if (data["AllianceColor"] == 1) {
        if (data["CrossedLine"] == 0) {
            data["CrossedLine"] = 1
        } else {
            data["CrossedLine"] = 0
        }
    }
    render()
}))
buttonManager.addButton("redCrossedLineToggle", new Button(2230, 0, 240, 200, function () {
    if (data["AllianceColor"] == 0) {
        if (data["CrossedLine"] == 0) {
            data["CrossedLine"] = 1
        } else {
            data["CrossedLine"] = 0
        }
    }
    render()
}))
buttonManager.addButton("blueCargoSelect", new Button(0, 450, 300, 300, function () {
    if ("AllianceColor" in data && data["AllianceColor"] == 1) {
        if (selectedPiece == "cargo") {
            selectedPiece = "none"
        } else {
            selectedPiece = "cargo"
        }
        render()
    }
}))
buttonManager.addButton("blueHatchSelect", new Button(0, 850, 300, 300, function () {
    if ("AllianceColor" in data && data["AllianceColor"] == 1) {
        if (selectedPiece == "hatch") {
            selectedPiece = "none"
        } else {
            selectedPiece = "hatch"
        }
        render()
    }
}))
buttonManager.addButton("redCargoSelect", new Button(2700, 450, 300, 300, function () {
    if ("AllianceColor" in data && data["AllianceColor"] == 0) {
        if (selectedPiece == "cargo") {
            selectedPiece = "none"
        } else {
            selectedPiece = "cargo"
        }
        render()
    }
}))
buttonManager.addButton("redHatchSelect", new Button(2700, 850, 300, 300, function () {
    if ("AllianceColor" in data && data["AllianceColor"] == 0) {
        if (selectedPiece == "hatch") {
            selectedPiece = "none"
        } else {
            selectedPiece = "hatch"
        }
        render()
    }
}))
function shipButton(failure) {
    saveData()
    var failureText = ""
    if (failure) {
        failureText = "Failures"
    }
    if (mode == 0) {
        if (selectedPiece == "hatch") {
            data["AutoShipHatch" + failureText]++
        } else if (selectedPiece == "cargo") {
            data["AutoShipCargo" + failureText]++
        }
    } else {
        if (selectedPiece == "hatch") {
            data["ShipHatch" + failureText]++
        } else if (selectedPiece == "cargo") {
            data["ShipCargo" + failureText]++
        }
    }
    render()
}
buttonManager.addButton("blueShipSuccess", new Button(1060, 700, 200, 200, function () {
    if ("AllianceColor" in data && data["AllianceColor"] == 1) {
        shipButton(false)
    }
}))
buttonManager.addButton("redShipSuccess", new Button(1740, 700, 200, 200, function () {
    if ("AllianceColor" in data && data["AllianceColor"] == 0) {
        shipButton(false)
    }
}))
buttonManager.addButton("blueShipFailure", new Button(1260, 700, 200, 200, function () {
    if ("AllianceColor" in data && data["AllianceColor"] == 1) {
        shipButton(true)
    }
}))
buttonManager.addButton("redShipFailure", new Button(1540, 700, 200, 200, function () {
    if ("AllianceColor" in data && data["AllianceColor"] == 0) {
        shipButton(true)
    }
}))
function rocketButton(id) {
    saveData()
    rocketData[mode][selectedPiece][id]++
    render()
}
for (var alliance = 0; alliance < 2; alliance++) {
    for (var i = 0; i < rocketButtonX.length; i++) {
        var allianceText = "red"
        if (alliance == 1) {
            allianceText = "blue"
        }
        var allianceShift
        if (rocketButtonSuccess[i]) {
            allianceShift = -1100
        } else {
            allianceShift = -800
        }
        buttonManager.addButton(allianceText + "RocketButton" + i.toString(), new Button(rocketButtonX[i] + (alliance * allianceShift), rocketButtonY[i], 150, 150, function () {
            if ("AllianceColor" in data && data["AllianceColor"] == this.data["alliance"]) {
                rocketButton(this.data["id"])
            }
        }))
        buttonManager.setData(allianceText + "RocketButton" + i.toString(), { "alliance": alliance, "id": i })
    }
}

buttonManager.addButton("undoButton", new Button(1375, 1450, 250, 150, function () {
    if (dataLog.length > 0) {
        data = jsonCopy(dataLog.pop())
        rocketData = jsonCopy(rocketDataLog.pop())
        render()
    }
}))