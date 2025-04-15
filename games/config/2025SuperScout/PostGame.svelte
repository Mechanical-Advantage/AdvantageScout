<script>
  import Ratings from "./Ratings.svelte";
  import { gameData, uploadState } from "./stores";
  import SortableList from "./SortableList.svelte";
  import Component from "./Component.svelte";
  

  console.log("Bot State", $gameData["BotState"]);
  console.log($gameData["EndgameBotState"] == 2);

  let list = [
	{id: 1, name: $gameData["Team1"], content: ''},
	{id: 2, name: $gameData["Team2"], content: ''},
	{id: 3, name: $gameData["Team3"], content: ''}
];
const sortList = ev => {list = ev.detail};

  let buttonColor = "btn-primary";
  function handleClick(event) {
    $gameData["EndgameBotState"] = event.currentTarget.value;
  }
  function handleClicked() {
        $gameData["DNP"] = $gameData["DNP"] === 0 ? 1 : 0;

        buttonColor = $gameData["DNP"] === 0 ? "btn-primary" : "btn-error";
    }

  function upload() {
    $gameData["TeamRating1"]=list[0]["name"]
    $gameData["TeamRating2"]=list[1]["name"]
    $gameData["TeamRating3"]=list[2]["name"]
    $gameData["EndgameComment"] = $gameData["EndgameComment"].replace(
      /[^\x20-\x7E]+/g,
      ""
    );
    $uploadState += 1;
  }
</script>

<div class=" absolute top-[25px] left-[60px] ">
  <label for="message" class="block mb-2 text-sm font-bold text-white"
    >{$gameData["Team1"]} Comment</label
  >
  <textarea
    id="message"
    rows="4"
    class="block p-2.5 w-[400px] h-[200px] text-base rounded-lg border-gray-300 placeholder-gray-400 text-gray-50 bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
    placeholder="15 characters or more..."
    bind:value={$gameData["Team1Comment"]}
  />
  </div>
  
<div class=" absolute top-[265px] left-[60px] ">
<label for="message" class="block mb-2 text-sm font-bold text-white"
  >{$gameData["Team2"]} Comment</label
>
  <textarea
    id="message"
    rows="4"
    class="block p-2.5 w-[400px] h-[200px] text-base rounded-lg border-gray-300 placeholder-gray-400 text-gray-50 bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
    placeholder="15 characters or more..."
    bind:value={$gameData["Team2Comment"]}
/>
</div>
<div class=" absolute top-[505px] left-[60px] ">
  <label for="message" class="block mb-2 text-sm font-bold text-white"
    >{$gameData["Team3"]} Comment</label
  >
  <textarea
    id="message"
    rows="4"
    class="block p-2.5 w-[400px] h-[200px] text-base rounded-lg border-gray-300 placeholder-gray-400 text-gray-50 bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
    placeholder="15 characters or more..."
    bind:value={$gameData["Team3Comment"]}
  />
</div>
  
    <div class="absolute left-[975px] top-[25px] mt-[10px] ">
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
      <div class="p-2.5 w-full h-[150px]">
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
        <div class="p-2.5 w-full h-[150px]">
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
<div class=" absolute top-[505px] left-[560px] ">
  <div class="  h-full">
    <Ratings name="DefenseRating" />
 </div>
<SortableList 
{list} 
key="id" 
on:sort={sortList}
let:item
let:index
>
<Component {item} {index}/>
</SortableList>
</div>
<!-- <div class="absolute left-[515px] top-[25px] ">
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
</div> -->
<div class="absolute top-[300px] left-[325px] p-2.5 w-full h-[200px]"></div>
<!-- {#if $gameData["EndgameBotState"] > 1}
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
{/if} -->
<div class="absolute left-[550px] top-[50px] ">
  <button class="w-[250px] h-[80px] btn {$gameData["DNP"] === 0 ? "btn-primary" : "btn-error"}" on:click={handleClicked}
      >DNP?</button
  >
</div>
{#if $gameData["DNP"] > 0}
  <div class="absolute top-[175px] left-[550px]">
    <label for="message" class="block mb-2 text-sm font-bold text-white"
      >DNP Comment</label
    >
    <textarea
      id="message"
      rows="4"
      placeholder="Need a lot of words to be able to consider the team(s) DNP..."
      class="block p-2.5 w-[400px] h-[200px] text-base rounded-lg border-gray-300 placeholder-gray-400 text-gray-50 bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
      bind:value={$gameData["DNPComment"]}
    />
  </div>
   
{/if}

    <button
      class="absolute left-[1250px] top-[50px] btn {$gameData['Team1Comment'].length < 1
        ? 'btn-disabled'
        : 'btn-primary'}"
      on:click={upload}>Upload</button
    >

