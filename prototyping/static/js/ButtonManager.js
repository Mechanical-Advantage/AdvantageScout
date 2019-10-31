//NOTE: this file is modified for the prototype server (the event listener is attatched to outer canvas rather than the one specified)

function Button(x, y, width, height, response) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.response = response
    this.enabled = true
    this.data = {}
    this.inRange = function(x, y) {
        return x >= this.x && y >= this.y && x <= this.x + this.width && y <= this.y + this.height
    }
}

function ButtonManager(canvas) {
    this.canvas = canvas
    var buttons = {}
    this.addButton = function(id, button) {
        buttons[id] = button
    }
    this.setEnabled = function(id, enabled) {
        buttons[id].enabled = enabled
    }
    this.setData = function(id, data) {
        buttons[id].data = data
    }
    outerCanvas.addEventListener("click", function(event) {
                                 var rect = canvas.getBoundingClientRect();
                                 var x = (event.clientX - rect.left) / rect.width * canvas.width
                                 var y = (event.clientY - rect.top) / rect.height * canvas.height
                                 var keys = Object.keys(buttons)
                                 for (var i=0; i < keys.length; i++) {
                                     if (buttons[keys[i]].inRange(x, y) && buttons[keys[i]].enabled) {
                                         buttons[keys[i]].response()
                                     }
                                 }
                                 })
}
