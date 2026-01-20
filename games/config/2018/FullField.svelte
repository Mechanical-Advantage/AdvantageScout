<script>
    import StartZone from "./StartZone.svelte";
    import { reversedAlliance, gameData, selectedCommunity } from "./stores";

    let fieldConfigurations = {
        0: ["false", "false", "true", "false", "blue", "red"],
        1: ["false", "true", "true", "true", "red", "blue"],
    };
    
    $gameData["ReversedAlliance"] = $reversedAlliance;


</script>

<!-- right side community -->


<div class="absolute left-[470px]">
    <StartZone
        width="492"
        height="693"
        strokeWidth="5.5"
        xOffset="470"
        flippedH={fieldConfigurations[$reversedAlliance][2]}
        flippedV={fieldConfigurations[$reversedAlliance][3]}
        AllianceColor={fieldConfigurations[$reversedAlliance][5]}
    />
</div>

<!-- left side community -->
<StartZone
    width="492"
    height="693"
    strokeWidth="5.5"
    flippedH={fieldConfigurations[$reversedAlliance][0]}
    flippedV={fieldConfigurations[$reversedAlliance][1]}
    AllianceColor={fieldConfigurations[$reversedAlliance][4]}
/>

