<script>
    import { gameData, gameState } from "../../current/stores";

    let buttonColor = "btn-primary"

    function handleClick(){
        if($gameData["AutoDock"]=== 2){
            $gameData["AutoDock"] = 0
        }
        else{
            $gameData["AutoDock"] +=1
        }

       

        buttonColor = $gameData["AutoDock"] === 0 ? "btn-primary" : $gameData["AutoDock"] === 1 ? "btn-secondary" : "btn-success"

    }

</script>


<button class="btn {buttonColor}" on:click={handleClick}>Docked?</button>