<script>
  import { gameData, autoState, currentSchedule } from "./stores";
  let buttonColor = "btn-primary";

  if ($gameData["AllianceColor"] == 0) {
    $gameData["Team1"] = $currentSchedule["teams"][0];
    $gameData["Team2"] = $currentSchedule["teams"][1];
    $gameData["Team3"] = $currentSchedule["teams"][2];
  } else {
    $gameData["Team1"] = $currentSchedule["teams"][3];
    $gameData["Team2"] = $currentSchedule["teams"][4];
    $gameData["Team3"] = $currentSchedule["teams"][5];
  }

  function handleClicked() {
    $gameData["AllianceColor"] = $gameData["AllianceColor"] === 0 ? 1 : 0;

    buttonColor =
      $gameData["AllianceColor"] === 0 ? "btn-primary" : "btn-error";

    if ($gameData["AllianceColor"] == 0) {
      $gameData["Team1"] = $currentSchedule["teams"][0];
      $gameData["Team2"] = $currentSchedule["teams"][1];
      $gameData["Team3"] = $currentSchedule["teams"][2];
    } else {
      $gameData["Team1"] = $currentSchedule["teams"][3];
      $gameData["Team2"] = $currentSchedule["teams"][4];
      $gameData["Team3"] = $currentSchedule["teams"][5];
    }
  }
  function handledClick() {
    $autoState = 0;
  }
  console.log("current schedule: ", $currentSchedule);
  console.log($currentSchedule["teams"]);
</script>

<main>
  <div class="flex flex-row gap-x-[20px] absolute m-[10px]">
    <div>
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

    <div>
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
    <div>
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
  </div>
  <div class="absolute left-[975px] top-[250px]">
    <button
      class="w-[75px] h-[35px] btn {$gameData['AllianceColor'] === 0
        ? 'btn-primary'
        : 'btn-error'}"
      on:click={handleClicked}>Alliance Color</button
    >
    <div class="p-2.5 w-full h-[200px]"></div>
  </div>
  <div class="absolute top-[265px] left-[675px]">
    <div class="flex flex-col gap-y-[25px]">
      <button class="btn btn-primary" on:click={handledClick}>Back</button>
    </div>
  </div>
</main>
