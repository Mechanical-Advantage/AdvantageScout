<script>
  import Ratings from "./Ratings.svelte";
  import { gameData, uploadState } from "./stores";
  import SortableList from "./SortableList.svelte";
  import Component from "./Component.svelte";
  import BotState from "./BotState.svelte";
  import PickSelection from "./PickSelection.svelte";
  import Watch from "./Watch.svelte";

  console.log("Bot State", $gameData["BotState"]);
  console.log($gameData["EndgameBotState"] == 2);

  let list = [
    { id: 1, name: $gameData["Team1"], content: "" },
    { id: 2, name: $gameData["Team2"], content: "" },
    { id: 3, name: $gameData["Team3"], content: "" },
  ];
  const sortList = (ev) => {
    list = ev.detail;
  };

  let buttonColor = "btn-primary";

  function upload() {
    $uploadState += 1;
  }
</script>

<div class="flex flex-row gap-x-[20px] absolute m-[10px]">
  <div class="flex flex-col gap-y-[20px]">
    <label for="message" class="block mb-2 text-sm font-bold text-white"
      >Team {$gameData["Team1"]}</label
    >
    <label for="message" class="block mb-2 text-sm font-bold text-white"
      >Comment</label
    >
    <textarea
      id="message"
      rows="4"
      class="block p-2.5 w-[400px] h-[200px] text-base rounded-lg border-gray-300 placeholder-gray-400 text-gray-50 bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
      placeholder="15 characters or more..."
      bind:value={$gameData["Team1Comment"]}
    />
    <div class="flex flex-col">
      <Ratings name="TeamRating1" />
      <Ratings name="TeamDriveRating1" />
      <Ratings name="TeamRobotRating1" />
    </div>
    <div class="flex flex-row gap-x-[10px]">
      <PickSelection team="1" />
      <Watch team="1" />
    </div>
    <BotState teamState="1" />
  </div>

  <div class="flex flex-col gap-y-[20px]">
    <label for="message" class="block mb-2 text-sm font-bold text-white"
      >Team {$gameData["Team2"]}</label
    >
    <label for="message" class="block mb-2 text-sm font-bold text-white"
      >Comment</label
    >
    <textarea
      id="message"
      rows="4"
      class="block p-2.5 w-[400px] h-[200px] text-base rounded-lg border-gray-300 placeholder-gray-400 text-gray-50 bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
      placeholder="15 characters or more..."
      bind:value={$gameData["Team2Comment"]}
    />
    <div class="flex flex-col">
      <Ratings name="TeamRating2" />
      <Ratings name="TeamDriveRating2" />
      <Ratings name="TeamRobotRating2" />
    </div>
    <div class="flex flex-row gap-x-[10px]">
      <PickSelection team="2" />
      <Watch team="2" />
    </div>
    <BotState teamState="2" />
  </div>
  <div class="flex flex-col gap-y-[20px]">
    <label for="message" class="block mb-2 text-sm font-bold text-white"
      >Team {$gameData["Team3"]}</label
    >
    <label for="message" class="block mb-2 text-sm font-bold text-white"
      >Comment</label
    >
    <textarea
      id="message"
      rows="4"
      class="block p-2.5 w-[400px] h-[200px] text-base rounded-lg border-gray-300 placeholder-gray-400 text-gray-50 bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
      placeholder="15 characters or more..."
      bind:value={$gameData["Team3Comment"]}
    />
    <div class="flex flex-col">
      <Ratings name="TeamRating3" />
      <Ratings name="TeamDriveRating3" />
      <Ratings name="TeamRobotRating3" />
    </div>
    <div class="flex flex-row gap-x-[10px]">
      <PickSelection team="3" />
      <Watch team="3" />
    </div>
    <BotState teamState="3" />
  </div>
</div>
<button
  class="absolute left-[1250px] top-[50px] btn {$gameData['Team1Comment']
    .length < 1
    ? 'btn-disabled'
    : 'btn-primary'}"
  on:click={upload}>Upload</button
>
