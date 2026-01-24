
<script>
    import { gameData, gameState } from "./stores";
    let dockButton = gameState == 0 ? "AutoClimbPosition" : "TeleClimbPosition";
    let positions = ["Left", "Middle", "Right", "Edge"];
    function handleClick() {

        if ($gameData[dockButton] === 3) {
            $gameData[dockButton] = 0;
        } else {
            $gameData[dockButton] = $gameData[dockButton] + 1;
        }

    }
    let buttonSize = 'btn-small';
  </script>
  
  <style>
    .btn {
      padding: 1px 10px;
      font-size: 10px;
    }
  
    .btn-disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  
    .btn-primary {
      background-color: rgb(0, 51, 255);
      color: white;
    }
  
    .btn-success {
      background-color: green;
      color: white;
    }
  </style>

<button class="btn 
    {($gameData[gameState == 0 ? "Auto" : "Tele" + "ClimbL1"] != 0) || 
    ($gameData[gameState == 0 ? "Auto" : "Tele" + "ClimbL2"] != 0) || 
    ($gameData[gameState == 0 ? "Auto" : "Tele" + "ClimbL3"] != 0) 
    ? "" : "btn-disabled"}
    btn-primary"
     on:click={handleClick}>Climb {positions[$gameData[dockButton]]}?</button>
