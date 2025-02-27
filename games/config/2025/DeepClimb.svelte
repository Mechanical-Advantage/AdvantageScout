
<script>
    import { gameData, gameState } from "./stores";

let dockButton = "";
if ($gameState === 0) {
    dockButton = "AutoClimbDeep";
} else {
    dockButton = "TeleClimbDeep";
}

function handleClick() {

    if ($gameData[dockButton] === 2) {
        $gameData[dockButton] = 0;
    } else {
        $gameData[dockButton] = $gameData[dockButton] + 1;
    }

}
  
  
    
    let buttonSize = 'btn-small';
  
  </script>
  
  <style>
    .btn {
      padding: 5px 10px;
      font-size: 12px;
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

<button class="btn {$gameData[dockButton] === 0
    ? "btn-primary"
    : $gameData[dockButton] === 1
    ? "btn-secondary"
    : "btn-success"} {$gameData["Park"] === 1 ? "btn-disabled" : "" || $gameData["TeleClimbShallow"] === 2 ? "btn-disabled" : ""}" on:click={handleClick}>Deep Climb?</button>
