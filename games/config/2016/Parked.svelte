
<script>
    import { gameData } from "./stores";
    let fontSize = 6;
    console.log("initial shallow status" + $gameData["TeleClimbShallow"])
    console.log("initial deep status" + $gameData["TeleClimbDeep"])

    function handleClick(){

        $gameData["Park"] = $gameData["Park"] === 0 ? 1 : 0
        console.log("shallow status" + $gameData["TeleClimbShallow"])
        console.log("deep status" + $gameData["TeleClimbDeep"])

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
  
  <button class="btn {$gameData["Park"] === 0 ? "btn-primary" : "btn-success"} {($gameData["TeleClimbShallow"] ===2 || $gameData["TeleClimbDeep"]  === 2) ? "btn-disabled" : ''}" on:click={handleClick}>Parked?</button>


