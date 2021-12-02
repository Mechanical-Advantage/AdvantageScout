var context = canvas.getContext("2d")
var buttonManager = new ButtonManager(canvas)
function render() {
    context.clearRect(0,0,3000,1600)
    context.beginPath()
    //draw left hab platforms
    drawSquare(300,500,200,200,red,black)
    drawSquare(300,700,200,200,red,black)
    drawSquare(300,900,200,200,red,black)
    drawSquare(500,500,200,200,red,black)
    drawSquare(500,700,200,200,red,black)
    drawSquare(500,900,200,200,red,black)
    //draw top left rocket ship
    drawSquare(800,200,150,150,green,black)
    drawSquare(800,350,150,150,green,black)
    drawSquare(800,500,150,150,green,black)
    drawSquare(950,200,150,150,darkred,black)
    drawSquare(950,350,150,150,darkred,black)
    drawSquare(950,500,150,150,darkred,black)
    //draw bottom left rocket ship
    drawSquare(800,950,150,150,green,black)
    drawSquare(800,1100,150,150,green,black)
    drawSquare(800,1250,150,150,green,black)
    drawSquare(950,950,150,150,darkred,black)
    drawSquare(950,1100,150,150,darkred,black)
    drawSquare(950,1250,150,150,darkred,black)
    //draw right hab platform
    drawSquare(2500,500,200,200,blue,black)
    drawSquare(2500,700,200,200,blue,black)
    drawSquare(2500,900,200,200,blue,black)
    drawSquare(2300,500,200,200,blue,black)
    drawSquare(2300,700,200,200,blue,black)
    drawSquare(2300,900,200,200,blue,black)
    //draw top right rocket ship
    drawSquare(1900,200,150,150,green,black)
    drawSquare(1900,350,150,150,green,black)
    drawSquare(1900,500,150,150,green,black)
    drawSquare(2050,200,150,150,darkred,black)
    drawSquare(2050,350,150,150,darkred,black)
    drawSquare(2050,500,150,150,darkred,black)
    //draw bottom right rocket ship
    drawSquare(1900,950,150,150,green,black)
    drawSquare(1900,1100,150,150,green,black)
    drawSquare(1900,1250,150,150,green,black)
    drawSquare(2050,950,150,150,darkred,black)
    drawSquare(2050,1100,150,150,darkred,black)
    drawSquare(2050,1250,150,150,darkred,black)
    //draw cargo ship
    drawSquare(1250,600,250,200,green,black)
    drawSquare(1250,800,250,200,darkred,black)
    drawSquare(1500,600,250,200,green,black)
    drawSquare(1500,800,250,200,darkred,black)
    //draw Cargo
    drawCircle(150,700,90,0,2*Math.PI,orange,black)
    //draw Hatch
    drawCircle(150,900,90,0,2*Math.PI,yellow,black)
    drawCircle(150,900,45,0,2*Math.PI,white,black)
}


var red = "#FF0000"
var blue = "#0000FF"
var black = "#000000"
var green = "#00FF00"
var darkred = "#660000"
var orange = "#FF6633"
var yellow = "#FFFF33"
var white = "#FFFFFF"
function drawSquare(x,y,w,h,fillcolor, outlinecolor){
    context.fillStyle = fillcolor
    context.strokStyle = outlinecolor
    context.lineWidth = 5
    context.fillRect(x,y,w,h)
    context.strokeRect(x,y,w,h)
}
function drawCircle(x,y,r,SA,EA,fillcolor,outlinecolor){
    context.fillStyle=fillcolor
    context.strokStyle = outlinecolor
    context.lineWidth = 5
    context.beginPath()
    context.arc(x,y,r,SA,EA)
    context.fill()
    context.stroke()
}
render()