<script>
  import GamePiece from "./GamePiece.svelte";
  import { gameState } from "./stores";
  export let btnstate;
  export let location;
  export let gamePieceLocation;

</script>

<div class="indicator absolute">
    {#if $gameState==1}
    <span
    class="indicator-item indicator-middle indicator-center indicator-start badge badge-primary "
    >{location}</span>
    {/if}
  <div class="absolute focus:animate-bounce">
    <GamePiece btnstate={btnstate} gamePiece="Note" gamePieceLocation={location} {...location} />
  </div>
</div>
