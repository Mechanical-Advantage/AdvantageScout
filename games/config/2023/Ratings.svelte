<script>
import { gameData } from './stores.js';
    export let name = "";

    let ratingValue = 0

    $: ratingValue, $gameData[name] = ratingValue/2

    let displayValues = {
    "PlayingDefenseDuration": ["range-success", "Playing Defense Duration", 2],
    "UnderDefenseDuration": ["range-error", "Under Defense Duration", 2],
    "Disabled": ["range-primary", "Disabled/Fell"],
    "DriverRating": ["range-primary", "Driver Rating", 1],
    "CubeIntakeRating": ["range-accent", "Cube Intake Rating", 1],
    "ConeIntakeRating": ["range-secondary", "Cone Intake Rating", 1],
    "DefenseRating": ["range-success", "Defense Rating", 1],
    "UnderDefenseRating": ["range-error", "Under Defense Rating", 1]
    }

</script>
<div class="flex flex-col items-center justify-center">
    <div class="text-xl mt-2 font-bold">
        {displayValues[name][1]}
    </div>
    <div class="w-64 mt-2">
        <input type="range" min="0" max="10" class="range {displayValues[name][0]}" step={displayValues[name][2]} bind:value={ratingValue}/>
        <div class="w-full flex justify-between text-s px-2" >
            <span>{name === ("UnderDefenseDuration") ? "N/A" : name === "PlayingDefenseDuration" ? "N/A" : "0"}</span>
            <span>{name === ("UnderDefenseDuration") ? "15s" : name === "PlayingDefenseDuration" ? "15s" : "1"}</span>
            <span>{name === ("UnderDefenseDuration") ? "30s" : name === "PlayingDefenseDuration" ? "30s" : "2"}</span>
            <span>{name === ("UnderDefenseDuration") ? "60s" : name === "PlayingDefenseDuration" ? "60s" : "3"}</span>
            <span>{name === ("UnderDefenseDuration") ? "90s" : name === "PlayingDefenseDuration" ? "90s" : "4"}</span>
            <span>{name === ("UnderDefenseDuration") ? "All" : name === "PlayingDefenseDuration" ? "All" : "5"}</span>
        </div>
    </div>
    </div>
