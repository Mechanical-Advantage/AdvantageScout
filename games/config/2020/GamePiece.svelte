<script>
  import { gameState } from "./stores";
  import { liveGamepiece, liveLocation, gameData } from "./stores";
  export let gamePiece = "Cells";
  export let location = "Floor";
  export let gamePieceLocation = "Floor";
  export let btnstate = "";
  export let gpColor = "#ff0000";
  export let btnsize;
  console.log("collectstate" + $gameData["AutoFloorCenterline0NoteCollect"]);
  console.log("btnstate" + btnstate);
  console.log("gamePieceLocation" + gamePieceLocation);
  console.log(gamePiece);
  console.log($liveGamepiece);
  let coneSVG = "";
  function updateGameObject() {
    if ($liveGamepiece.length < 5) {
      $liveGamepiece = [...$liveGamepiece, gamePiece]; 
      $liveLocation = [...$liveGamepiece, gamePiece];
    } else {
      console.log("Too many game pieces")
    }
  }
</script>

<button
  class="btn btn-square btn-outline {btnsize} {gamePiece === 'Cube'
    ? 'btn-accent'
    : 'btn-secondary'}  "
  on:click={updateGameObject}
  disabled={$liveGamepiece.length >= 5}
>
  {#if gamePiece === "Cells"}
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="230.44793" height="230.49548" viewBox="0,0,230.44793,230.49548"><defs><radialGradient cx="283.03442" cy="135.76615" r="54.23059" gradientUnits="userSpaceOnUse" id="color-1"><stop offset="0" stop-color="#fdff00"/><stop offset="1" stop-color="#fdff00" stop-opacity="0"/></radialGradient><radialGradient cx="254.66323" cy="165.32472" r="54.23059" gradientUnits="userSpaceOnUse" id="color-2"><stop offset="0" stop-color="#fdff00"/><stop offset="1" stop-color="#fdff00" stop-opacity="0"/></radialGradient><radialGradient cx="225.69835" cy="194.2896" r="54.23059" gradientUnits="userSpaceOnUse" id="color-3"><stop offset="0" stop-color="#fdff00"/><stop offset="1" stop-color="#fdff00" stop-opacity="0"/></radialGradient><radialGradient cx="196.73348" cy="223.25448" r="54.23059" gradientUnits="userSpaceOnUse" id="color-4"><stop offset="0" stop-color="#fdff00"/><stop offset="1" stop-color="#fdff00" stop-opacity="0"/></radialGradient></defs><g transform="translate(-124.77603, -392 )"><g fill-rule="nonzero" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" style="mix-blend-mode: normal"><g><path d="M331.47185,119.19354c0.77797,2.0653 -0.02902,5.19181 -1.54082,6.25467l-1.00952,0.6354l11.67901,11.96508c11.08043,11.3665 11.75548,12.11307 12.98901,14.92c1.88439,4.10146 2.15797,9.7389 0.72384,14.24078l-1.16128,3.63044l-61.14808,61.14808l-61.14808,61.14808l-3.33775,1.16789c-4.24496,1.4765 -10.32143,1.19301 -14.53181,-0.65727l-2.99233,-1.34741l-41.15269,-41.15269l-41.15269,-41.15269l-1.31,-2.95491c-1.85029,-4.21038 -2.12386,-9.84782 -0.68807,-14.27654l1.16128,-3.63044l61.14808,-61.14808l61.14808,-61.14808l3.63044,-1.16128c4.50188,-1.43414 10.10191,-1.19797 14.24078,0.72384c2.84434,1.27093 3.51609,1.87117 16.04234,14.11135l13.05001,12.76394l0.85161,-1.1509c1.17179,-1.54591 3.78941,-2.21812 5.92788,-1.4385c2.69138,0.97495 27.5684,25.78044 28.58075,28.50924zM262.53628,75.14629c-2.10437,-0.88856 -5.46361,-0.67188 -7.63063,0.52244c-2.34748,1.29995 -117.92091,116.87339 -119.22087,119.22087c-0.52647,0.97541 -1.00067,2.64677 -1.04739,3.81585c-0.30577,4.2714 -2.9686,1.3225 41.177,45.4681c43.39738,43.39738 41.08282,41.29737 44.95756,41.23861c4.2406,-0.0505 0.33789,3.62773 64.38246,-60.41684c56.53515,-56.53515 58.96511,-59.03994 59.65056,-61.0722c0.85927,-2.43056 0.80474,-4.84519 -0.15533,-6.87804c-1.07726,-2.3646 -80.0464,-81.04765 -82.11335,-81.8988z" fill="#404040" stroke="none" stroke-width="1"/><path d="M257.02449,85.08244l38.34682,38.34682l38.34682,38.34682l-12.33689,12.33689l-12.33689,12.33689l-38.34682,-38.34682l-38.34682,-38.34682l12.33689,-12.33689z" fill="#fdff00" stroke="url(#color-1)" stroke-width="5"/><path d="M228.6533,114.64101l38.34682,38.34682l38.34682,38.34682l-12.33689,12.33689l-12.33689,12.33689l-38.34682,-38.34682l-38.34682,-38.34682l12.33689,-12.33689z" fill="#fdff00" stroke="url(#color-2)" stroke-width="5"/><path d="M199.68843,143.60589l38.34682,38.34682l38.34682,38.34682l-12.33689,12.33689l-12.33689,12.33689l-38.34682,-38.34682l-38.34682,-38.34682l12.33689,-12.33689z" fill="#fdff00" stroke="url(#color-3)" stroke-width="5"/><path d="M170.72355,172.57077l38.34682,38.34682l38.34682,38.34682l-12.33689,12.33689l-12.33689,12.33689l-38.34682,-38.34682l-38.34682,-38.34682l12.33689,-12.33689z" fill="#fdff00" stroke="url(#color-4)" stroke-width="5"/></g></g></g></svg>
  {/if}
</button>
