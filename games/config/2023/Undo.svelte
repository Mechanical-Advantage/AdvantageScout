<script>
    import { dataLog, gameData } from "./stores";

    function handleClick(){
        if($dataLog.length > 0){
        $gameData = $dataLog.pop()
        }
    }


</script>

{#if $dataLog.length > 0}
<button class="btn btn-primary" on:click={handleClick}>
    Undo
</button>
{/if}