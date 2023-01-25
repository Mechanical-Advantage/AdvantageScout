<script>

    import { gameData } from "./stores";
    let buttonColor

    function handleClick(){

                $gameData["AutoDockTraverse"] = $gameData["AutoDockTraverse"] + 1

        if($gameData["AutoDockTraverse"]==2){
            $gameData["AutoDockTraverse"] = 0

        }


        buttonColor = $gameData["AutoDockTraverse"] == 0 ? "bg-gray" : "bg-green"
    }
    
</script>


<button class="btn btn-primary"on:click={handleClick}>Crossed?</button>
