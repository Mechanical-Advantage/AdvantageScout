<script>
  import { gameData } from "./stores";
  export let team;
  let dockButton = "TeamWatch" + team;
  console.log(dockButton);
  function handleClick() {
    $gameData[dockButton] = $gameData[dockButton] == 1 ? 0 : 1;
  }
</script>

<button
  class="btn {$gameData[dockButton] === 0 ? 'btn-primary' : 'btn-secondary'}"
  on:click={handleClick}
>
  Watch?
</button>

<style>
  .btn {
    padding: 5px 10px;
    font-size: 12px;
  }

  .btn-primary {
    background-color: rgb(0, 51, 255);
    color: white;
  }
</style>
