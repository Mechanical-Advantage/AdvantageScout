<script>
    import { gameData } from "../../current/stores";

    let buttonColor = "btn-primary"

    function handleClick(){
        if($gameData["AutoDock"]===3){
            $gameData["AutoDock"] = 0
        }

       

        buttonColor = $gameData["AutoDock"] === 0 ? "btn-primary" : $gameData["AutoDock"] === 1 ? "btn-secondary" : "btn-success"

    }

</script>


<button class="btn {buttonColor}" on:click={handleClick}>Docked?</button>