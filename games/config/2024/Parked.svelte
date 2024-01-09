<script>
    import { gameData } from "./stores";

    function handleClick(){

        $gameData["Park"] = $gameData["Park"] === 0 ? 1 : 0


    }
    
</script>


<button class="btn {$gameData["Park"] === 0 ? "btn-primary" : "btn-success"} {$gameData["TeleDock"] === 2 ? "btn-disabled" : ''}" on:click={handleClick}>Parked?</button>


