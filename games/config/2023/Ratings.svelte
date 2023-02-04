<script>
import { gameData } from './stores.js';
    export let name = "";

</script>
<div class="flex flex-col items-center justify-center">
    <div class="text-3xl mt-2">
        {name}
    </div>
    <div class="w-64 mt-2">
        
        <input type="range" min="0" max="10" class="range range-primary" step="1" bind:value={$gameData[name]}/>
        <div class="w-full flex justify-between text-s px-2" >
            <span>{name === ("UnderDefenseDuration") ? "None" : name === "PlayingDefenseDuration" ? "N/A" : "0"}</span>
            <span>{name === ("UnderDefenseDuration") ? "None" : name === "PlayingDefenseDuration" ? "15s" : "1"}</span>
            <span>{name === ("UnderDefenseDuration") ? "None" : name === "PlayingDefenseDuration" ? "30s" : "2"}</span>
            <span>{name === ("UnderDefenseDuration") ? "None" : name === "PlayingDefenseDuration" ? "60s" : "3"}</span>
            <span>{name === ("UnderDefenseDuration") ? "None" : name === "PlayingDefenseDuration" ? "90s" : "4"}</span>
            <span>{name === ("UnderDefenseDuration") ? "None" : name === "PlayingDefenseDuration" ? "All" : "5"}</span>
        </div>
    </div>
    </div>
