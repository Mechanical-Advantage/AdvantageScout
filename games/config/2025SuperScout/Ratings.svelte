<script>
    import { gameData } from "./stores.js";
    export let name = "";

    let ratingValue = $gameData[name] * 2;


    $: ratingValue, ($gameData[name] = ratingValue / 2);
    let displayValues = {
        AutoBotState: ["range-primary", "Disabled", "Inoperable", "No Issue", 2],
        TeleBotState: ["range-primary", "Disabled", "Inoperable", "No Issue", 2],
        EndgameBotState: ["range-primary", "Disabled", "Inoperable", "No Issue", 2],
        AutoSynergyRating: ["range-success", "Synergy Rating", 1],
        TeleSynergyRating: ["range-success", "Synergy Rating", 1],
        DefenseRating: ["range-success", "Defense Rating", 1],
    };
    console.log("pop" + name)
    console.log("ratings " + displayValues[name])
    console.log("ratings " + ratingValue)
    console.log("gameData " + $gameData[name])
</script>

<div class="flex flex-col items-center justify-center">
    <div class="text-xl mt-2 font-bold">
        {displayValues[name][1]}
    </div>
    <div class="w-64 mt-2">
        <input
            type="range"
            min="0"
            max="10"
            class="range {displayValues[name][0]}"
            step={displayValues[name][2]}
            bind:value={ratingValue}
        /><div class="w-full flex justify-between text-s px-2">
            <span
                >{name === "UnderDefenseDuration"
                    ? "N/A"
                    : name === "PlayingDefenseDuration"
                    ? "N/A"
                    : "0"}</span
            >
            <span
                >{name === "UnderDefenseDuration"
                    ? "15s"
                    : name === "PlayingDefenseDuration"
                    ? "15s"
                    : "1"}</span
            >
            <span
                >{name === "UnderDefenseDuration"
                    ? "30s"
                    : name === "PlayingDefenseDuration"
                    ? "30s"
                    : "2"}</span
            >
            <span
                >{name === "UnderDefenseDuration"
                    ? "60s"
                    : name === "PlayingDefenseDuration"
                    ? "60s"
                    : "3"}</span
            >
            <span
                >{name === "UnderDefenseDuration"
                    ? "90s"
                    : name === "PlayingDefenseDuration"
                    ? "90s"
                    : "4"}</span
            >
            <span
                >{name === "UnderDefenseDuration"
                    ? "All"
                    : name === "PlayingDefenseDuration"
                    ? "All"
                    : "5"}</span
            >
        </div>
    </div>
</div>
