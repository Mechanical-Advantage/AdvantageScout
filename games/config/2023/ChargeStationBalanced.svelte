<script>
    
    import { gameData, gameState } from "./stores";

    let buttonColor = "btn-primary"
       function handleClick(){

            $gameData["AutoEngage"] = $gameData["AutoEngage"] + 1

        if($gameData["AutoEngage"]===2){
            $gameData["AutoEngage"] = 0

        }


        buttonColor = $gameData["AutoEngage"] === 0 ? "btn-primary" : "btn-success"

    }
    
</script>


<button class="btn {buttonColor}" on:click={handleClick}>Engaged?</button>