// canvas object in variable 'canvas'
// alliances reversed in variable 'reverseAlliances' -> no reverse = red on right
// call uploadData() to trigger upload (required if using visual for endgame)
// width = 3000px, height = 1600px
var mode = 0 // 0 = auto, 1 = teleop, 2 = endgame
this.setMode = function (newMode) { // REQUIRED FUNCTION
    mode = newMode
    render()
}

this.getData = function () { // REQUIRED FUNCTION
    return {}
}

var context = canvas.getContext("2d")
var buttonManager = new ButtonManager(canvas)

var popupCenter = null
var successCounter = 0
var failureCounter = 0

function render() {
    context.clearRect(0, 0, 3000, 1600)
    context.textAlign = "center"
    context.textBaseline = "middle"

    context.fillStyle = "black"
    context.font = "100px sans-serif"
    context.fillText("Click anywhere!", 1500, 800)
    context.font = "60px sans-serif"
    context.fillText(successCounter.toString() + " success, " + failureCounter.toString() + " failure", 1500, 920)

    if (popupCenter != null) {
        context.strokeStyle = "black"
        context.font = "120px sans-serif"

        context.lineWidth = 5
        context.fillStyle = "green"
        context.fillRect(popupCenter[0] - 100, popupCenter[1] - 250, 200, 200)
        context.strokeRect(popupCenter[0] - 100, popupCenter[1] - 250, 200, 200)
        context.fillStyle = "black"
        context.fillText(successCounter, popupCenter[0], popupCenter[1] - 150)

        context.fillStyle = "red"
        context.fillRect(popupCenter[0] - 100, popupCenter[1] + 50, 200, 200)
        context.strokeRect(popupCenter[0] - 100, popupCenter[1] + 50, 200, 200)
        context.fillStyle = "black"
        context.fillText(failureCounter, popupCenter[0], popupCenter[1] + 150)
    }
}
render()

canvas.addEventListener("click", event => {
    var rect = canvas.getBoundingClientRect();
    var x = (event.clientX - rect.left) / rect.width * canvas.width
    var y = (event.clientY - rect.top) / rect.height * canvas.height

    if (popupCenter == null) { // No popup, create it
        popupCenter = [x, y]
    } else { // There's a popup, did the user press a button?
        if ((popupCenter[0] - 100 < x) && (x < popupCenter[0] + 100)) {
            if ((popupCenter[1] - 250 < y) && (y < popupCenter[1] - 50)) { // Success button
                successCounter++
            }
            if ((popupCenter[1] + 50 < y) && (y < popupCenter[1] + 250)) { // Failure button
                failureCounter++
            }
        }
        popupCenter = null // Clear popup
    }
    render()
})