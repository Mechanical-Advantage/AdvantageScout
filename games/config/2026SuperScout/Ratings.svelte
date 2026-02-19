<script>
  import { gameData } from "./stores.js";
  export let name = "";

  let ratingValue = $gameData[name] * 2;

  $: ratingValue, ($gameData[name] = ratingValue / 2);
  let displayValues = {
    TeamRating1: ["range-success", "Team Rating", 1],
    TeamDriveRating1: ["range-success", "Drive Rating", 1],
    TeamRobotRating1: ["range-success", "Robot Rating", 1],
    TeamRating2: ["range-success", "Team Rating", 1],
    TeamDriveRating2: ["range-success", "Drive Rating", 1],
    TeamRobotRating2: ["range-success", "Robot Rating", 1],
    TeamRating3: ["range-success", "Team Rating", 1],
    TeamDriveRating3: ["range-success", "Drive Rating", 1],
    TeamRobotRating3: ["range-success", "Robot Rating", 1],
  };
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
    />
    <div class="w-full flex justify-between text-s px-2">
      <span>0</span>
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
    </div>
  </div>
</div>
