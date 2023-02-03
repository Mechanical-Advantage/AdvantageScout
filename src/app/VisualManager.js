// Responsible for managing visual layout and CanvasManager
function VisualManager(appManager) {
  var gameManager;

  // Create CanvasManager class from game data
  this.loadData = function () {};

  // Initialize canvas manager
  this.start = function () {
    if (appManager.game.GameManager) {
      document.getElementById("visualCanvasDiv").innerHTML = "";
      gameManager = new (new Function(
        "return " +
          appManager.game.GameManager.js.substring(
            appManager.game.GameManager.js.indexOf("=") + 1
          )
      )())(
        document.getElementById("visualCanvasDiv"),
        appManager,
        document.getElementById("reverseAlliances").selectedIndex
      );
      document.getElementById("svelte-game-component").innerHTML =
        appManager.game.GameManager.css;
    }
  };

  // Signal canvas manager to switch modes
  this.setMode = function (state) {
    if (appManager.game.GameManager) {
      console.log("SETTING THE GAME MODE");
      gameManager.setMode(state - 1);
    }
  };

  // Retrieve data from canvas manager
  this.getData = function () {
    if (appManager.game.GameManager) {
      return gameManager.getData();
    } else {
      return {};
    }
  };
}
