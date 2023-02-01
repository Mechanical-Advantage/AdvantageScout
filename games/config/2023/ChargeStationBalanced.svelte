<script>
    
    import { gameData, gameState } from "./stores";

    let buttonColor = "btn-primary"
    let buttonType = "btn-disabled"
       function handleClick(){

            $gameData["AutoEngage"] = $gameData["AutoEngage"] + 1

        if($gameData["AutoEngage"]===2){
            $gameData["AutoEngage"] = 0

        }

        buttonType = ($gameData["AutoDock"] === 2 ? " ": "btn-disabled")


        buttonColor = $gameData["AutoEngage"] === 0 ? "btn-primary" : "btn-success"


    }
    
</script>


<button class="btn {buttonColor} {$gameData["AutoDock"] === 2 ? " ": "btn-disabled"} " on:click={handleClick}>Engaged?</button>