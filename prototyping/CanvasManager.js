// canvas object in variable 'canvas'
// width = 3000px, height = 1600px
var context = canvas.getContext("2d")
var buttonManager = new ButtonManager(canvas)
const green = "#41d936"
const red = "red" 
const blue = "blue"
const auto = true
const lightRed = "lightcoral"
const lightBlue = "lightskyblue"

var data = {
    LocationOfRobot:null,
    AllianceType:null,
    UpperAutoSuccess:0,
    MidAutoSuccess:0,
    LowerAutoSuccess:0,
    UpperAutoFail:0,
    MidAutoFail:0,
    LowerAutoFail:0,
    UpperTeleopSuccess:0,
    MidTeleopSuccess:0,
    LowerTeleopSuccess:0,
    UpperTeleopFail:0,
    MidTeleopFail:0,
    LowerTeleopFail:0
}
function render() {
    // left hanger
    context.clearRect(0, 0, 3000, 1600)
    context.fillStyle = red
    context.lineStyle = red
    context.lineWidth = 10
    context.rect(0, 0, 600, 570)
    context.strokeStyle = "gray"
    context.stroke()
    context.beginPath()
    context.lineStyle = red
    context.moveTo(180, 0)
    context.lineTo(180, 570)
    context.moveTo(300, 0)
    context.lineTo(300, 570)
    context.moveTo(430, 0)
    context.lineTo(430, 570)
    context.moveTo(600, 0)
    context.lineTo(600, 570)
    context.strokeStyle = red
    context.stroke()

    // right hanger
    context.fillStyle = blue
    context.lineStyle = blue
    context.rect(2400, 1030, 600, 570)
    context.strokeStyle = "gray"
    context.stroke()
    context.beginPath()
    context.lineStyle = blue
    context.moveTo(2820, 1030)
    context.lineTo(2820, 1600)
    context.moveTo(2700, 1030)
    context.lineTo(2700, 1600)
    context.moveTo(2570, 1030)
    context.lineTo(2570, 1600)
    context.moveTo(2400, 1030)
    context.lineTo(2400, 1600)
    context.strokeStyle = blue
    context.stroke()

    //bottom corner
    context.beginPath()
    context.moveTo(0, 1300)
    context.lineTo(300, 1600)
    context.strokeStyle = "gray"
    context.stroke()

    //top corner
    context.beginPath()
    context.moveTo(2700, 0)
    context.lineTo(3000, 300)
    context.stroke()

    //center hub square
}

buttonManager.addButton("Fails Lower", new Button (300, 1100, 200, 400, function(){
    if (auto == true){
        data.LowerAutoFail += 1
    }

    if (auto == false){
        data.LowerTeleopFail += 1
    }
    render()
}))
render()
