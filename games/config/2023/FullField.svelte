<script>
    import Community from "./Community.svelte";
    import { reversedAlliance } from "./stores";

    let fieldConfigurations = {
        0: ["false", "false", "true", "false", "blue", "red"],
        1: ["false", "true", "true", "true", "red", "blue"],
    };

    console.log("Reversed from full field", $reversedAlliance);
</script>

<!-- right side community -->
<div class="absolute left-[730px]">
    <Community
        width="294"
        height="462"
        strokeWidth="5.5"
        xOffset="730"
        flippedH={fieldConfigurations[$reversedAlliance][2]}
        flippedV={fieldConfigurations[$reversedAlliance][3]}
        AllianceColor={fieldConfigurations[$reversedAlliance][5]}
    />
</div>

<!-- left side community -->
<Community
    width="294"
    height="462"
    strokeWidth="5.5"
    flippedH={fieldConfigurations[$reversedAlliance][0]}
    flippedV={fieldConfigurations[$reversedAlliance][1]}
    AllianceColor={fieldConfigurations[$reversedAlliance][4]}
/>
