// canvas object in variable 'canvas'
// width = 3000px, height = 1600px
var context = canvas.getContext("2d")
var buttonManager = new ButtonManager(canvas)

function render() {
    context.clearRect(0, 0, 3000, 1600)
    context.fillStyle = "#FF0000"
    context.fillRect(100, 100, 300, 300)
}

buttonManager.addButton("testButton", new Button(100, 100, 300, 300, function() {
                                                 alert("You clicked the button!")
                                                 }))
render()
