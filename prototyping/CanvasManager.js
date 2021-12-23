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

    // Failed Shots (red rectangle)
    context.fillStyle = red
    context.rect(300, 100, 200, 400)
    context.fillRect(300, 100, 200, 400)
    context.rect(300, 600, 200, 400)
    context.fillRect(300, 600, 200, 400)
    context.rect(300, 1100, 200, 400)
    context.fillRect(300, 1100, 200, 400)

    // Text Counter 
    context.fillStyle = "black" 
    context.font = "120px Frutiger"
    context.textBaseline = "middle"
    context.textAlign = "center";
    
    //text numbers
    context.fillText(auto ? data.UpperAutoSuccess : data.UpperTeleopSuccess, 200,300)
    context.fillText(auto ? data.MidAutoSuccess : data.MidTeleopSuccess, 200,800)
    context.fillText(auto ? data.LowerAutoSuccess : data.LowerTeleopSuccess, 200,1300)
    

  
    context.lineWidth = 10
    context.stroke()
    //more text numbers
    context.fillText(auto ? data.UpperAutoFail : data.UpperTeleopFail, 400,300)
    context.fillText(auto ? data.MidAutoFail : data.MidTeleopFail, 400,800)
    context.fillText(auto ? data.LowerAutoFail : data.LowerTeleopFail, 400,1300)

    // Left Key Semicircle
    context.fillStyle = red

    context.beginPath()
    context.arc(730,800,500, Math.PI/2, -Math.PI/2, true)
    context.moveTo(730,300)
    context.lineTo(730,1300)
    context.fill()

    context.fillStyle = blue
    // Right Key Semicircle
    context.beginPath()
    context.arc(2270, 800, 500, Math.PI/2, -Math.PI/2, false)
    context.moveTo(2270,300)
    context.lineTo(2270,1300)
    context.fill()
    // Key squares


    if (auto){
    context.beginPath()
    // Right
    
    context.fillStyle = ((data.LocationOfRobot == 1 && data.allianceType == 0) ? lightRed : red)
    context.rect(730,300, 250,333)
    context.fillRect(730,300, 250,333)//1
    context.fillStyle = ((data.LocationOfRobot == 2 && data.allianceType == 0) ? lightRed : red)
    context.rect(980,300,250,333)
    context.fillRect(980,300,250,333)//2
    context.fillStyle = ((data.LocationOfRobot == 3 && data.allianceType == 0) ? lightRed : red)
    context.rect(730,633, 250,333)
    context.fillRect(730,633, 250,333)//3
    context.fillStyle = ((data.LocationOfRobot == 4 && data.allianceType == 0) ? lightRed : red)
    context.rect(980,633,250,333)
    context.fillRect(980,633,250,333)//4
    context.fillStyle = ((data.LocationOfRobot == 5 && data.allianceType == 0) ? lightRed : red)
    context.rect(730,966,250,333)
    context.fillRect(730,966,250,333)//5
    context.fillStyle = ((data.LocationOfRobot == 6 && data.allianceType == 0) ? lightRed : red)
    context.rect(980,966,250,333)
    context.fillRect(980,966,250,333)//6

    // Left :)

    context.fillStyle = ((data.LocationOfRobot == 1 && data.allianceType == 1) ? lightBlue : blue)
    context.rect(1770,300, 250,333)
    context.fillRect(1770,300, 250,333)//1
    context.fillStyle = ((data.LocationOfRobot == 2 && data.allianceType == 1) ? lightBlue : blue)
    context.rect(2020,300,250,333)
    context.fillRect(2020,300,250,333)//2
    context.fillStyle = ((data.LocationOfRobot == 3 && data.allianceType == 1) ? lightBlue : blue)
    context.rect(1770,633, 250,333)
    context.fillRect(1770,633, 250,333)//3
    context.fillStyle = ((data.LocationOfRobot == 4 && data.allianceType == 1) ? lightBlue : blue)
    context.rect(2020,633,250,333)
    context.fillRect(2020,633,250,333)//4
    context.fillStyle = ((data.LocationOfRobot ==5 && data.allianceType == 1) ? lightBlue : blue)
    context.rect(1770,966,250,333)
    context.fillRect(1770,966,250,333)//5
    context.fillStyle = ((data.LocationOfRobot == 6 && data.allianceType == 1) ? lightBlue : blue)
    context.rect(2020,966,250,333)
    context.fillRect(2020,966,250,333)//6
    context.stroke()
    }

    // Left Key Semicircle
    context.beginPath()
    context.arc(730,800,500, Math.PI/2, -Math.PI/2, true)
    context.moveTo(730,300)
    context.lineTo(730,1300)
    context.stroke()

    // Right Key Semicircle
    context.beginPath()
    context.arc(2270, 800, 500, Math.PI/2, -Math.PI/2, false)
    context.moveTo(2270,300)
    context.lineTo(2270,1300)
    context.stroke()
}

//location buttons
buttonManager.addButton("leftLocation1", new Button(730,300,250,333, function(){
    data.LocationOfRobot = 1
    data.allianceType = 0
    render()
}))
buttonManager.addButton("leftLocation2", new Button(980,300,250,333, function(){
    data.LocationOfRobot = 2
    data.allianceType = 0
    render()
}))
buttonManager.addButton("leftLocation3", new Button(730,633,250,333, function(){
    data.LocationOfRobot = 3
    data.allianceType = 0
    render()
}))
buttonManager.addButton("leftLocation4", new Button(980,633,250,333, function(){
    data.LocationOfRobot = 4
    data.allianceType = 0
    render()
}))
buttonManager.addButton("leftLocation5", new Button(730,966,250,333, function(){
    data.LocationOfRobot = 5
    data.allianceType = 0
    render()
}))
buttonManager.addButton("leftLocation6", new Button(980,966,250,333, function(){
    data.LocationOfRobot = 6
    data.allianceType = 0
    render()
}))


//more location buttons
buttonManager.addButton("rightLocation1", new Button(1770,300,250,333, function(){
    data.LocationOfRobot = 1
    data.allianceType = 1
    render()
}))
buttonManager.addButton("rightLocation2", new Button(2020,300,250,333, function(){
    data.LocationOfRobot = 2
    data.allianceType = 1
    render()
}))
buttonManager.addButton("rightLocation3", new Button(1770,633,250,333, function(){
    data.LocationOfRobot = 3
    data.allianceType = 1
    render()
}))
buttonManager.addButton("rightLocation4", new Button(2020,633,250,333, function(){
    data.LocationOfRobot = 4
    data.allianceType = 1
    render()
}))
buttonManager.addButton("rightLocation5", new Button(1770,966,250,333, function(){
    data.LocationOfRobot = 5
    data.allianceType = 1
    render()
}))
buttonManager.addButton("rightLocation6", new Button(2020,966,250,333, function(){
    data.LocationOfRobot = 6
    data.allianceType = 1
    render()
}))
//buttons for scoring
buttonManager.addButton("Success Upper", new Button(100, 100, 200, 400, function(){
    if (auto == true){
        data.UpperAutoSuccess += 1
    }

    if (auto == false){
        data.UpperTeleopSuccess += 1
    }
    render()
}))
buttonManager.addButton("Success Mid", new Button (100, 600, 200, 400, function(){
    if (auto == true){
        data.MidAutoSuccess += 1
    }

    if (auto == false){
        data.MidTeleopSuccess += 1
    }
    render()
}))
buttonManager.addButton("Success Lower", new Button (100, 1100, 200, 400, function(){
    if (auto == true){
        data.LowerAutoSuccess += 1
    }

    if (auto == false){
        data.LowerTeleopSuccess += 1
    }
    render()
}))

buttonManager.addButton("Fails Upper", new Button(300, 100, 200, 400, function(){
    if (auto == true){
        data.UpperAutoFail += 1
    }

    if (auto == false){
        data.UpperTeleopFail += 1
    }
    render()
}))
buttonManager.addButton("Fails Mid", new Button (300, 600, 200, 400, function(){
    if (auto == true){
        data.MidAutoFail += 1
    }

    if (auto == false){
        data.MidTeleopFail += 1
    }
    render()
}))
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
