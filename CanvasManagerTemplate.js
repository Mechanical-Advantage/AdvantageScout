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
    return data
}

var context = canvas.getContext("2d")
var buttonManager = new ButtonManager(canvas)
var data = {}

function render() {
    context.clearRect(0, 0, 3000, 1600)
}
render()
