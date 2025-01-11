<script>
  import GamePiece from "./GamePiece.svelte";
  import { gameState } from "./stores";
  export let btnstate;
  export let btnsize
  export let location;
  export let gamePieceLocation;
  export let gamePiece;

</script>

<div class="indicator absolute">
    {#if $gameState==1 || $gameState==0 }
    <span
    class="indicator-item indicator-middle indicator-center indicator-start badge badge-primary text-xl"
    >{location}</span>
    {/if}
  <div class="absolute focus:animate-bounce">
    <GamePiece btnstate={btnstate} btnsize={btnsize} gamePiece={gamePiece} {location} {...location} />
  </div>
</div>