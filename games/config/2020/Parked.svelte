
<script>
    import { gameData } from "./stores";
    let fontSize = 6;
    console.log("initial hanging status" + $gameData["TeleHanging"])
    console.log("initial balanced status" + $gameData["TeleBalanced"])

    function handleClick(){

        $gameData["Park"] = $gameData["Park"] === 0 ? 1 : 0
        console.log("Hanging status" + $gameData["TeleHanging"])
        console.log("Balanced status" + $gameData["TeleBalanced"])

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
  
  <button class="btn {$gameData["Park"] === 0 ? "btn-primary" : "btn-success"} {($gameData["TeleHanging"] ===2 || $gameData["TeleBalanced"]  === 2) ? "btn-disabled" : ''}" on:click={handleClick}>Parked?</button>


