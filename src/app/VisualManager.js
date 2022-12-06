// Responsible for managing visual layout and CanvasManager
function VisualManager(appManager) {
    var gameManager
    var GameManager

    // Create CanvasManager class from game data
    this.loadData = function () {

        try {
            // console.log(appManager.game.GameManager.js)
            // alert(appManager.game.GameManager.js)
            GameManager = new Function("return " + appManager.game.GameManager.js.substring(16))()

            // console.log(appManager.game)
            // console.log(GameManager)



            // appManager.game.GameManager.js
        }
        catch (error) {
            appManager.notificationManager.alert("Error", "Failed to load game data. (" + error.message + ")")
        }
    }

    // Initialize canvas manager
    this.start = function () {

        if (appManager.game.GameManager) {
            document.getElementById("visualCanvasDiv").innerHTML = ""
            gameManager = new GameManager(document.getElementById("visualCanvasDiv"), appManager)
            //gameManager.setReverseAlliance(reversed)
            document.getElementById("svelte-game-component").innerHTML = appManager.game.GameManager.css
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
