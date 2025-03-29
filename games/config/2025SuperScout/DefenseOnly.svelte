<script>
    import { autoState, gameData, gameState } from "./stores";
    import CurrentTeam from "./CurrentTeam.svelte";
    import { reversedAlliance, DefenseOnly } from "./stores";

    let buttonColor = "btn-primary";
    function handleClick() {
        // $autoState = 1;
        // $gameState = 2;
        $gameData["DefenseOnly"] = $gameData["DefenseOnly"] === 0 ? 1 : 0;
        buttonColor = $gameData["DefenseOnly"] === 0 ? "btn-primary" : "btn-success";
    }
    




</script>

<div class="absolute top-[256px] left-[450px] m-2">
    <button
        class="btn {buttonColor}"
        on:click={handleClick}>Defense Only</button
    >
</div>