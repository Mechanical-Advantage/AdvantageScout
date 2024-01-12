<script>
  import { gameState } from "../2023/stores";
import { liveGamepiece, liveLocation } from "./stores";
  export let gamePiece = "Note";
  export let location = "Floor";
  export let gamePieceLocation = "Floor";

  let coneSVG = "";
  function updateGameObject() {
    $liveGamepiece = gamePiece;
    $liveLocation = gamePieceLocation;
  }
</script>

<button
  class="btn btn-square btn-outline w-[64px] h-[64px] btn-accent"
  on:click={updateGameObject}
>
{#if $gameState == 0}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    enable-background="new 0 0 64 64"
    width="40px"
    height="40px"
    ><path
      d="m32 2c-16.568 0-30 13.432-30 30 0 16.569 13.432 30 30 30s30-13.431 30-30c0-16.568-13.432-30-30-30m0 45c-8.283 0-15-6.716-15-15s6.717-15 15-15c8.285 0 15 6.716 15 15s-6.715 15-15 15"
      fill="#fc761d"
    /></svg
  >
{/if}
</button>
