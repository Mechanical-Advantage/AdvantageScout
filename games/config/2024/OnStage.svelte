<script>
    import { gameData, gameState } from "./stores";

    let dockButton = "";
    if ($gameState === 0) {
        dockButton = "AutoOnstage";
    } else {
        dockButton = "TeleOnstage";
    }

    function handleClick() {

        if ($gameData[dockButton] === 2) {
            $gameData[dockButton] = 0;
        } else {
            $gameData[dockButton] = $gameData[dockButton] + 1;
        }

    }

    
</script>

<button class="btn {$gameData[dockButton] === 0
                ? "btn-primary"
                : $gameData[dockButton] === 1
                ? "btn-secondary"
                : "btn-success"} {$gameData["Park"] === 1 ? "btn-disabled" : ""}" on:click={handleClick}>On Stage?</button>
