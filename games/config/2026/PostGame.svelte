<script>
  import Rating from "./Rating.svelte";
  import { gameData, uploadState, fuelCycleCountSuccess, fuelCycleCountFail } from "./stores";

  console.log("Bot State", $gameData["BotState"]);
  console.log($gameData["BotState"] == 2);

  let buttonColor = "btn-primary";
  function handleClick(event) {
    $gameData["BotState"] = event.currentTarget.value;
  }

  function upload() {
    $gameData["TeleHubFuelCyclesSuccess"].push($fuelCycleCountSuccess);
    $gameData["TeleHubFuelCyclesFail"].push($fuelCycleCountFail);
    
    $fuelCycleCountSuccess = 0;
    $fuelCycleCountFail = 0;
    $gameData["Comment"] = $gameData["Comment"].replace(/[^\x20-\x7E]+/g, "");
    $gameData["Penalties"] =
    $gameData["Penalties"] === null ? 0 : $gameData["Penalties"];
    $uploadState += 1;
  }
</script>

<div class="flex flex-col h-full">
  <div class="grid grid-cols-3 w-full h-full">
    <div class="h-full">
      <Rating name="DriverRating" displayName="Driver Rating" rangeType="range-primary" />
      <Rating name="PlayingDefenseDuration" displayName="Playing Defense Duration" rangeType="range-success" step=2 isDuration={true} />
      <Rating name="UnderDefenseDuration" displayName="Under Defense Duration" rangeType="range-error" step=2 isDuration={true} />
      <Rating name="BeachedDuration"displayName="Beached Duration" rangeType="range-error" step=2 isDuration={true} />
    </div>
    <div class="h-full">
      <Rating name="FuelIntakeRating" displayName="Fuel Intake Rating" rangeType="range-primary" />
      <Rating name="DefenseRating" displayName="Defense Rating" rangeType="range-success" />
      <Rating name="UnderDefenseRating" displayName="Under Defense Rating"  rangeType="range-error" />
      <Rating name="CrossBumpRating" displayName="Cross Rating" rangeType="range-secondary" />
    </div>  
    <div class="mt-[25px] h-full">
      <label for="message" class="block mb-2 text-sm font-bold text-white"
        >Comment</label
      >
      <textarea
        id="message"
        rows="4"
        class="block p-2.5 w-full text-base rounded-lg border border-gray-300 placeholder-gray-400 text-gray-50 bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
        placeholder="15 characters or more..."
        bind:value={$gameData["Comment"]}
      />
      <div class="flex flex-row gap-x-[10px] ml-[30px] mt-[30px]">
        <input
          type="radio"
          name="Bot State"
          class="radio checked:bg-green-500"
          value="1"
          checked={$gameData["BotState"] == 1}
          on:change={handleClick}
        />
        <span class="label-text">No Issues</span>
        <input
          type="radio"
          name="Bot State"
          class="p-2.5 ml-[22px] radio checked:bg-yellow-500"
          value="2"
          checked={$gameData["BotState"] == 2}
          on:change={handleClick}
        />
        <span class="label-text">Comms Issue</span>
      </div>
      <div class="flex flex-row gap-x-[10px] ml-[30px] mt-[30px]">
        <input
          type="radio"
          name="Bot State"
          class="radio checked:bg-yellow-500"
          value="3"
          checked={$gameData["BotState"] == 3}
          on:change={handleClick}
        />
        <span class="label-text">Power Issues</span>
        <input
          type="radio"
          name="Bot State"
          class="p-2.5 radio checked:bg-yellow-500"
          value="4"
          checked={$gameData["BotState"] == 4}
          on:change={handleClick}
        />
        <span class=" label-text">Major Malfunction</span>
      </div>
      <div class="flex flex-row gap-x-[10px] ml-[30px] mt-[30px]">
        <input
          type="radio"
          name="Bot State"
          class="p-2.5 radio checked:bg-red-500"
          value="5"
          checked={$gameData["BotState"] == 5}
          on:change={handleClick}
        />
        <span class="label-text">Fell Over</span>
        <input
          type="radio"
          name="Bot State"
          class="p-2.5 ml-[27px] radio checked:bg-red-500"
          value="6"
          checked={$gameData["BotState"] == 6}
          on:change={handleClick}
        />
        <span class="label-text">Did Not Show</span>
      </div>
    </div>
  </div>
  <div class="p-2.5 w-full h-[200px]">
    <div class="inline-flex bg-gray-700">
      <span
        class="inline-flex items-center p-2.5 text-sm border border-r-0 border-gray-300 rounded-l-md bg-gray-600 text-gray-200 border-gray-600"
      >
        Penalties
      </span>
      <input
        type="number"
        class="rounded-none rounded-r-lg w-[90px] p-2.5 text-sm bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        bind:value={$gameData["Penalties"]}
        min="0"
      />
    </div>
    <button
      class="btn {$gameData['Comment'].length < 14
        ? 'btn-disabled'
        : 'btn-primary'}"
      on:click={upload}>Upload</button
    >
  </div>
</div>
