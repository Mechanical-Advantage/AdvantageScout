<script>
import { gameData } from './stores.js';
    export let name = "";

</script>
<div class="flex flex-col items-center justify-center">
    <div class="text-3xl mt-2">
        {name}
    </div>
    <div class="w-64 mt-2">
        <input type="range" min="0" max="100" class="range range-primary" step="25" bind:value={$gameData[name]}/>
        <div class="w-[270px] flex justify-between text-s px-4">
            <span>{name === ("UnderDefenseDuration") ? "None" : name === "PlayingDefenseDuration" ? "None" : "1"}</span>
            <span>{name === ("UnderDefenseDuration") ? "None" : name === "PlayingDefenseDuration" ? "15s" : "2"}</span>
            <span>{name === ("UnderDefenseDuration") ? "None" : name === "PlayingDefenseDuration" ? "60s" : "3"}</span>
            <span>{name === ("UnderDefenseDuration") ? "None" : name === "PlayingDefenseDuration" ? "90s" : "4"}</span>
            <span>{name === ("UnderDefenseDuration") ? "None" : name === "PlayingDefenseDuration" ? "All" : "5"}</span>
        </div>
    </div>
</div>