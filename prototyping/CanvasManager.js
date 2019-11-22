// canvas object in variable 'canvas'
// width = 3000px, height = 1600px
var context = canvas.getContext("2d")
var buttonManager = new ButtonManager(canvas)
var Changecolor = "#0000FF" 
function render() {
    context.clearRect(0, 0, 3000, 1600)
    context.fillStyle = "#FF0000"
    context.fillRect(100, 100, 300, 300)
    context.fillStyle = Changecolor
    context.fillRect(1300, 600, 400, 400)
    context.beginPath()
    context.moveTo(500, 500)
    context.lineTo(500, 700)
    context.moveTo(600, 500)
    context.lineTo(600, 700)
    context.moveTo(400, 500)
    context.lineTo(700, 500)
    context.lineWidth = 10
    context.stroke()

}

buttonManager.addButton("testButton", new Button(100, 100, 300, 300, function() {
                                                 alert("You clicked the button!")
                                                 }))
buttonManager.addButton("TestButton2", new Button(1300, 600, 400, 400, function() {    
    Changecolor = "#FFFF00"
    render()
    alert("something amuzing")
}))
buttonManager.addButton("TestButton3", new Button(400, 500, 200, 200, function() {
    alert("This is pi")
}))
render()
