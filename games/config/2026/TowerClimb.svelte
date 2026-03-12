<script>
  import { gameData, gameState } from "./stores";
  import { track } from "./tracker.js";

  export let buttonType = "L1";
  let prefix = $gameState == 0 ? "AutoClimb" : "TeleClimb";
  let dockButton = prefix + buttonType;
  let otherButtonTypes = ["L1", "L2", "L3"];
  otherButtonTypes = otherButtonTypes.filter((type) => type !== buttonType);
  function handleClick() {
    if ($gameData[dockButton] === 2) {
      $gameData[dockButton] = 0;
    } else {
      $gameData[dockButton] = $gameData[dockButton] + 1;
    }
  }
  let buttonSize = "btn-small";
</script>

<button
  class="btn {$gameData[dockButton] === 0
    ? 'btn-primary'
    : $gameData[dockButton] === 1
      ? 'btn-secondary'
      : 'btn-success'}"
  on:click={handleClick}
  use:track={"TowerClimb" + buttonType}>Climb {buttonType}?</button
>

<style>
  .btn {
    padding: 1px 10px;
    font-size: 10px;
  }

  .btn-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-primary {
    background-color: rgb(0, 51, 255);
    color: white;
  }

  .btn-success {
    background-color: green;
    color: white;
  }
</style>
