var outerCanvas = document.getElementsByClassName("outer-canvas")[0]
var outerContext = outerCanvas.getContext("2d")
var innerCanvas = document.getElementsByClassName("inner-canvas")[0]

outerCanvas.addEventListener("mousemove", function(event) {
                             var outerRect = outerCanvas.getBoundingClientRect()
                             var innerRect = innerCanvas.getBoundingClientRect()
                             var outerX = (event.clientX - outerRect.left) / outerRect.width * outerCanvas.width
                             var outerY = (event.clientY - outerRect.top) / outerRect.height * outerCanvas.height
                             var innerX = (event.clientX - innerRect.left) / innerRect.width * innerCanvas.width
                             var innerY = (event.clientY - innerRect.top) / innerRect.height * innerCanvas.height
                             
                             outerContext.clearRect(0, 0, 3450, 1840)
                             if (innerX > 0 && innerX < 3000 && innerY > 0 && innerY < 1600) {
                                 outerContext.beginPath()
                                 outerContext.lineWidth = 5
                                 outerContext.lineCap = "butt"
                                 outerContext.strokeStyle = "#000000"
                                 outerContext.moveTo(outerX, 120)
                                 outerContext.lineTo(outerX, 1720)
                                 outerContext.moveTo(225, outerY)
                                 outerContext.lineTo(3225, outerY)
                                 outerContext.stroke()
                             
                                 outerContext.font = "50px sans-serif"
                                 outerContext.textBaseline = "bottom"
                                 outerContext.textAlign = "center"
                                 outerContext.fillText("x=" + Math.floor(innerX).toString(), outerX, 100)
                                 outerContext.textBaseline = "middle"
                                 outerContext.textAlign = "right"
                                 outerContext.fillText("y=" + Math.floor(innerY).toString(), 205, outerY)
                             }
                             })

var canvasManagerSource = ""
var CanvasManagerBase
var canvasManager
function getUpdate() {
    clientHash = sha1(canvasManagerSource)
    const http = new XMLHttpRequest()
    
    http.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                response = JSON.parse(this.responseText)
                if (response.reload) {
                    try {
                        canvasManagerSource = response.data
                        CanvasManagerBase = new Function("canvas", canvasManagerSource)
                        var newCanvas = innerCanvas.cloneNode(true)
                        innerCanvas.parentElement.replaceChild(newCanvas, innerCanvas)
                        innerCanvas = document.getElementsByClassName("inner-canvas")[0]
                        canvasManager = new CanvasManagerBase(innerCanvas)
                    }
                    catch(error) {
                        console.log("Error when loading canvas manager (" + error.message + ")")
                        alert("Failed to load canvas manager. (" + error.message + ")")
                    }
                }
            } else {
                alert("Failed to retrieve canvas manager (" + this.status + " " + this.statusText + ")")
            }
        }
    }
    
    http.open("GET", "/get_update?client_hash=" + clientHash, true)
    http.send()
}
getUpdate()
setInterval(function() {getUpdate()}, 1000)
