<script>
    import GamePieceLocation from "./GamePieceLocation.svelte";
    import { gameState } from "./stores";
    export let gameMode = "Auto"
</script>

{#if $gameState == 1}
<div class="absolute mt-[40px]">
<GamePieceLocation location="Double" gamePieceLocation="Double" gameMode={gameMode}/>
</div>  

<div class="absolute mt-[195px]">
<GamePieceLocation location="Single" gamePieceLocation="Single" gameMode={gameMode} />
</div>
{/if}
<div class="absolute mt-[350px]">
<GamePieceLocation location="Floor" gamePieceLocation="Floor" gameMode={gameMode} />
</div>