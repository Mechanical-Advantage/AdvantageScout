<script>
    import { gameData } from "../../current/stores";

    let buttonColor

    function handleClick(){
        if($gameData["AutoDock"]==3){
            $gameData["AutoDock"] = 0
        }

       

        buttonColor = $gameData["AutoDock"] == 0 ? "bg-gray" : $gameData["AutoDock"] == 1 ? "bg-yellow" : "bg-green"
    }

</script>


<button class="btn btn-primary {buttonColor}" on:click={handleClick}>Docked?</button>