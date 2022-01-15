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

this.getData = function () { // REQUIRED FUNCTION
    toSend = jsonCopy(data)
    if (!("AllianceColor" in data)) {
        toSend["AllianceColor"] = 0
    } else if (reverseAlliances) {
        toSend["AllianceColor"] = 1 - toSend["AllianceColor"]
    }
    return toSend
}

function jsonCopy(original) {
    return JSON.parse(JSON.stringify(original))
}

var context = canvas.getContext("2d")
var buttonManager = new ButtonManager(canvas)
var data = {
    "AutoL1Success": 0,
    "AutoL2Success": 0,
    "AutoL3Success": 0,
    "AutoL1Failures": 0,
    "AutoL2Failures": 0,
    "AutoL3Failures": 0,
    "L1Success": 0,
    "L2Success": 0,
    "L3Success": 0,
    "L1Failures": 0,
    "L2Failures": 0,
    "L3Failures": 0,
    "CrossedRamps": 0
}
var dataLog = []

function addToDataLog() {
    dataLog.push(jsonCopy(data))
}

// Color definitions
var leftColor = (reverseAlliances) ? "#ff0000" : "#0000de"
var rightColor = (reverseAlliances) ? "#0000de" : "#ff0000"
var leftHighlightColor = (reverseAlliances) ? "#ff7575" : "#6666ff"
var rightHighlightColor = (reverseAlliances) ? "#6666ff" : "#ff7575"
var outline = "#000000"
var centerBalance = "#ffffff"
var fieldBackground = "#d1d1d1"
var text = "#000000"
var textWhite = "#ffffff"
var success = "#00d936"
var failure = "#b30000"

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
    context.lineWidth = 5
    context.strokeStyle = outline

    function setFieldPath() {
        context.beginPath()
        context.moveTo(450, 200)
        context.lineTo(450, 1400)
        context.lineTo(2550, 1400)
        context.lineTo(2550, 200)
        context.closePath()
        context.fillStyle = fieldBackground
    }
    setFieldPath()
    context.fill()

    // Draw center line
    context.beginPath()
    context.moveTo(1500, 200)
    context.lineTo(1500, 1400)
    context.stroke()

    // Draw center balance
    context.fillStyle = centerBalance
    context.fillRect(1350, 700, 300, 200)
    context.strokeRect(1350, 700, 300, 200)

    // Draw right alliance balance
    context.fillStyle = data["CrossedRamps"] ? rightHighlightColor : rightColor
    context.beginPath()
    context.moveTo(1350, 200)
    context.lineTo(1350, 400)
    context.lineTo(2550, 400)
    context.lineTo(2550, 385)
    context.lineTo(1650, 385)
    context.lineTo(1650, 200)
    context.fill()
    context.stroke()

    // Draw left alliance balance
    context.fillStyle = data["CrossedRamps"] ? leftHighlightColor : leftColor
    context.beginPath()
    context.moveTo(1650, 1400)
    context.lineTo(1650, 1200)
    context.lineTo(450, 1200)
    context.lineTo(450, 1215)
    context.lineTo(1350, 1215)
    context.lineTo(1350, 1400)
    context.fill()
    context.stroke()

    // Draw right alliance key (on the left)
    context.fillStyle = rightColor
    context.beginPath()
    context.moveTo(450, 500)
    context.lineTo(900, 500)
    context.arc(900, 800, 300, -Math.PI / 2, Math.PI / 2, false)
    context.lineTo(450, 1100)
    context.fill()
    context.stroke()
    context.fillStyle = fieldBackground
    context.fillRect(550, 515, 350, 570)
    context.strokeRect(550, 515, 350, 570)

    // Draw left alliance key (on the right)
    context.fillStyle = leftColor
    context.beginPath()
    context.moveTo(2550, 500)
    context.lineTo(2100, 500)
    context.arc(2100, 800, 300, -Math.PI / 2, Math.PI / 2, true)
    context.lineTo(2550, 1100)
    context.fill()
    context.stroke()
    context.fillStyle = fieldBackground
    context.fillRect(2100, 515, 350, 570)
    context.strokeRect(2100, 515, 350, 570)

    // Draw starting positions
    if (mode == 0) {
        context.strokeStyle = outline
        context.fillStyle = rightColor
        context.fillRect(900, 500, 300, 600)
        context.fillStyle = leftColor
        context.fillRect(1800, 500, 300, 600)

        // Highlight
        if ("StartPos" in data) {
            context.fillStyle = (data["AllianceColor"] == 0) ? rightHighlightColor : leftHighlightColor
            if (data["AllianceColor"] == 0) {
                context.fillRect(900, 900 - data["StartPos"] * 200, 300, 200)
            } else {
                context.fillRect(1800, 500 + data["StartPos"] * 200, 300, 200)
            }
        }

        // Left outline
        context.strokeRect(900, 500, 300, 200)
        context.strokeRect(900, 700, 300, 200)
        context.strokeRect(900, 900, 300, 200)

        // Right outline
        context.strokeRect(1800, 500, 300, 200)
        context.strokeRect(1800, 700, 300, 200)
        context.strokeRect(1800, 900, 300, 200)
    }

    // Draw field outline
    setFieldPath()
    context.stroke()

    // Draw scoring area
    if ("AllianceColor" in data) {
        leftX = (data["AllianceColor"] == 0) ? 25 : 2575
        context.fillStyle = success
        context.fillRect(leftX, 200, 175, 350)
        context.fillRect(leftX, 625, 175, 350)
        context.fillRect(leftX, 1050, 175, 350)
        context.strokeRect(leftX, 200, 175, 350)
        context.strokeRect(leftX, 625, 175, 350)
        context.strokeRect(leftX, 1050, 175, 350)
        context.fillStyle = failure
        context.fillRect(leftX + 225, 200, 175, 350)
        context.fillRect(leftX + 225, 625, 175, 350)
        context.fillRect(leftX + 225, 1050, 175, 350)
        context.strokeRect(leftX + 225, 200, 175, 350)
        context.strokeRect(leftX + 225, 625, 175, 350)
        context.strokeRect(leftX + 225, 1050, 175, 350)

        // Write numbers
        context.textAlign = "center"
        context.textBaseline = "middle"
        context.font = "130px sans-serif"
        context.fillStyle = text
        context.fillText((mode == 0) ? data["AutoL3Success"] : data["L3Success"], leftX + 88, 375)
        context.fillText((mode == 0) ? data["AutoL2Success"] : data["L2Success"], leftX + 88, 810)
        context.fillText((mode == 0) ? data["AutoL1Success"] : data["L1Success"], leftX + 88, 1225)
        context.fillText((mode == 0) ? data["AutoL3Failures"] : data["L3Failures"], leftX + 312, 375)
        context.fillText((mode == 0) ? data["AutoL2Failures"] : data["L2Failures"], leftX + 312, 810)
        context.fillText((mode == 0) ? data["AutoL1Failures"] : data["L1Failures"], leftX + 312, 1225)
    }

    // Undo button
    if (dataLog.length > 0) {
        context.fillStyle = "#e3e3e3"
        context.fillRect(1375, 1450, 250, 150)

        context.textBaseline = "middle"
        context.textAlign = "center"
        context.font = "70px sans-serif"
        context.fillStyle = "#000000"
        context.fillText("Undo", 1500, 1525)
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

buttonManager.addButton("StartLeft0", new Button(900, 500, 300, 200, function () {
    if (mode == 0) {
        data["AllianceColor"] = 0
        data["StartPos"] = 2
        render()
    }
}))

buttonManager.addButton("StartLeft1", new Button(900, 700, 300, 200, function () {
    if (mode == 0) {
        data["AllianceColor"] = 0
        data["StartPos"] = 1
        render()
    }
}))

buttonManager.addButton("StartLeft2", new Button(900, 900, 300, 200, function () {
    if (mode == 0) {
        data["AllianceColor"] = 0
        data["StartPos"] = 0
        render()
    }
}))

buttonManager.addButton("StartRight0", new Button(1800, 500, 300, 200, function () {
    if (mode == 0) {
        data["AllianceColor"] = 1
        data["StartPos"] = 0
        render()
    }
}))

buttonManager.addButton("StartRight1", new Button(1800, 700, 300, 200, function () {
    if (mode == 0) {
        data["AllianceColor"] = 1
        data["StartPos"] = 1
        render()
    }
}))

buttonManager.addButton("StartRight2", new Button(1800, 900, 300, 200, function () {
    if (mode == 0) {
        data["AllianceColor"] = 1
        data["StartPos"] = 2
        render()
    }
}))

buttonManager.addButton("LeftL3Success", new Button(25, 200, 175, 350, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 0) {
            addToDataLog()
            if (mode == 0) {
                data["AutoL3Success"]++
            } else {
                data["L3Success"]++
            }
            render()
        }
    }
}))

buttonManager.addButton("LeftL2Success", new Button(25, 625, 175, 350, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 0) {
            addToDataLog()
            if (mode == 0) {
                data["AutoL2Success"]++
            } else {
                data["L2Success"]++
            }
            render()
        }
    }
}))

buttonManager.addButton("LeftL1Success", new Button(25, 1050, 175, 350, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 0) {
            addToDataLog()
            if (mode == 0) {
                data["AutoL1Success"]++
            } else {
                data["L1Success"]++
            }
            render()
        }
    }
}))

buttonManager.addButton("LeftL3Failures", new Button(250, 200, 175, 350, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 0) {
            addToDataLog()
            if (mode == 0) {
                data["AutoL3Failures"]++
            } else {
                data["L3Failures"]++
            }
            render()
        }
    }
}))

buttonManager.addButton("LeftL2Failures", new Button(250, 625, 175, 350, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 0) {
            addToDataLog()
            if (mode == 0) {
                data["AutoL2Failures"]++
            } else {
                data["L2Failures"]++
            }
            render()
        }
    }
}))

buttonManager.addButton("LeftL1Failures", new Button(250, 1050, 175, 350, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 0) {
            addToDataLog()
            if (mode == 0) {
                data["AutoL1Failures"]++
            } else {
                data["L1Failures"]++
            }
            render()
        }
    }
}))

buttonManager.addButton("RightL3Success", new Button(2575, 200, 175, 350, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 1) {
            addToDataLog()
            if (mode == 0) {
                data["AutoL3Success"]++
            } else {
                data["L3Success"]++
            }
            render()
        }
    }
}))

buttonManager.addButton("RightL2Success", new Button(2575, 625, 175, 350, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 1) {
            addToDataLog()
            if (mode == 0) {
                data["AutoL2Success"]++
            } else {
                data["L2Success"]++
            }
            render()
        }
    }
}))

buttonManager.addButton("RightL1Success", new Button(2575, 1050, 175, 350, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 1) {
            addToDataLog()
            if (mode == 0) {
                data["AutoL1Success"]++
            } else {
                data["L1Success"]++
            }
            render()
        }
    }
}))

buttonManager.addButton("RightL3Failures", new Button(2800, 200, 175, 350, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 1) {
            addToDataLog()
            if (mode == 0) {
                data["AutoL3Failures"]++
            } else {
                data["L3Failures"]++
            }
            render()
        }
    }
}))

buttonManager.addButton("RightL2Failures", new Button(2800, 625, 175, 350, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 1) {
            addToDataLog()
            if (mode == 0) {
                data["AutoL2Failures"]++
            } else {
                data["L2Failures"]++
            }
            render()
        }
    }
}))

buttonManager.addButton("RightL1Failures", new Button(2800, 1050, 175, 350, function () {
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 1) {
            addToDataLog()
            if (mode == 0) {
                data["AutoL1Failures"]++
            } else {
                data["L1Failures"]++
            }
            render()
        }
    }
}))

buttonManager.addButton("CrossedRampsCenter", new Button(1350, 700, 300, 200, function () {
    data["CrossedRamps"] = !data["CrossedRamps"]
    render()
}))

buttonManager.addButton("CrossedRampsRight", new Button(1350, 200, 300, 200, function () {
    data["CrossedRamps"] = !data["CrossedRamps"]
    render()
}))

buttonManager.addButton("CrossedRampsLeft", new Button(1350, 1200, 300, 200, function () {
    data["CrossedRamps"] = !data["CrossedRamps"]
    render()
}))

buttonManager.addButton("UndoButton", new Button(1375, 1450, 250, 150, function () {
    if (dataLog.length > 0) {
        data = dataLog.pop()
        render()
    }
}))