<script>
  import { gameState } from "./stores";
  import { liveGamepiece, liveLocation, gameData, fuelCycleCountSuccess, fuelCycleCountFail } from "./stores";
  export let gamePiece = "Fuel";
  export let location = "Floor";
  export let gamePieceLocation = "Floor";
  export let btnstate = "";
  export let gpColor = "#ff0000";
  export let btnsize;
  let hubSuccess;
  let hubFail;
  let lastLocation;
  console.log("entering gamepiece")
  let coneSVG = "";
  function updateGameObject() {
    lastLocation = $liveLocation;
    $liveGamepiece = gamePiece;
    $liveLocation = gamePieceLocation;
    hubSuccess=($gameState == 0 ? "Auto" : "Tele") + "HubFuelCyclesSuccess";
    hubFail=($gameState == 0 ? "Auto" : "Tele") + "HubFuelCyclesFail";
    console.log("hubSuccess" + hubSuccess);
    console.log("hubFail" + hubFail);
    $gameData[hubSuccess].push($fuelCycleCountSuccess);
    $gameData[hubFail].push($fuelCycleCountFail);
    $fuelCycleCountSuccess = 0;
    $fuelCycleCountFail = 0;
    if (lastLocation === "PreLoaded" && gamePieceLocation === "Neutral" && $gameState == 0) {
      $gameData["AutoHubPreLoadedFuelSuccess"] = $gameData["AutoHubFuelSuccess"];
    }
  }
</script>

<button
  class="btn btn-square btn-outline {btnsize} {gamePiece === 'Fuel'
    ? 'btn-accent'
    : 'btn-secondary'}  "
  on:click={updateGameObject}
>
  {#if location === "Floor"}
    <svg fill="#91c5cf" height="80px" width="80px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 600 600" xml:space="preserve" stroke="#b71f1f">
    <g id="SVGRepo_iconCarrier" transform="translate(50, -50)"> <g> <g> <path d="M0,0v512h512V0H0z M460.075,30.417l-43.548,43.547L372.98,30.417H460.075z M481.583,51.925v117.512L336.264,314.755 l-58.756-58.756L481.583,51.925z M395.02,95.472L95.472,395.019l-58.756-58.756L336.264,36.717L395.02,95.472z M299.547,30.417 L175.736,154.228L116.98,95.472l65.055-65.055H299.547z M30.417,30.417H139.02L30.417,139.02V30.417z M30.417,182.036 l65.055-65.055l58.756,58.756L30.417,299.546V182.036z M30.417,372.979l43.547,43.547l-43.547,43.547V372.979z M51.925,481.583 L256,277.508l58.756,58.756L169.437,481.583H51.925z M212.453,481.583l269.13-269.129v117.51L329.964,481.583H212.453z M372.981,481.583l43.546-43.547l43.547,43.547H372.981z M481.583,460.075l-43.547-43.547l43.547-43.547V460.075z"/> </g> </g> </g>
    </svg>
  {:else}
    <svg fill="#d76609" height="80px" width="80px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 600 600" xml:space="preserve" stroke="#d76609">
    <g id="SVGRepo_iconCarrier" transform="translate(50,-50)"> <g> <g> <g> <circle cx="401.118" cy="395.003" r="10.581"/> <circle cx="361.787" cy="373.84" r="10.581"/> <path d="M494.081,258.048h-47.616c-5.843,0-10.581,4.737-10.581,10.581v91.923c-0.184-0.11-0.361-0.226-0.547-0.334 l-227.98-131.624l80.151-114.467c3.848,1.896,8.049,2.875,12.333,2.875c1.644,0,3.299-0.144,4.952-0.436 c7.409-1.306,13.866-5.421,18.182-11.583l37.484-53.532c4.315-6.163,5.973-13.638,4.666-21.047 c-1.307-7.41-5.421-13.867-11.583-18.182l-10.194-7.138c-12.723-8.907-30.322-5.805-39.229,6.918l-37.483,53.532 c-4.315,6.163-5.973,13.637-4.666,21.047c1.051,5.958,3.919,11.298,8.206,15.406L188.96,217.973l-26.662-15.393 c-10.041-5.797-21.736-7.339-32.938-4.336c-11.199,3.001-20.56,10.183-26.356,20.224l-20.623,35.717 c-2.923,5.061-1.188,11.533,3.873,14.454l274.893,158.71H17.92c-5.843,0-10.581,4.737-10.581,10.581v63.488 c0,5.844,4.738,10.581,10.581,10.581h476.161c5.843,0,10.581-4.737,10.581-10.581v-232.79 C504.662,262.786,499.925,258.048,494.081,258.048z M283.969,77.673l37.483-53.533c1.361-1.944,3.538-2.984,5.749-2.984 c1.387,0,2.788,0.411,4.007,1.265l10.194,7.138c1.532,1.073,2.555,2.679,2.881,4.521c0.325,1.842-0.088,3.701-1.161,5.234 l-37.484,53.532c-1.074,1.533-2.679,2.556-4.521,2.881c-1.84,0.325-3.7-0.088-5.232-1.161c-0.001,0-0.001,0-0.001,0 l-10.194-7.138c-1.532-1.073-2.554-2.679-2.88-4.521C282.484,81.064,282.896,79.205,283.969,77.673z M105.999,255.604 l15.332-26.555c2.971-5.146,7.768-8.826,13.507-10.363c5.737-1.539,11.733-0.749,16.878,2.222l25.059,14.468l-10.214,14.587 c-3.352,4.787-2.188,11.386,2.599,14.737c1.846,1.294,3.963,1.915,6.06,1.915c3.335,0,6.619-1.573,8.677-4.513l11.277-16.105 l229.584,132.551c10.622,6.132,14.274,19.763,8.142,30.384l-4.21,7.294c-2.971,5.145-7.767,8.826-13.506,10.363 c-5.74,1.539-11.734,0.749-16.879-2.222L105.999,255.604z M483.499,490.838H28.501v-42.325h454.998V490.838z M483.499,427.35 h-26.453v-31.579v-116.56h26.453V427.35z"/> </g> </g> </g> </g>
    </svg>
  {/if}
</button>
