<script>
    import { gameData } from "./stores.js";
    export let name = "";
    export let displayName = "";
    export let rangeType = "";
    export let step = 1;
    export let isDuration = false;

    let ratingValue = $gameData[name] * 2;

    $: ratingValue, ($gameData[name] = ratingValue / 2);
    let displayValues = {
        PlayingDefenseDuration: ["range-success","Playing Defense Duration",2 ],
        UnderDefenseDuration: ["range-error", "Under Defense Duration", 2],
        BotState: ["range-primary", "Disabled", "Inoperable", "No Issue", 2],
        DriverRating: ["range-primary", "Driver Rating", 1],
        FuelIntakeRating: ["range-primary", "Fuel Intake Rating", 1],
        DefenseRating: ["range-success", "Defense Rating", 1],
        UnderDefenseRating: ["range-error", "Under Defense Rating", 1],
        CrossBumpRating: ["range-secondary", "Cross Bump Rating", 1]
    };
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
            step={step}
            bind:value={ratingValue}
        />
        <div class="w-full flex justify-between text-s px-2">
            <span>{isDuration ? "N/A" : 0}</span>
            <span>{isDuration ? "15s": 1}</span>
            <span>{isDuration ? "30s": 2}</span>
            <span>{isDuration ? "60s": 3}</span>
            <span>{isDuration ? "90s": 4}</span>
            <span>{isDuration ? "All": 5}</span>
        </div>
    </div>
</div>
