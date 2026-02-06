<script>
  import { onMount } from 'svelte';
  import { gameData } from "./stores";
  let elapsed = 0;
  let isRunning = false;

  function toggleTimer() {
    if (isRunning) {
      isRunning = false;
      $gameData["TeleClimbTime"] = elapsed;
    } else {  
      if (elapsed == 0) {
        isRunning = true;
      } else {
        reset();
      }
    }
  }

  function reset() {
    elapsed = 0;
  }
  onMount(() => {
  let last_time = performance.now();
  let frame;

  function update(time) {
    const delta = time - last_time;
    last_time = time;

    if (isRunning) {
      elapsed += delta;
    }
    
    frame = requestAnimationFrame(update);
  }

  frame = requestAnimationFrame(update);

  return () => cancelAnimationFrame(frame);
});
</script>
<button on:click={toggleTimer} class="btn {isRunning ? 'btn-success' : 'btn-primary'}">
  Climb time:<strong> {(Math.round(elapsed) / 1000)}s</strong>
</button>  
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