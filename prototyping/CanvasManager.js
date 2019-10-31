// canvas object in variable 'canvas'
// width = 3000px, height = 1600px
var context = canvas.getContext("2d")
var buttonManager = new ButtonManager(canvas)

function render() {
    context.clearRect(0, 0, 3000, 1600)
}
render()
