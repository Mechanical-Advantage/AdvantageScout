// canvas object in variable 'canvas'
// width = 3000px, height = 1600px
var context = canvas.getContext("2d")
var buttonManager = new ButtonManager(canvas)
var ch_color = "#0000FF"

function render() {
    context.clearRect(0, 0, 3000, 1600)
    context.fillStyle = "#FF0000"
    context.fillRect(100, 100, 300, 300)
    context.fillStyle = ch_color
    context.fillRect(1300, 600, 400, 400)
    context.beginPath()
    context.moveTo(750,700)
    context.lineTo(1100,700)
    context.lineWidth = 500
    context.stroke()
    
}
render()

buttonManager.addButton("testButton", new Button(100, 100, 300, 300, function() {
                                                 alert("You clicked the button!")
                                                 }))
// buttonManager.addButton("testButton3", new Button(750, 450, 500, 400, function() {
// alert("Pi is the number you get when oyu divide the circumferene of a circle by its diameter. It starts with 3.14")
// }))

                                    
buttonManager.addButton("testButton2", new Button(1300, 600, 400, 400, function() {
                                                   
                                                    ch_color = "#FFFF00"
                                                    render();
                                                    }))




