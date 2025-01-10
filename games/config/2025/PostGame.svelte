<script>
  import Ratings from "./Ratings.svelte";
  import { gameData, uploadState } from "./stores";
  import Nodes from "./Nodes.svelte";
  import Parked from "./Parked.svelte";
  import TeleClimbShallow from "./ShallowClimb.svelte";
  import TeleClimbDeep from "./DeepClimb.svelte";


 console.log("Bot State", $gameData["BotState"])
 console.log($gameData["BotState"] == 2)

  let buttonColor = "btn-primary";
  function handleClick(event) {
    $gameData["BotState"] = event.currentTarget.value;
    // $gameData["Disabled"] && $gameData["Inoperable"] && $gameData["NoIssue"] == $gameData["Disabled"] && $gameData["Inoperable"] && $gameData["NoIssue"]  === 0 ? 1 : 0;
    // $gameData["Disabled"] = $gameData["Disabled"]  === 0 ? 1 : 0;
    // buttonColor = $gameData["Disabled"] === 0 ? "btn-primary" : "btn-error";
  }

  function upload() {
    $gameData["Comment"] = $gameData["Comment"].replace(/[^\x20-\x7E]+/g, "");
    $gameData["Points"] =
      $gameData["Points"] === null ? 0 : $gameData["Points"];
    $gameData["Penalties"] =
      $gameData["Penalties"] === null ? 0 : $gameData["Penalties"];
    $uploadState += 1;
  }
</script>

<div class="flex flex-col h-full">
  <div class="grid grid-cols-3 w-full h-full">
    <div class="  h-full">
      <Ratings name="DriverRating" />
      <Ratings name="PlayingDefenseDuration" />
      <Ratings name="UnderDefenseDuration" />
      <div class="absolute ml-[50px] mt-[30px]">
  <div class="flex flex-col gap-y-2">
    <Parked />
  </div>
</div>
<div class="absolute ml-[125px] mt-[30px]">
  <div class="flex flex-col gap-y-2">
    <TeleClimbDeep/>
  </div>
</div>
<div class="absolute ml-[200px] mt-[30px]">
  <div class="flex flex-col gap-y-2">
    <TeleClimbShallow/>
  </div>
</div>
    </div>
    <div class="  h-full">
      <Ratings name="CoralIntakeRating" />
      <Ratings name="AlgaeIntakeRating" />
      <Ratings name="DefenseRating" />
      <Ratings name="UnderDefenseRating" />
    </div>
    <div class=" mt-[25px] h-full">
      <label for="message" class="block mb-2 text-sm font-bold text-white"
        >Comment</label
      >
      <textarea
        id="message"
        rows="4"
        class="block p-2.5 w-full text-sm rounded-lg border border-gray-300 placeholder-gray-400 text-gray-50 bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
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
        class="inline-flex p-2.5 items-center text-sm border border-r-0 border-gray-300 rounded-l-md bg-gray-600 text-gray-200 border-gray-600"
      >
        Points
      </span>
      <input
        type="number"
        class="rounded-none rounded-r-lg w-[90px] p-2.5 text-sm bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        bind:value={$gameData["Points"]}
        min="0"
      />
    </div>
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
