<script>
    import { autoDataLog, teleDataLog, gameData, gameState } from "./stores";

    function handleClick() {
        if ($gameState === 0 && $autoDataLog.length > 0) {
            $gameData = $autoDataLog.pop();
        } else if ($gameState === 1 && $teleDataLog.length > 0) {
            $gameData = $teleDataLog.pop();
        }
    }
</script>

{#if ($gameState === 0 && $autoDataLog.length > 0) || ($gameState === 1 && $teleDataLog.length > 0)}
    <button class="btn btn-primary" on:click={handleClick}> Undo </button>
{/if}
