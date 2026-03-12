<script>
    import { fuelButtonSpeed } from "./stores.js";
    import { track } from "./tracker.js";

    let sliderValue = 200 / $fuelButtonSpeed;

    $: sliderValue, ($fuelButtonSpeed = (0.2 / sliderValue) * 1000);
</script>

<div class="flex flex-col items-center justify-center">
    <div class="text-xl mt-2 font-bold">BPS</div>
    <div class="w-64 mt-2">
        <input
            type="range"
            min="1"
            max="5"
            class="range range-primary"
            step="0.5"
            bind:value={sliderValue}
            onchange={console.log($fuelButtonSpeed)}
            use:track={"ButtonRepeatSpeed"}
        />
        <div class="w-full flex justify-between text-s px-2">
            <span>5</span>
            <span>10</span>
            <span>15</span>
            <span>20</span>
            <span>25</span>
        </div>
    </div>
</div>
