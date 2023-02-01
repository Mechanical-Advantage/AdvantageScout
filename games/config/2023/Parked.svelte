<script>
    import { gameData } from "./stores";
let buttonColor = "btn-primary"

    function handleClick(){

        $gameData["Park"] = $gameData["Park"] === 0 ? 1 : 0


        buttonColor = $gameData["Park"] === 0 ? "btn-primary" : "btn-success"
    }
    
</script>


<button class="btn {buttonColor} {$gameData["TeleDock"] === 2 ? "btn-disabled" : ""}" on:click={handleClick}>Parked?</button>


