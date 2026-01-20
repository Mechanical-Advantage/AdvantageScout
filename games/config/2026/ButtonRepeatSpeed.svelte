<script>
    import { fuelButtonSpeed } from "./stores.js";

    let sliderValue = $fuelButtonSpeed / 100;

    $: sliderValue, ($fuelButtonSpeed = sliderValue * 100);
</script>

<div class="flex flex-col items-center justify-center">
    <div class="text-xl mt-2 font-bold">
        Scoring Speed
    </div>
    <div class="w-64 mt-2">
        <input
            type="range"
            min="1"
            max="5"
            class="range range-primary"
            step="1"
            bind:value={sliderValue}
        />
        <div class="w-full flex justify-between text-s px-2">
            <span>0.1s</span>
            <span>0.2s</span>
            <span>0.3s</span>
            <span>0.4s</span>
            <span>0.5s</span>
        </div>
    </div>
</div>
