<script>
  import Ratings from "./Ratings.svelte";
  import { gameData, uploadState } from "./stores";

  console.log("Bot State", $gameData["BotState"]);
  console.log($gameData["EndgameBotState"] == 2);

  let buttonColor = "btn-primary";
  function handleClick(event) {
    $gameData["EndgameBotState"] = event.currentTarget.value;
  }
  function handleClicked() {
        $gameData["DNP"] = $gameData["DNP"] === 0 ? 1 : 0;

        buttonColor = $gameData["DNP"] === 0 ? "btn-primary" : "btn-error";
    }

  function upload() {
    $gameData["EndgameComment"] = $gameData["EndgameComment"].replace(
      /[^\x20-\x7E]+/g,
      ""
    );
    $uploadState += 1;
  }
</script>

<div class=" absolute top-[25px] left-[60px] ">
  <label for="message" class="block mb-2 text-sm font-bold text-white"
    >Endgame Comment</label
  >
  <textarea
    id="message"
    rows="4"
    class="block p-2.5 w-[400px] h-[200px] text-base rounded-lg border-gray-300 placeholder-gray-400 text-gray-50 bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
    placeholder="15 characters or more..."
    bind:value={$gameData["EndgameComment"]}
  />
  <div class="p-2.5 w-full h-[200px]">
    <div class="inline-flex bg-gray-700">
      <span
        class="inline-flex items-center p-2.5 text-sm border border-r-0 border-gray-300 rounded-l-md bg-gray-600 text-gray-200 border-gray-600"
      >
        TeamRating1
      </span>
      <input
        type="number"
        class="rounded-none rounded-r-lg w-[90px] p-2.5 text-sm bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        bind:value={$gameData["TeamRating1"]}
        min="0"
      />
    </div>
    <div class="p-2.5 w-full h-[200px]">
      <div class="inline-flex bg-gray-700">
        <span
          class="inline-flex items-center p-2.5 text-sm border border-r-0 border-gray-300 rounded-l-md bg-gray-600 text-gray-200 border-gray-600"
        >
          TeamRating2
        </span>
        <input
          type="number"
          class="rounded-none rounded-r-lg w-[90px] p-2.5 text-sm bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          bind:value={$gameData["TeamRating2"]}
          min="0"
        />
      </div>
      <div class="p-2.5 w-full h-[200px]">
        <div class="inline-flex bg-gray-700">
          <span
            class="inline-flex items-center p-2.5 text-sm border border-r-0 border-gray-300 rounded-l-md bg-gray-600 text-gray-200 border-gray-600"
          >
            TeamRating3
          </span>
          <input
            type="number"
            class="rounded-none rounded-r-lg w-[90px] p-2.5 text-sm bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            bind:value={$gameData["TeamRating3"]}
            min="0"
          />
        </div>
      </div>
    </div>
  </div>
</div>
<div class="absolute left-[515px] top-[25px] ">
  <input
    type="radio"
    name="Bot State"
    class="radio checked:bg-green-500"
    value="1"
    checked={$gameData["EndgameBotState"] == 1}
    on:change={handleClick}
  />
  <span class="label-text">No Issues</span>
  <input
    type="radio"
    name="Bot State"
    class="p-3.5 ml-[22px] radio checked:bg-yellow-500"
    value="2"
    checked={$gameData["EndgameBotState"] == 2}
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
    checked={$gameData["EndgameBotState"] == 3}
    on:change={handleClick}
  />
  <span class="label-text">Power Issues</span>
  <input
    type="radio"
    name="Bot State"
    class="p-3.5 radio checked:bg-yellow-500"
    value="4"
    checked={$gameData["EndgameBotState"] == 4}
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
    checked={$gameData["EndgameBotState"] == 5}
    on:change={handleClick}
  />
  <span class="label-text">Fell Over</span>
  <input
    type="radio"
    name="Bot State"
    class="p-3.5 ml-[27px] radio checked:bg-red-500"
    value="6"
    checked={$gameData["EndgameBotState"] == 6}
    on:change={handleClick}
  />
  <span class="label-text">Did Not Show</span>
</div>
<div class="absolute top-[300px] left-[325px] p-2.5 w-full h-[200px]"></div>
{#if $gameData["EndgameBotState"] > 1}
  <div class=" absolute top-[300px] left-[515px] ">
    <label for="message" class="block mb-2 text-sm font-bold text-white"
      >Disabled Comment</label
    >
    <textarea
      id="message"
      rows="4"
      class="block p-2.5 w-[300px] h-[85px] text-base rounded-lg border-gray-300 placeholder-gray-400 text-gray-50 bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
      placeholder="15 characters or more..."
      bind:value={$gameData["DisabledComment"]}
    />
  </div>
{/if}
<div class="absolute top-[550px] left-[325px]">
  <button class="btn {buttonColor}" on:click={handleClicked}
      >DNP?</button
  >
</div>
{#if $gameData["DNP"] > 0}
  <div class=" absolute top-[750px] left-[515px] ">
    <label for="message" class="block mb-2 text-sm font-bold text-white"
      >DNP Comment</label
    >
    <textarea
      id="message"
      rows="4"
      class="block p-2.5 w-[300px] h-[85px] text-base rounded-lg border-gray-300 placeholder-gray-400 text-gray-50 bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
      placeholder="15 characters or more..."
      bind:value={$gameData["DNPComment"]}
    />
  </div>
{/if}
    <button
      class="absolute left-[300] top-[350] btn {$gameData['EndgameComment'].length < 14
        ? 'btn-disabled'
        : 'btn-primary'}"
      on:click={upload}>Upload</button
    >

