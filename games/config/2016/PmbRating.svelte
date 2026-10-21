<script>
  import { gameData } from "./stores.js";
  export let name = "";
  export let displayName = "";
  export let buttonType = "";
  export let step = 0.5;

  function updateRating(increment) {
    $gameData[name] = $gameData[name] + increment;
    if ($gameData[name] > 5) {
      $gameData[name] = 5;
    } else if ($gameData[name] < 0) {
      $gameData[name] = 0;
    }
  }
</script>

<div class="flex flex-col items-center justify-center">
  <span class="text-xl font-bold">{displayName}</span>
  <div class="flex flex-row">
    <button
      class="btn btn-square w-10 h-10 text-lg {buttonType}"
      on:click={updateRating(-step)}
    >
    -
    </button>
    <div class="text-xl mt-2 font-bold w-12 h-12 text-center">
      {$gameData[name]}
    </div>
    <button
      class="btn btn-square w-10 h-10 text-lg {buttonType}"
      on:click={updateRating(step)}
    >
      +
    </button>
  </div>
</div>
