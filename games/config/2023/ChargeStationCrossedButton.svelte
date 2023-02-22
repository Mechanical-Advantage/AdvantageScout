<script>

    import { gameData } from "./stores";

    function handleClick(){

                $gameData["AutoDockTraverse"] = $gameData["AutoDockTraverse"] + 1

        if($gameData["AutoDockTraverse"]===2){
            $gameData["AutoDockTraverse"] = 0

        }


    }
    
</script>


<button class="btn {$gameData["AutoDockTraverse"] === 0 ? "btn-primary" : "btn-success"}" on:click={handleClick}>Crossed Station?</button>
