<script>
  import { gameData } from "./stores";

  function handleClick() {
    if ($gameData["AutoClimbDismount"] === 2) {
      $gameData["AutoClimbDismount"] = 0;
    } else {
      $gameData["AutoClimbDismount"] = $gameData["AutoClimbDismount"] + 1;
    }
  }
</script>

<button
  class="btn {$gameData['AutoClimbDismount'] === 0
    ? 'btn-primary'
    : $gameData['AutoClimbDismount'] === 1
      ? 'btn-secondary'
      : 'btn-success'}"
  on:click={handleClick}
>
  Dismount L1
</button>

<style>
  .btn {
    padding: 5px 10px;
    font-size: 12px;
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
