// canvas object in variable 'canvas'
// alliances reversed in variable 'reverseAlliances' -> no reverse = red on right
// width = 3000px, height = 1600px
var mode = 0 // 0 = auto, 1 = teleop, 2 = endgame
this.setMode = function (newMode) { // REQUIRED FUNCTION
    if ((mode == 0 && newMode == 1) || (mode == 1 && newMode == 0)) {
        dataLog = []
    }
    mode = newMode
    render()
}

this.getData = function () { // REQUIRED FUNCTION
    toSend = jsonCopy(data)
    if (reverseAlliances) {
        toSend["AllianceColor"] = 1 - toSend["AllianceColor"]
    }
    toSend["UpperSecondsBetween"] = toSend["UpperSecondsBetween"].join()
    delete toSend["LastUpperButton"]
    return toSend
}
function uploadData() { // Closes scouting interface and saves data (if using visual for end game, must have a call to this function)
    appManager.scoutManager.upload()
}

function jsonCopy(original) {
    return JSON.parse(JSON.stringify(original))
}

var context = canvas.getContext("2d")
var buttonManager = new ButtonManager(canvas)
const secondsBetweenThreshold = 15 // # of secs needed to reset scoring timer
var data = {
    "CrossedLine": 0,
    "AutoInnerSuccess": 0,
    "AutoOuterSuccess": 0,
    "AutoLowerSuccess": 0,
    "AutoUpperFailures": 0,
    "AutoLowerFailures": 0,
    "InnerSuccess": 0,
    "OuterSuccess": 0,
    "LowerSuccess": 0,
    "UpperFailures": 0,
    "LowerFailures": 0,
    "UpperSecondsBetween": [],
    "LastUpperButton": 0,
    "WheelRotationSuccess": 0,
    "WheelRotationAttempted": 0,
    "WheelPositionSuccess": 0,
    "WheelPositionAttempted": 0
}
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

// Color definitions
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
var controlHighlight = "#fff533"
var controlBlue = "#00ffff"
var controlGreen = "#00ff00"
var controlRed = "#ff0000"
var controlYellow = "#ffff00"

// Set ponytails
const ponytails = [Math.random() > 0.5, Math.random() > 0.5, Math.random() > 0.5, Math.random() > 0.5, Math.random() > 0.5, Math.random() > 0.5]

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
        context.beginPath()
        context.moveTo(450, 450)
        context.lineTo(450, 1150)
        context.lineTo(550, 1400)
        context.lineTo(2450, 1400)
        context.lineTo(2550, 1150)
        context.lineTo(2550, 450)
        context.lineTo(2450, 200)
        context.lineTo(550, 200)
        context.lineTo(450, 450)
        context.lineWidth = 8
        context.fillStyle = fieldBackground
        context.strokeStyle = outline
    }
    setFieldPath()
    context.fill()

    // Draw initiation lines
    context.beginPath()
    context.moveTo(2250, 200)
    context.lineTo(2250, 1400)
    context.moveTo(750, 200)
    context.lineTo(750, 1400)
    context.stroke()

    // Draw control panel backgrounds
    context.fillStyle = rightColor
    context.fillRect(1400, 200, 600, 300)
    context.fillStyle = leftColor
    context.fillRect(1000, 1100, 600, 300)

    // Draw control panel text
    if ("AllianceColor" in data && mode == 1) {
        context.textAlign = "center"
        context.textBaseline = "middle"
        context.fillStyle = text
        context.font = "130px sans-serif"
        centerX = (data["AllianceColor"] == 0) ? 1700 : 1300
        centerY = (data["AllianceColor"] == 0) ? 350 : 1250

        context.fillStyle = (data["AllianceColor"] == 0) ? rightHighlightColor : leftHighlightColor
        if ((controlRotationSelected) ? data["WheelRotationAttempted"] : data["WheelPositionAttempted"] == 1) {
            context.fillRect(centerX - 300, centerY - 150, 300, 300)
            context.font = "bold 130px sans-serif"
        } else {
            context.font = "130px sans-serif"
        }
        context.fillStyle = text
        context.fillText("Att", centerX - 150, centerY + 10)

        context.fillStyle = (data["AllianceColor"] == 0) ? rightHighlightColor : leftHighlightColor
        if ((controlRotationSelected) ? data["WheelRotationSuccess"] : data["WheelPositionSuccess"] == 1) {
            context.fillRect(centerX, centerY - 150, 300, 300)
            context.font = "bold 130px sans-serif"
        } else {
            context.font = "130px sans-serif"
        }
        context.fillStyle = text
        context.fillText("Suc", centerX + 150, centerY + 10)
    }

    // Draw upper control panel outline
    context.strokeRect(1400, 200, 600, 300)
    context.beginPath()
    context.moveTo(1700, 200)
    context.lineTo(1700, 500)
    context.stroke()

    // Draw lower control panel outline
    context.strokeRect(1000, 1100, 600, 300)
    context.beginPath()
    context.moveTo(1300, 1100)
    context.lineTo(1300, 1400)
    context.stroke()

    // Draw shield generator
    context.beginPath()
    context.moveTo(1700, 500)
    context.lineTo(1750, 750)
    context.lineTo(1250, 850)
    context.lineTo(1200, 600)
    context.closePath()
    context.fillStyle = rightColor
    context.fill()
    context.stroke()

    context.beginPath()
    context.moveTo(1750, 750)
    context.lineTo(1800, 1000)
    context.lineTo(1300, 1100)
    context.lineTo(1250, 850)
    context.closePath()
    context.fillStyle = leftColor
    context.fill()
    context.stroke()

    // Draw protected areas
    // upper left
    context.beginPath()
    context.moveTo(450, 450)
    context.lineTo(550, 600)
    context.lineTo(450, 750)
    context.strokeStyle = rightColor
    context.stroke()

    // lower left
    context.beginPath()
    context.moveTo(450, 1150)
    context.lineTo(550, 1000)
    context.lineTo(450, 850)
    context.strokeStyle = leftColor
    context.stroke()

    // upper right
    context.beginPath()
    context.moveTo(2550, 450)
    context.lineTo(2450, 600)
    context.lineTo(2550, 750)
    context.strokeStyle = rightColor
    context.stroke()

    // lower right
    context.beginPath()
    context.moveTo(2550, 1150)
    context.lineTo(2450, 1000)
    context.lineTo(2550, 850)
    context.strokeStyle = leftColor
    context.stroke()

    // Draw starting positions
    if (mode == 0) {
        context.strokeStyle = outline
        context.fillStyle = leftColor
        context.fillRect(2175, 200, 150, 1200)
        context.fillStyle = rightColor
        context.fillRect(675, 200, 150, 1200)

        // Highlight
        if ("StartPos" in data) {
            context.fillStyle = (data["AllianceColor"] == 0) ? rightHighlightColor : leftHighlightColor
            if (data["AllianceColor"] == 0) {
                context.fillRect(675, 1000 - data["StartPos"] * 400, 150, 400)
            } else {
                context.fillRect(2175, 200 + data["StartPos"] * 400, 150, 400)
            }
        }

        // Right outline
        context.strokeRect(2175, 200, 150, 400)
        context.strokeRect(2175, 600, 150, 400)
        context.strokeRect(2175, 1000, 150, 400)

        // Left outline
        context.strokeRect(675, 200, 150, 400)
        context.strokeRect(675, 600, 150, 400)
        context.strokeRect(675, 1000, 150, 400)
    }
    // Draw outline
    setFieldPath()
    context.stroke()

    // Draw moved from line symbols
    if ((mode == 0) && "AllianceColor" in data) {
        centerX = (data["AllianceColor"] == 0) ? 750 : 2250

        context.beginPath()
        context.fillStyle = outline
        context.arc(centerX, 100, 25, 0, 2 * Math.PI)
        context.fill()

        if (data["CrossedLine"] == 1) {
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
        context.fillRect(leftX, 500, 200, 600)
        context.fillStyle = failure
        context.fillRect(leftX + 200, 500, 200, 600)
        context.strokeRect(leftX, 500, 400, 600)
        context.beginPath()
        context.moveTo(leftX + 200, 500)
        context.lineTo(leftX + 200, 1100)
        context.moveTo(leftX + 0, 700)
        context.lineTo(leftX + 200, 700)
        context.moveTo(leftX + 0, 900)
        context.lineTo(leftX + 400, 900)
        context.stroke()

        // Write numbers
        context.textAlign = "center"
        context.textBaseline = "middle"
        context.font = "130px sans-serif"
        context.fillStyle = text
        context.fillText((mode == 0) ? data["AutoInnerSuccess"] : data["InnerSuccess"], leftX + 100, 610)
        context.fillText((mode == 0) ? data["AutoOuterSuccess"] : data["OuterSuccess"], leftX + 100, 810)
        context.fillText((mode == 0) ? data["AutoLowerSuccess"] : data["LowerSuccess"], leftX + 100, 1010)
        context.fillText((mode == 0) ? data["AutoUpperFailures"] : data["UpperFailures"], leftX + 300, 710)
        context.fillText((mode == 0) ? data["AutoLowerFailures"] : data["LowerFailures"], leftX + 300, 1010)
    }

    // Render control panel
    if ("AllianceColor" in data && mode == 1) {
        // Switcher buttons
        centerX = (data["AllianceColor"] == 0) ? 1700 : 1300
        centerY = (data["AllianceColor"] == 0) ? 100 : 1500

        // Rotation
        context.beginPath()
        context.arc(centerX - 100, centerY, 50, 0, -0.5 * Math.PI)
        context.moveTo(centerX - 120, centerY - 28)
        context.lineTo(centerX - 100, centerY - 48)
        context.lineTo(centerX - 120, centerY - 68)
        context.stroke()

        // Lower right quadrant
        context.fillStyle = controlRed
        context.beginPath()
        context.moveTo(centerX + 100, centerY)
        context.lineTo(centerX + 160, centerY)
        context.arc(centerX + 100, centerY, 60, 0, 0.5 * Math.PI)
        context.closePath()
        context.fill()
        context.stroke()

        // Lower left quadrant
        context.fillStyle = controlYellow
        context.beginPath()
        context.moveTo(centerX + 100, centerY)
        context.lineTo(centerX + 100, centerY - 60)
        context.arc(centerX + 100, centerY, 60, 0.5 * Math.PI, Math.PI)
        context.closePath()
        context.fill()
        context.stroke()

        // Upper left quadrant
        context.fillStyle = controlBlue
        context.beginPath()
        context.moveTo(centerX + 100, centerY)
        context.lineTo(centerX + 60, centerY)
        context.arc(centerX + 100, centerY, 60, Math.PI, 1.5 * Math.PI)
        context.closePath()
        context.fill()
        context.stroke()

        // Upper right quadrant
        context.fillStyle = controlGreen
        context.beginPath()
        context.moveTo(centerX + 100, centerY)
        context.lineTo(centerX + 100, centerY + 60)
        context.arc(centerX + 100, centerY, 60, 1.5 * Math.PI, 2 * Math.PI)
        context.closePath()
        context.fill()
        context.stroke()

        // Highlight circle
        context.fillStyle = controlHighlight
        context.beginPath()
        context.arc(centerX + ((controlRotationSelected) ? -100 : 100), centerY, 90, 0, 2 * Math.PI)
        context.globalAlpha = 0.6
        context.fill()
        context.globalAlpha = 1
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

    if (("AllianceColor" in data) ? data["AllianceColor"] == 1 : true) {
        drawFigure((mode == 0) ? 100 : 350, 325, leftColor, ponytails[0], (mode == 0) ? 1 : 2)
        drawFigure((mode == 0) ? 100 : 350, 800, leftColor, ponytails[1], (mode == 0) ? 1 : 2)
        drawFigure((mode == 0) ? 100 : 350, 1275, leftColor, ponytails[2], (mode == 0) ? 1 : 2)
    }
    if (("AllianceColor" in data) ? data["AllianceColor"] == 0 : true) {
        drawFigure((mode == 0) ? 2900 : 2650, 325, rightColor, ponytails[3], (mode == 0) ? 1 : 0)
        drawFigure((mode == 0) ? 2900 : 2650, 800, rightColor, ponytails[4], (mode == 0) ? 1 : 0)
        drawFigure((mode == 0) ? 2900 : 2650, 1275, rightColor, ponytails[5], (mode == 0) ? 1 : 0)
    }
}
render()

buttonManager.addButton("StartLeft0", new Button(675, 1000, 150, 400, function () {
    if (mode == 0) {
        data["AllianceColor"] = 0
        data["StartPos"] = 0
        render()
    }
}))

buttonManager.addButton("StartLeft1", new Button(675, 600, 150, 400, function () {
    if (mode == 0) {
        data["AllianceColor"] = 0
        data["StartPos"] = 1
        render()
    }
}))

buttonManager.addButton("StartLeft2", new Button(675, 200, 150, 400, function () {
    if (mode == 0) {
        data["AllianceColor"] = 0
        data["StartPos"] = 2
        render()
    }
}))

buttonManager.addButton("StartRight0", new Button(2175, 200, 150, 400, function () {
    if (mode == 0) {
        data["AllianceColor"] = 1
        data["StartPos"] = 0
        render()
    }
}))

buttonManager.addButton("StartRight1", new Button(2175, 600, 150, 400, function () {
    if (mode == 0) {
        data["AllianceColor"] = 1
        data["StartPos"] = 1
        render()
    }
}))

buttonManager.addButton("StartRight2", new Button(2175, 1000, 150, 400, function () {
    if (mode == 0) {
        data["AllianceColor"] = 1
        data["StartPos"] = 2
        render()
    }
}))

buttonManager.addButton("CrossedLineLeft", new Button(600, 0, 300, 200, function () {
    if (mode == 0 && "AllianceColor" in data) {
        if (data["AllianceColor"] == 0) {
            data["CrossedLine"] = 1 - data["CrossedLine"]
            render()
        }
    }
}))

buttonManager.addButton("CrossedLineRight", new Button(2100, 0, 300, 200, function () {
    if (mode == 0 && "AllianceColor" in data) {
        if (data["AllianceColor"] == 1) {
            data["CrossedLine"] = 1 - data["CrossedLine"]
            render()
        }
    }
}))

buttonManager.addButton("LeftInnerSuccess", new Button(25, 500, 200, 200, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 0) {
            addToDataLog()
            recordTime()
            if (mode == 0) {
                data["AutoInnerSuccess"]++
            } else {
                data["InnerSuccess"]++
            }
            render()
        }
    }
}))

buttonManager.addButton("LeftOuterSuccess", new Button(25, 700, 200, 200, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 0) {
            addToDataLog()
            recordTime()
            if (mode == 0) {
                data["AutoOuterSuccess"]++
            } else {
                data["OuterSuccess"]++
            }
            render()
        }
    }
}))

buttonManager.addButton("LeftLowerSuccess", new Button(25, 900, 200, 200, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 0) {
            addToDataLog()
            if (mode == 0) {
                data["AutoLowerSuccess"]++
            } else {
                data["LowerSuccess"]++
            }
            render()
        }
    }
}))

buttonManager.addButton("LeftUpperFailures", new Button(225, 500, 200, 400, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 0) {
            addToDataLog()
            recordTime()
            if (mode == 0) {
                data["AutoUpperFailures"]++
            } else {
                data["UpperFailures"]++
            }
            render()
        }
    }
}))

buttonManager.addButton("LeftLowerFailures", new Button(225, 900, 200, 200, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 0) {
            addToDataLog()
            if (mode == 0) {
                data["AutoLowerFailures"]++
            } else {
                data["LowerFailures"]++
            }
            render()
        }
    }
}))

buttonManager.addButton("RightInnerSuccess", new Button(2575, 500, 200, 200, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 1) {
            addToDataLog()
            recordTime()
            if (mode == 0) {
                data["AutoInnerSuccess"]++
            } else {
                data["InnerSuccess"]++
            }
            render()
        }
    }
}))

buttonManager.addButton("RightOuterSuccess", new Button(2575, 700, 200, 200, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 1) {
            addToDataLog()
            recordTime()
            if (mode == 0) {
                data["AutoOuterSuccess"]++
            } else {
                data["OuterSuccess"]++
            }
            render()
        }
    }
}))

buttonManager.addButton("RightLowerSuccess", new Button(2575, 900, 200, 200, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 1) {
            addToDataLog()
            if (mode == 0) {
                data["AutoLowerSuccess"]++
            } else {
                data["LowerSuccess"]++
            }
            render()
        }
    }
}))

buttonManager.addButton("RightUpperFailures", new Button(2775, 500, 200, 400, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 1) {
            addToDataLog()
            recordTime()
            if (mode == 0) {
                data["AutoUpperFailures"]++
            } else {
                data["UpperFailures"]++
            }
            render()
        }
    }
}))

buttonManager.addButton("RightLowerFailures", new Button(2775, 900, 200, 200, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 1) {
            addToDataLog()
            if (mode == 0) {
                data["AutoLowerFailures"]++
            } else {
                data["LowerFailures"]++
            }
            render()
        }
    }
}))

buttonManager.addButton("TopRotationSelect", new Button(1500, 0, 200, 200, function () {
    if ("AllianceColor" in data && mode == 1) {
        if (data["AllianceColor"] == 0) {
            controlRotationSelected = true
            render()
        }

    }
}))

buttonManager.addButton("TopPositionSelect", new Button(1700, 0, 200, 200, function () {
    if ("AllianceColor" in data && mode == 1) {
        if (data["AllianceColor"] == 0) {
            controlRotationSelected = false
            render()
        }

    }
}))

buttonManager.addButton("BottomRotationSelect", new Button(1100, 1400, 200, 200, function () {
    if ("AllianceColor" in data && mode == 1) {
        if (data["AllianceColor"] == 1) {
            controlRotationSelected = true
            render()
        }

    }
}))

buttonManager.addButton("BottomPositionSelect", new Button(1300, 1400, 200, 200, function () {
    if ("AllianceColor" in data && mode == 1) {
        if (data["AllianceColor"] == 1) {
            controlRotationSelected = false
            render()
        }

    }
}))

buttonManager.addButton("TopControlAttempted", new Button(1400, 200, 300, 300, function () {
    if ("AllianceColor" in data && mode == 1) {
        if (data["AllianceColor"] == 0) {
            field = (controlRotationSelected) ? "WheelRotationAttempted" : "WheelPositionAttempted"
            data[field] = 1 - data[field]
            render()
        }
    }
}))

buttonManager.addButton("TopControlSuccess", new Button(1700, 200, 300, 300, function () {
    if ("AllianceColor" in data && mode == 1) {
        if (data["AllianceColor"] == 0) {
            field = (controlRotationSelected) ? "WheelRotationSuccess" : "WheelPositionSuccess"
            data[field] = 1 - data[field]
            render()
        }
    }
}))

buttonManager.addButton("BottomControlAttempted", new Button(1000, 1100, 300, 300, function () {
    if ("AllianceColor" in data && mode == 1) {
        if (data["AllianceColor"] == 1) {
            field = (controlRotationSelected) ? "WheelRotationAttempted" : "WheelPositionAttempted"
            data[field] = 1 - data[field]
            render()
        }
    }
}))

buttonManager.addButton("BottomControlSuccess", new Button(1300, 1100, 300, 300, function () {
    if ("AllianceColor" in data && mode == 1) {
        if (data["AllianceColor"] == 1) {
            field = (controlRotationSelected) ? "WheelRotationSuccess" : "WheelPositionSuccess"
            data[field] = 1 - data[field]
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