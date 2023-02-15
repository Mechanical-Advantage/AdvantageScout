<script>
    import { gameData, gameState } from "./stores";

    let buttonColor = "btn-primary";
    let buttonType = "btn-disabled";
    let dockedButton = "";
    let engageButton = "";

    if ($gameState === 0) {
        engageButton = "AutoEngage";
        dockedButton = "AutoDock";
    } else {
        engageButton = "TeleEngage";
        dockedButton = "TeleDock";
    }

    function handleClick() {
        $gameData[engageButton] = $gameData[engageButton] + 1;

        if ($gameData[engageButton] === 2) {
            $gameData[engageButton] = 0;
        }

        buttonType = $gameData[dockedButton] === 2 ? "btn-disabled" : "";


    }
</script>

<button
    class="btn {$gameData[engageButton] === 0 ? "btn-primary" : "btn-success"} {$gameData[dockedButton] === 2
        ? ''
        : 'btn-disabled'} "
    on:click={handleClick}>Engaged?</button
>
