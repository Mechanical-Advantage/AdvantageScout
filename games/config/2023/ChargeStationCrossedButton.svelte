<script>

    import { gameData } from "./stores";
    let buttonColor = "btn-primary"

    function handleClick(){

                $gameData["AutoDockTraverse"] = $gameData["AutoDockTraverse"] + 1

        if($gameData["AutoDockTraverse"]===2){
            $gameData["AutoDockTraverse"] = 0

        }


        buttonColor = $gameData["AutoDockTraverse"] === 0 ? "btn-primary" : "btn-success"
    }
    
</script>


<button class="btn {buttonColor}" on:click={handleClick}>Crossed?</button>
