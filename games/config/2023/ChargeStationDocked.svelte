<script>
    import { gameData, gameState } from "../../current/stores";

    let buttonColor = "btn-primary";
    let dockButton = "";

    function handleClick() {
        if ($gameState === 0) {
            dockButton = "AutoDock";
        } else {
            dockButton = "TeleDock";
        }
        if ($gameData[dockButton] === 2) {
            $gameData[dockButton] = 0;
        } else {
            $gameData[dockButton] = $gameData[dockButton] + 1;
        }

        buttonColor =
            $gameData[dockButton] === 0
                ? "btn-primary"
                : $gameData[dockButton] === 1
                ? "btn-secondary"
                : "btn-success";
        console.log($gameData[dockButton]);
    }
</script>

<button class="btn {buttonColor} {$gameData["Park"] === 1 ? "btn-disabled" : ""}" on:click={handleClick}>Docked?</button>
