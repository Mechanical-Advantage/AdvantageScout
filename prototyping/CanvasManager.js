// canvas object in variable 'canvas'
// width = 3000px, height = 1600px
var context = canvas.getContext("2d")
var buttonManager = new ButtonManager(canvas)
const green = "#41D936"
const red = "#FF0000"
const blue = "#0000FF"
const gray = "#D1D1D1"
const ayushDarkGray = "#A9A9A9"
const ayushLightGray = "#D3D3D3"
const auto = true
const lightRed = "lightcoral"
const lightBlue = "lightskyblue"
const deflectorsBottomRight = [1548,1051,1563,988,1521,898,1557,882,1597,974,1653,1004,1548,1051];
const defelectorsBottomLeft = [1249,848,1312,863,1402,821,1418,857,1326,897,1296,953,1249,848];
const deflectorsTopLeft = [1452,549,1437,612,1479,702,1434,718,1403,626,1347,596,1452,549];
const deflectorsTopRight = [1751,752,1688,737,1598,779,1582,743,1674,703,1704,647,1751,752]
function drawDeflectors(coordinates){
    context.beginPath()
    context.fillStyle = gray
    context.moveTo(coordinates[0], coordinates[1])
    for(i = 2; i < 14; i += 2) {
    context.lineTo(coordinates[i], coordinates[i+1])
    }
    context.closePath()
    context.fill()
    context.stroke()
}
var data = {
    LocationOfRobot: null,
    AllianceType: null,
    UpperAutoSuccess: 0,
    MidAutoSuccess: 0,
    LowerAutoSuccess: 0,
    UpperAutoFail: 0,
    MidAutoFail: 0,
    LowerAutoFail: 0,
    UpperTeleopSuccess: 0,
    MidTeleopSuccess: 0,
    LowerTeleopSuccess: 0,
    UpperTeleopFail: 0,
    MidTeleopFail: 0,
    LowerTeleopFail: 0
}
function render() {
    context.clearRect(0, 0, 3000, 1600)
    //outerbox
    context.beginPath()
    context.moveTo(300, 200)
    context.lineTo(2500, 200)
    context.lineTo(2700, 400)
    context.lineTo(2700, 1400)
    context.lineTo(500, 1400)
    context.lineTo(300, 1200)
    context.lineTo(300, 200)
    context.lineWidth = 8
    context.fillStyle = "#D1D1D1"
    context.strokeStyle = "#000000"
    context.stroke()
    // left hanger
    context.fillStyle = red
    context.lineStyle = red
    context.rect(300, 200, 460, 424)
    //context.strokeStyle = "gray"
    context.stroke()
    context.beginPath()
    context.lineStyle = red
    context.moveTo(442, 200)
    context.lineTo(442, 624)
    context.moveTo(532, 200)
    context.lineTo(532, 624)
    context.moveTo(622, 200)
    context.lineTo(622, 624)
    context.moveTo(760, 200)
    context.lineTo(760, 624)
    context.strokeStyle = red
    context.lineWidth = 10
    context.stroke()
    // right hanger
    context.fillStyle = blue
    context.lineStyle = blue
    context.rect(2210, 976, 490, 424)
    context.strokeStyle = "gray"
    context.stroke()
    context.beginPath()
    context.lineStyle = blue
    context.moveTo(2558, 976)
    context.lineTo(2558, 1400)
    context.moveTo(2468, 976)
    context.lineTo(2468, 1400)
    context.moveTo(2378, 976)
    context.lineTo(2378, 1400)
    context.moveTo(2210, 976)
    context.lineTo(2210, 1400)
    context.strokeStyle = blue
    context.stroke()
    //center line
    context.beginPath()
    context.moveTo(1235, 200)
    context.lineTo(1765, 1400)
    context.stroke()
    //center hub square
    context.strokeStyle = "gray"
    context.fillStyle = ayushLightGray
    context.translate(1427, 641)
    context.rotate(21 * Math.PI / 180)
    context.fillRect(0, 0, 250, 250)
    context.strokeRect(0, 0, 250, 250)
    context.rotate(-21 * Math.PI / 180)
    context.translate(-1427, -641)
    context.stroke()
    
    // Bottom left tarmac
    context.beginPath()
    context.moveTo(1530,950)
    context.lineTo(1640,1200)
    context.lineTo(1345,1200)
    context.lineTo(1130,1000)
    context.lineTo(1370,890)
    context.lineTo(1530,950)
    context.stroke()
    // Top left tarmac
    context.beginPath()
    context.moveTo(1350,830)
    context.lineTo(1100,940)
    context.lineTo(1100,645)
    context.lineTo(1300,430)
    context.lineTo(1410,670)
    context.lineTo(1350,830)
    context.stroke()
    // Top right tarmac
    context.beginPath()
    context.moveTo(1470,650)
    context.lineTo(1360,400)
    context.lineTo(1655,400)
    context.lineTo(1870,600)
    context.lineTo(1630,710)
    context.lineTo(1470,650)
    context.stroke()
    // Bottom right tarmac
    context.beginPath()
    context.moveTo(1650, 770)
    context.lineTo(1900, 660)
    context.lineTo(1900, 955)
    context.lineTo(1700, 1170)
    context.lineTo(1590, 935)
    context.lineTo(1650, 770)
    context.stroke()
    drawDeflectors(deflectorsBottomRight)
    drawDeflectors(defelectorsBottomLeft)
    drawDeflectors(deflectorsTopLeft)
    drawDeflectors(deflectorsTopRight)
    // hub circle
    context.fillStyle = ayushDarkGray
    context.beginPath()
    context.arc(1500,800, 105, 0, 2*Math.PI)
    context.closePath()
    context.fill()
    context.stroke()
    
}
buttonManager.addButton("Fails Lower", new Button(300, 1100, 200, 400, function () {
    if (auto == true) {
        data.LowerAutoFail += 1
    }
    if (auto == false) {
        data.LowerTeleopFail += 1
    }
    render()
}))
render()