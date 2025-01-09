<script>
    import { gameData } from "./stores";
    let fontSize = 10;

    function handleClick(){

        $gameData["Park"] = $gameData["Park"] === 0 ? 1 : 0


    }
    
</script>


<button class="btn w-10 h-10 {$gameData["Park"] === 0 ? "btn-primary" : "btn-success"} {$gameData["TeleOnstage"] === 2 ? "btn-disabled" : ''}" on:click={handleClick}>Parked?</button>


