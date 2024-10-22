<script>
  import { gameState } from "./stores";
  import { liveGamepiece, liveLocation, gameData } from "./stores";
  export let gamePiece = "Note";
  export let location = "Floor";
  export let gamePieceLocation = "Floor";
  export let btnstate = "";
  export let gpColor = "#ff0000";
  export let btnsize;
  console.log("collectstate" + $gameData["AutoFloorCenterline0NoteCollect"]);
  console.log("btnstate" + btnstate);
  console.log("gamePieceLocation" + gamePieceLocation);

  let coneSVG = "";
  function updateGameObject() {
    $liveGamepiece = gamePiece;
    $liveLocation = gamePieceLocation;
  }
</script>

<button
  class="btn {btnstate} btn-=square btn-outline {btnsize} btn-accent"
  on:click={updateGameObject}
>
  {#if $gameState == 0}
  <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" width="96px" height="96px"  fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff20">

    <g id="SVGRepo_bgCarrier" stroke-width="0"/>
    
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
    
    <g id="SVGRepo_iconCarrier"> <path d="M4 7.5L11.6078 3.22062C11.7509 3.14014 11.8224 3.09991 11.8982 3.08414C11.9654 3.07019 12.0346 3.07019 12.1018 3.08414C12.1776 3.09991 12.2491 3.14014 12.3922 3.22062L20 7.5M4 7.5V16.0321C4 16.2025 4 16.2876 4.02499 16.3637C4.04711 16.431 4.08326 16.4928 4.13106 16.545C4.1851 16.6041 4.25933 16.6459 4.40779 16.7294L12 21M4 7.5L12 11.5M12 21L19.5922 16.7294C19.7407 16.6459 19.8149 16.6041 19.8689 16.545C19.9167 16.4928 19.9529 16.431 19.975 16.3637C20 16.2876 20 16.2025 20 16.0321V7.5M12 21V11.5M20 7.5L12 11.5" stroke="#ffff20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g>
    
    </svg>
  {/if}
  {#if $gameState == 1}
  <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20"width="96px" height="96px"  fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff20">

    <g id="SVG Repo_bgCarrier" stroke-width="0"/>
    
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
    
    <g id="SVGRepo_iconCarrier"> <path d="M4 7.5L11.6078 3.22062C11.7509 3.14014 11.8224 3.09991 11.8982 3.08414C11.9654 3.07019 12.0346 3.07019 12.1018 3.08414C12.1776 3.09991 12.2491 3.14014 12.3922 3.22062L20 7.5M4 7.5V16.0321C4 16.2025 4 16.2876 4.02499 16.3637C4.04711 16.431 4.08326 16.4928 4.13106 16.545C4.1851 16.6041 4.25933 16.6459 4.40779 16.7294L12 21M4 7.5L12 11.5M12 21L19.5922 16.7294C19.7407 16.6459 19.8149 16.6041 19.8689 16.545C19.9167 16.4928 19.9529 16.431 19.975 16.3637C20 16.2876 20 16.2025 20 16.0321V7.5M12 21V11.5M20 7.5L12 11.5" stroke="#ffff20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g>
    
    </svg>
  {/if}
</button>
