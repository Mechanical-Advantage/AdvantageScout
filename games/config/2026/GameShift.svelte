
<script>
    import { gameData, gameState, gameShift } from "./stores";
    let shifts = ["Transition", "Shift 1", "Shift 2", "Shift 3", "Shift 4", "Endgame"];
    let colors = ["btn-red", "btn-orange", "btn-yellow", "btn-green", "btn-blue", "btn-purple"];
    function handleClick() {

        if ($gameShift === 5) {
            $gameShift = 0;
        } else {
            $gameShift = $gameShift + 1;
        }

    }
    let buttonSize = 'btn-small';
  </script>
  
  <style>
    .btn {
      padding: 6px 12px;
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
    .btn-red {
      background-color: rgb(255, 0, 0);
      color: white;
    }

    .btn-orange {
      background-color: rgb(255, 150, 0);
      color: white;
    }

    .btn-yellow {
      background-color: rgb(255, 255, 0);
      color: black; 
    }

    .btn-green {
      background-color: rgb(25, 200, 25);
      color: white;
    }

    .btn-blue {
      background-color: rgb(0, 51, 255);
      color: white;
    }

    .btn-purple {
      background-color: rgb(160, 0, 160);
      color: white;
    }

    .btn-primary {
      background-color: rgb(0, 51, 255);
      color: white;
    }

    .btn-red:hover {
      background-color: rgb(200, 0, 0);
      color: white;
    }

    .btn-orange:hover {
      background-color: rgb(200, 117, 0);
      color: white;
    }

    .btn-yellow:hover {
      background-color: rgb(200, 200, 0);
      color: black; 
    }

    .btn-green:hover {
      background-color: rgb(23, 169, 23);
      color: white;
    }

    .btn-blue:hover {
      background-color: rgb(0, 40, 200);
      color: white;
    }

    .btn-purple:hover {
      background-color: rgb(105, 0, 105);
      color: white;
    }
  </style>

<button class="btn {colors[$gameShift]}"
     on:click={handleClick}>{shifts[$gameShift]}</button>