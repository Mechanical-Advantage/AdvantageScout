// canvas object in variable 'canvas'
// alliances reversed in variable 'reverseAlliances' -> no reverse = red on right
// width = 3000px, height = 1600px
var mode = 0 // 0 = auto, 1 = teleop, 2 = endgame
this.setMode = function (newMode) { // REQUIRED FUNCTION
    mode = newMode
    render()
}
this.getData = function () { // REQUIRED FUNCTION
    return data
}
function uploadData() { // Closes scouting interface and saves data (if using visual for end game, must have a call to this function)
    appManager.scoutManager.upload()
}

var context = canvas.getContext("2d")
var buttonManager = new ButtonManager(canvas)
var data = {
    "AllianceColor": 0,
    "StartPos": 0,
    "CrossedLine": 1,
    "AutoInnerSuccess": 0,
    "AutoOuterSuccess": 0,
    "AutoLowerSuccess": 0,
    "AutoUpperFailures": 0,
    "AutoLowerFailures": 0,
    "InnerSuccess": 0,
    "OuterSuccess": 0,
    "LowerSuccess": 0,
    "UpperFailures": 0,
    "LowerFailures": 0
}
var controlRotationSelected = true

// Color definitions
var leftColor = (reverseAlliances) ? "#ff0000" : "#0000de"
var rightColor = (reverseAlliances) ? "#0000de" : "#ff0000"
var leftHighlightColor = (reverseAlliances) ? "#ff7575" : "#6666ff"
var rightHighlightColor = (reverseAlliances) ? "#6666ff" : "#ff7575"
var outline = "#000000"
var fieldBackground = "#d1d1d1"
var text = "#000000"
var success = "#00d936"
var failure = "#b30000"
var controlHighlight = "#fff533"
var controlBlue = "#00ffff"
var controlGreen = "#00ff00"
var controlRed = "#ff0000"
var controlYellow = "#ffff00"

function render() {
    context.clearRect(0, 0, 3000, 1600)

    // Draw field background
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

    // Draw upper control panel
    context.fillStyle = rightColor
    context.fillRect(1400, 200, 600, 300)
    context.strokeRect(1400, 200, 600, 300)
    context.beginPath()
    context.moveTo(1700, 200)
    context.lineTo(1700, 500)
    context.stroke()

    // Draw lower control panel
    context.fillStyle = leftColor
    context.fillRect(1000, 1100, 600, 300)
    context.strokeRect(1000, 1100, 600, 300)
    context.beginPath()
    context.moveTo(1300, 1100)
    context.lineTo(1300, 1400)
    context.stroke()

    // Draw control panel text
    if ("AllianceColor" in data) {
        centerX = (data["AllianceColor"] == 0) ? 1700 : 1300
        centerY = (data["AllianceColor"] == 0) ? 350 : 1250

        context.textAlign = "center"
        context.textBaseline = "middle"
        context.fillStyle = text
        context.font = "130px sans-serif"
    }

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

    // Write control panel text
    if ("AllianceColor" in data) {
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
}
render()