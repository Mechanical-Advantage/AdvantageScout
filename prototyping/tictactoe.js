var context = canvas.getContext("2d")
var buttonManager = new ButtonManager(canvas)
var a = 0
var buttonstate = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]
function render() {
    context.clearRect(0,0,3000, 1600)
    context.beginPath()
    context.moveTo(1400, 500)
    context.lineTo(1400, 1100)
    context.moveTo(1600, 500)
    context.lineTo(1600, 1100)
    context.moveTo(1200, 700)
    context.lineTo(1800, 700)
    context.moveTo(1200, 900)
    context.lineTo(1800, 900)
    context.lineWidth = 10
    context.stroke()
    for (var x = 0; x < 3; x=x+1) {
        for(var y = 0; y<3; y=y+1){
            if (buttonstate[x][y] == 1){drawX(1200 + x*200, 500 + y*200)}
            if (buttonstate[x][y] == 2){drawO(1200 + x*200, 500 + y*200)}
            
        }
    }
}
function drawX(x,y){
    context.beginPath()
    context.moveTo(x,y)
    context.lineTo(x+200,y+200)
    context.moveTo(x,y+200)
    context.lineTo(x+200,y)
    context.lineWidth = 5
    context.stroke()
}
function drawO(x,y){
    context.beginPath()
    context.arc(x+100, y+100, 100, 0, 2*Math.PI)
    context.lineWidth = 5
    context.stroke()
}
function Win(){
    for (x=0; x<3; x=x+1){
            if ((buttonstate[x][0] == buttonstate[x][1]) && (buttonstate[x][2] == buttonstate[x][0]) && buttonstate[x][0] != 0){
                alert(buttonstate[x][0])
}
}
    for (y=0; y<3; y=y+1){
            if ((buttonstate[0][y] == buttonstate[1][y]) && (buttonstate[0][y] == buttonstate[2][y]) && buttonstate[0][y] != 0){
                alert(buttonstate[0][y])
}
}
    if ((buttonstate[0][0] == buttonstate[1][1]) && (buttonstate[0][0] == buttonstate[2][2]) && buttonstate[0][0] != 0){
            alert(buttonstate[0][0])
}
    if ((buttonstate[0][2] == buttonstate[1][1]) && (buttonstate[0][2] == buttonstate[2][0]) && buttonstate[0][2] != 0){
            alert(buttonstate[0][2])
}
    var filled = true
    for (x=0; x<3; x=x+1){
        for (y=0; y<3; y=y+1){
            if (buttonstate[x][y] == 0){
                filled = false 
            }}}if (filled){
                alert("tie")
}
}
function makebuttons(){
    for (var x = 0; x <3; x=x+1){
        for(var y = 0; y<3; y=y+1){
            var buttonfunc = makebuttonfunc(x,y)
            buttonManager.addButton(x.toString()+y.toString(), new Button(1200 + x*200, 500 + y*200, 200, 200, buttonfunc 
            )
            )
            }   
            }
            }
function makebuttonfunc(x,y){
    console.log(buttonstate[x][y])
    return function(){
        if (buttonstate[x][y] != 0)
            {alert("Pick a different button")
        }else {
        if (a % 2 == 0){
            buttonstate[x][y] = 2
            render()
            a = a+1
        }else {
            buttonstate[x][y] = 1
            render()
            a = a + 1}
        console.log(buttonstate)
        Win()
    }
}
}
makebuttons()
render()