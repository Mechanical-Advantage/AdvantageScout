<script>
  import StartZone from "./StartZone.svelte";
  import { reversedAlliance, gameData } from "./stores";

  let fieldConfigurations = {
    0: ["false", "false", "true", "false", "blue", "red"],
    1: ["false", "true", "true", "true", "red", "blue"],
  };

  $gameData["ReversedAlliance"] = $reversedAlliance;
</script>

<div class="absolute left-[730px]">
  <StartZone
    width="294"
    height="462"
    strokeWidth="5.5"
    xOffset="730"
    flippedH={fieldConfigurations[$reversedAlliance][2]}
    flippedV={fieldConfigurations[$reversedAlliance][3]}
    AllianceColor={fieldConfigurations[$reversedAlliance][5]}
  />
</div>

<StartZone
  width="294"
  height="462"
  strokeWidth="5.5"
  flippedH={fieldConfigurations[$reversedAlliance][0]}
  flippedV={fieldConfigurations[$reversedAlliance][1]}
  AllianceColor={fieldConfigurations[$reversedAlliance][4]}
/>
