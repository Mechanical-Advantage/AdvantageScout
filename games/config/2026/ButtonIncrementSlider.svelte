<script>
  import { fuelButtonAmount } from "./stores.js";

  let sliderValue = $fuelButtonAmount;

  $: sliderValue, ($fuelButtonAmount = sliderValue);
</script>

<div class="flex flex-col items-center justify-center">
  <div class="text-xl mt-2 font-bold">BPT</div>
  <div class="w-64 mt-2">
    <input
      type="range"
      min="2"
      max="10"
      class="range range-primary"
      step="2"
      bind:value={sliderValue}
    />
    <div class="w-full flex justify-between text-s px-2">
      <span>2</span>
      <span>4</span>
      <span>6</span>
      <span>8</span>
      <span>10</span>
    </div>
  </div>
</div>
