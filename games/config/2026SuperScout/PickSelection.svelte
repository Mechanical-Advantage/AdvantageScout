<script>
  import { gameData } from "./stores";
  export let team;
  let dockButton = "TeamPick" + team;
  let values = ["1st Pick", "2nd Pick", "2nd Pick Steal", "DNP"];
  function handleClick() {
    if ($gameData[dockButton] === 3) {
      $gameData[dockButton] = 0;
    } else {
      $gameData[dockButton] = $gameData[dockButton] + 1;
    }
  }
</script>

<button
  class="btn {$gameData[dockButton] < 3 ? 'btn-primary' : 'btn-error'}"
  on:click={handleClick}>{values[$gameData[dockButton]]}</button
>

<style>
  .btn {
    padding: 1px 10px;
    width: 80px;
    font-size: 10px;
  }

  .btn-primary {
    background-color: rgb(0, 51, 255);
    color: white;
  }
</style>
