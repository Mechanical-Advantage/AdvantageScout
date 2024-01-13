<script>
  import GamePiece from "./GamePiece.svelte";
  import { gameState } from "./stores";

  export let location;
  export let gamePieceLocation;

</script>

<div class="indicator absolute">
    {#if $gameState==1}
    <span
    class="indicator-item indicator-middle indicator-center indicator-start badge badge-primary "
    >{location}</span>
    {/if}
  <div class="absolute hover:animate-bounce">
    <GamePiece gamePiece="Note" gamePieceLocation={location} {...location} />
  </div>
</div>
