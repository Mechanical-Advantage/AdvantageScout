<script>
  import { gameData } from "./stores.js";
  import { track } from "./tracker.js";
  
  export let name = "";
  export let displayName = "";
  export let rangeType = "";
  export let step = 1;
  export let isDuration = false;

  let ratingValue = $gameData[name] * 2;

  $: ratingValue, ($gameData[name] = ratingValue / 2);
</script>

<div class="flex flex-col items-center justify-center">
  <div class="text-xl mt-2 font-bold">
    {displayName}
  </div>
  <div class="w-64 mt-2">
    <input
      type="range"
      min="0"
      max="10"
      class="range {rangeType}"
      {step}
      bind:value={ratingValue}
      use:track={name}
    />
    <div class="w-full flex justify-between text-s px-2">
      <span>{isDuration ? "N/A" : 0}</span>
      <span>{isDuration ? "15s" : 1}</span>
      <span>{isDuration ? "30s" : 2}</span>
      <span>{isDuration ? "60s" : 3}</span>
      <span>{isDuration ? "90s" : 4}</span>
      <span>{isDuration ? "All" : 5}</span>
    </div>
  </div>
</div>
