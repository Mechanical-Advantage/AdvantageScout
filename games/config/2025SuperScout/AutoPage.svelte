<script>
  //import ButtonGroup from "./ButtonGroup.svelte";
  import { gameData, autoState } from "./stores";
  import Ratings from "./Ratings.svelte";
  let buttonColor = "btn-primary";

  function handleClick(event) {
    $gameData["AutoBotState"] = event.currentTarget.value;
  }
  function handleClicked() {
        $gameData["AllianceColor"] = $gameData["AllianceColor"] === 0 ? 1 : 0;

        buttonColor = $gameData["AllianceColor"] === 0 ? "btn-primary" : "btn-error";
    }
    function handledClick() {
        $autoState = 0;
        $gameData["DefenseOnly"] = 0;

    }
</script>

<main>
  <div class=" absolute top-[25px] left-[60px] ">
    <label for="message" class="block mb-2 text-sm font-bold text-white"
      >Auto Comment</label
    >
    <textarea
      id="message"
      rows="4"
      class="block p-2.5 w-[400px] h-[200px] text-base rounded-lg border-gray-300 placeholder-gray-400 text-gray-50 bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
      placeholder="15 characters or more..."
      bind:value={$gameData["AutoComment"]}
    />
    <div class="mt-[60px] ">
      <Ratings name="AutoSynergyRating" />
    </div>
  </div>
  <div class="absolute left-[515px] top-[25px] ">
    <input
      type="radio"
      name="Bot State"
      class="radio checked:bg-green-500"
      value="1"
      checked={$gameData["AutoBotState"] == 1}
      on:change={handleClick}
    />
    <span class="label-text">No Issues</span>
    <input
      type="radio"
      name="Bot State"
      class="p-3.5 ml-[22px] radio checked:bg-yellow-500"
      value="2"
      checked={$gameData["AutoBotState"] == 2}
      on:change={handleClick}
    />
    <span class="label-text">Comms Issue</span>
  </div>
  <div class="absolute left-[515px] top-[115px] ">
    <input
      type="radio"
      name="Bot State"
      class="radio checked:bg-yellow-500"
      value="3"
      checked={$gameData["AutoBotState"] == 3}
      on:change={handleClick}
    />
    <span class="label-text">Power Issues</span>
    <input
      type="radio"
      name="Bot State"
      class="p-3.5 radio checked:bg-yellow-500"
      value="4"
      checked={$gameData["AutoBotState"] == 4}
      on:change={handleClick}
    />
    <span class=" label-text">Major Malfunction</span>
  </div>
  <div class="absolute left-[515px] top-[205px]">
    <input
      type="radio"
      name="Bot State"
      class="p-3.5 radio checked:bg-red-500"
      value="5"
      checked={$gameData["AutoBotState"] == 5}
      on:change={handleClick}
    />
    <span class="label-text">Fell Over</span>
    <input
      type="radio"
      name="Bot State"
      class="p-3.5 ml-[27px] radio checked:bg-red-500"
      value="6"
      checked={$gameData["AutoBotState"] == 6}
      on:change={handleClick}
    />
    <span class="label-text">Did Not Show</span>
  </div>
  {#if $gameData["AutoBotState"] > 1}
    <div class=" absolute top-[300px] left-[515px]">
      <label for="message" class="block mb-2 text-sm font-bold text-white"
        >Disabled Comment</label
      >
      <textarea
        id="message"
        rows="4"
        class="block p-2.5 w-[350px] h-[85px] text-base rounded-lg border-gray-300 placeholder-gray-400 text-gray-50 bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
        placeholder="15 characters or more..."
        bind:value={$gameData["DisabledComment"]}
      />
    </div>
  {/if}
  <div class="absolute left-[215px] top-[265px] ">
    <button class="w-[75px] h-[35px] btn {$gameData["AllianceColor"] === 0 ? "btn-primary" : "btn-error"}" on:click={handleClicked}
        >Alliance Color</button
    >
  <div class="p-2.5 w-full h-[200px]"></div>
</div>
<div class="absolute top-[265px] left-[675px]">
  <div class="flex flex-col gap-y-[25px]">
      <button class="btn btn-primary" on:click={handledClick}>Back</button>
     
  </div>
</main>
