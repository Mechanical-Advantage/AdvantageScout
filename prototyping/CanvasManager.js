// canvas object in variable 'canvas'
// width = 3000px, height = 1600px
var context = canvas.getContext("2d")
var buttonManager = new ButtonManager(canvas)
const green = "#41d936"
const red = "red" 
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
    UpperTelopSuccess:0,
    MidTeleopSuccess:0,
    LowerTeleopSuccess:0,
    UpperTeleopFail:0,
    MidTeleopFail:0,
    LowerTeleopFail:0
}
function render() {
    //hoop points
    context.clearRect(0, 0, 3000, 1600)
    context.fillStyle = green
    // Successful shots (green rectangle)
    context.rect(100, 100, 200, 400) //1
    context.fillRect(100, 100, 200, 400) //1
    context.rect(100, 600, 200, 400) //2    
    context.fillRect(100, 600, 200, 400) //2
    context.rect(100, 1100, 200, 400) //3
    context.fillRect(100, 1100, 200, 400) //3

    // Text Counter 
    context.fillStyle = "black" 
    context.font = "150px Frutiger"
    context.textBaseline = "middle"
    context.textAlign = "center";
    context.fillText(data.UpperAutoSuccess, 200,300)
    
    // Failed Shots (red rectangle)
    context.fillStyle = red
    context.rect(300, 100, 200, 400)
    context.fillRect(300, 100, 200, 400)
    context.rect(300, 600, 200, 400)
    context.fillRect(300, 600, 200, 400)
    context.rect(300, 1100, 200, 400)
    context.fillRect(300, 1100, 200, 400)
  
    context.lineWidth = 10
    context.stroke()

    // Key
    context.beginPath()
    context.arc(730,800,500, Math.PI/2, -Math.PI/2, true)
    context.stroke()
    context.moveTo(730,300)
    context.lineTo(730,1300)
    context.fill()
    context.stroke()

    
    // Key squares


    if (auto){
    context.fillStyle = (data.LocationOfRobot == 1 ? lightRed : red)
    context.rect(730,300, 250,333)
    context.fillRect(730,300, 250,333)//1
    context.fillStyle = (data.LocationOfRobot == 2 ? lightRed : red)
    context.rect(980,300,250,333)
    context.fillRect(980,300,250,333)//2
    context.fillStyle = (data.LocationOfRobot == 3 ? lightRed : red)
    context.rect(730,633, 250,333)
    context.fillRect(730,633, 250,333)//3
    context.fillStyle = (data.LocationOfRobot == 4 ? lightRed : red)
    context.rect(980,633,250,333)
    context.fillRect(980,633,250,333)//4
    context.fillStyle = (data.LocationOfRobot == 5 ? lightRed : red)
    context.rect(730,966,250,333)
    context.fillRect(730,966,250,333)//5
    context.fillStyle = (data.LocationOfRobot == 6 ? lightRed : red)
    context.rect(980,966,250,333)
    context.fillRect(980,966,250,333)//6
    }

    
    context.stroke()
 


}

buttonManager.addButton("Location 1", new Button(730,300,250,333, function(){
    data.LocationOfRobot = 1
    render()
}))
buttonManager.addButton("Location 2", new Button(980,300,250,333, function(){
    data.LocationOfRobot = 2
    render()
}))
buttonManager.addButton("Location 3", new Button(730,633,250,333, function(){
    data.LocationOfRobot = 3
    render()
}))
buttonManager.addButton("Location 4", new Button(980,633,250,333, function(){
    data.LocationOfRobot = 4
    render()
}))
buttonManager.addButton("Location 5", new Button(730,966,250,333, function(){
    data.LocationOfRobot = 5
    render()
}))
buttonManager.addButton("Location 6", new Button(980,966,250,333, function(){
    data.LocationOfRobot = 6
    render()
}))
buttonManager.addButton("Success Upper", new Button(100, 100, 200, 400, function(){
    data.UpperAutoSuccess += 1
    render()
}))


render()
