<script>
  import { gameData, uploadState } from "./stores";
  import { teleDataLog } from "./stores";
  import Ratings from "./Ratings.svelte";

  function handleClick(event) {
    $gameData["TeleBotState"] = event.currentTarget.value;
  }
</script>

  <main>
    <div class=" absolute top-[12px] left-[60px] ">
      <label for="message" class="block mb-2 text-sm font-bold text-white"
        >Tele Comment</label
      >
      <textarea
        id="message"
        rows="4"
        class="block p-2.5 w-[400px] h-[200px] text-base rounded-lg border-gray-300 placeholder-gray-400 text-gray-50 bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
        placeholder="15 characters or more..."
        bind:value={$gameData["TeleComment"]}
      />
      <div class="mt-[5px] ">
        <Ratings name="TeleSynergyRating" />
        <Ratings name="DefenseRating" />
      </div>
    </div>
    <div class="absolute left-[515px] top-[25px] ">
      <input
        type="radio"
        name="Bot State"
        class="radio checked:bg-green-500"
        value="1"
        checked={$gameData["TeleBotState"] == 1}
        on:change={handleClick}
      />
      <span class="label-text">No Issues</span>
      <input
        type="radio"
        name="Bot State"
        class="p-3.5 ml-[22px] radio checked:bg-yellow-500"
        value="2"
        checked={$gameData["TeleBotState"] == 2}
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
        checked={$gameData["TeleBotState"] == 3}
        on:change={handleClick}
      />
      <span class="label-text">Power Issues</span>
      <input
        type="radio"
        name="Bot State"
        class="p-3.5 radio checked:bg-yellow-500"
        value="4"
        checked={$gameData["TeleBotState"] == 4}
        on:change={handleClick}
      />
      <span class=" label-text">Major Malfunction</span>
    </div>
    <div class="absolute left-[515px] top-[205px] ">
      <input
        type="radio"
        name="Bot State"
        class="p-3.5 radio checked:bg-red-500"
        value="5"
        checked={$gameData["TeleBotState"] == 5}
        on:change={handleClick}
      />
      <span class="label-text">Fell Over</span>
      <input
        type="radio"
        name="Bot State"
        class="p-3.5 ml-[27px] radio checked:bg-red-500"
        value="6"
        checked={$gameData["TeleBotState"] == 6}
        on:change={handleClick}
      />
      <span class="label-text">Did Not Show</span>
    </div>
    {#if $gameData["TeleBotState"] > 1}
      <div class=" absolute top-[300px] left-[515px] ">
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
    <div class="p-2.5 w-full h-[200px]"></div>


</main>

