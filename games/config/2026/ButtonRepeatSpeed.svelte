<script>
    import { fuelButtonSpeed } from "./stores.js";

    let sliderValue = 1;

    $: sliderValue, ($fuelButtonSpeed = (0.2 / sliderValue) * 1000);
</script>

<div class="flex flex-col items-center justify-center">
    <div class="text-xl mt-2 font-bold">
        BPS
    </div>
    <div class="w-64 mt-2">
        <input
            type="range"
            min="1"
            max="5"
            class="range range-primary"
            step="1"
            bind:value={sliderValue}
            onchange={console.log($fuelButtonSpeed)}
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
