// canvas object in variable 'canvas'
// width = 3000px, height = 1600px
var context = canvas.getContext("2d")
var buttonManager = new ButtonManager(canvas)
var green = "#41d936" 
function render() {
    //hoop points
    context.clearRect(0, 0, 3000, 1600)
    context.fillStyle = green
    context.rect(100, 100, 200, 400) //1
    context.fillRect(100, 100, 200, 400) //1

    context.rect(100, 600, 200, 400) //2
    context.fillRect(100, 600, 200, 400) //2

    context.rect(100, 1100, 200, 400) //3
    context.fillRect(100, 1100, 200, 400) //3
    
    context.rect(300, 100, 200, 400)//1.5
    context.rect(300, 600, 200, 400)//2.5
    context.rect(300, 1100, 200, 400)//3.5
    //first button divider
    context.moveTo(300, 100)
    context.lineTo(300, 500)

    //second button divider
    context.moveTo(300, 600)
    context.lineTo(300, 1000)

    //third button divider
    context.moveTo(300, 1100)
    context.lineTo(300, 1500)

    context.lineWidth = 10
    context.stroke()

}

render()
