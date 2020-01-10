// Responsible for managing visual layout and CanvasManager
function VisualManager(appManager) {
    var canvasManager
    var CanvasManager

    // Create CanvasManager class from game data
    this.loadData = function () {
        try {
            CanvasManager = new Function("canvas", "reverseAlliances", "uploadData", appManager.game.CanvasManager)
        }
        catch (error) {
            appManager.notificationManager.alert("Error", "Failed to load game data. (" + error.message + ")")
        }
    }

    // Initialize canvas manager
    this.start = function () {
        var oldCanvas = document.getElementsByClassName("visualcanvas")[0]
        var newCanvas = oldCanvas.cloneNode(true)
        oldCanvas.parentElement.replaceChild(newCanvas, oldCanvas)
        if (appManager.game.CanvasManager) {
            canvasManager = new CanvasManager(document.getElementsByClassName("visualcanvas")[0], document.getElementById("reverseAlliances").selectedIndex == 1, appManager.scoutManager.upload)
        }
    }

    // Signal canvas manager to switch modes
    this.setMode = function (state) {
        if (appManager.game.CanvasManager) {
            canvasManager.setMode(state - 1)
        }
    }

    // Retrieve data from canvas manager
    this.getData = function () {
        if (appManager.game.CanvasManager) {
            return canvasManager.getData()
        } else {
            return {}
        }
    }
}
