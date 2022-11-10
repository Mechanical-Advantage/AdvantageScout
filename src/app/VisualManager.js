// Responsible for managing visual layout and CanvasManager
function VisualManager(appManager) {
    var gameManager
    var GameManager

    // Create CanvasManager class from game data
    this.loadData = function () {
        try {
            GameManager = new Function("return" + appManager.game.GamManager.js.substring(16)(), appManager.game.GameManager)
            gameManager = new GameManager()
            
            // appManager.game.GameManager.js
        }
        catch (error) {
            appManager.notificationManager.alert("Error", "Failed to load game data. (" + error.message + ")")
        }
    }

    // Initialize canvas manager
    this.start = function () {

        if (appManager.game.GameManager) {
            gameManager = new GameManager(document.getElementsById("visualCanvasDiv"), appManager)
            gameManager.setReverseAlliance(reversed)
            document.getElementById("svelte-game-component").innerHTML = appManager.game.GamManager.css
        }
    }

    // Signal canvas manager to switch modes
    this.setMode = function (state) {
        if (appManager.game.GameManager) {
            gameManager.setMode(state - 1)
        }
    }

    // Retrieve data from canvas manager
    this.getData = function () {
        if (appManager.game.GameManager) {
            return gameManager.getData()
        } else {
            return {}
        }
    }
}
