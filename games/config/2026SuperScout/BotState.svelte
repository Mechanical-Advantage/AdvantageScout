<script>
  import { gameData } from "./stores";
  export let teamIndex;
  let fieldName = "TeamBotState" + teamIndex;
  function handleClick(event) {
    $gameData[fieldName] = event.currentTarget.value;
  }
</script>
<div class="mx-[15px] my-[5px]">
  <input
    type="radio"
    name="Bot State"
    class="radio checked:bg-green-500"
    value="1"
    checked={$gameData[fieldName] == 1}
    on:change={handleClick}
  />
  <span class="label-text">No Issues</span>
  <input
    type="radio"
    name="Bot State"
    class="p-3.5 ml-[22px] radio checked:bg-yellow-500"
    value="2"
    checked={$gameData[fieldName] == 2}
    on:change={handleClick}
  />
  <span class="label-text">Comms Issue</span>
</div>
<div class="mx-[15px] my-[5px]">
  <input
    type="radio"
    name="Bot State"
    class="radio checked:bg-yellow-500"
    value="3"
    checked={$gameData[fieldName] == 3}
    on:change={handleClick}
  />
  <span class="label-text">Power Issues</span>
  <input
    type="radio"
    name="Bot State"
    class="p-3.5 radio checked:bg-yellow-500"
    value="4"
    checked={$gameData[fieldName] == 4}
    on:change={handleClick}
  />
  <span class=" label-text">Major Malfunction</span>
</div>
<div class="mx-[15px] my-[5px]">
  <input
    type="radio"
    name="Bot State"
    class="p-3.5 radio checked:bg-red-500"
    value="5"
    checked={$gameData[fieldName] == 5}
    on:change={handleClick}
  />
  <span class="label-text">Fell Over</span>
  <input
    type="radio"
    name="Bot State"
    class="p-3.5 ml-[27px] radio checked:bg-red-500"
    value="6"
    checked={$gameData[fieldName] == 6}
    on:change={handleClick}
  />
  <span class="label-text">Did Not Show</span>
</div>