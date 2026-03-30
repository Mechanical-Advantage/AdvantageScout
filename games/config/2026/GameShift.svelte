<script>
  import { gameShift, currentMessages, realGameShift } from "./stores";
  import { onDestroy, onMount } from "svelte";

  let shifts = [
    "Transition",
    "Shift 1",
    "Shift 2",
    "Shift 3",
    "Shift 4",
    "Endgame",
    "End of Match",
  ];
  let colors = [
    "btn-red",
    "btn-orange",
    "btn-yellow",
    "btn-green",
    "btn-blue",
    "btn-purple",
    "btn-black",
  ];
  let animateButton = false;
  let teleopStartStr = "";
  let forceShift = false;
  let message = "";
  $: {
    if ($currentMessages.length > 0) {
      message = $currentMessages[$currentMessages.length - 1]
        ?.substring(6)
        .split(",");
      teleopStartStr = message[0];
      forceShift = message[1] === "t";
      console.log(message);
    }
  }

  let timerInterval;
  let triggeredShifts = new Set();

  function handleClick() {
    $gameShift = ($gameShift + 1) % (shifts.length - 1);
  }

  function triggerAlert() {
    animateButton = true;
    setTimeout(() => (animateButton = false), 5000);
  }

  onMount(() => {
    timerInterval = setInterval(() => {
      if (!teleopStartStr) return;
      const startTime = new Date(+teleopStartStr).getTime();
      const currentTime = Date.now();
      const secondsElapsed = Math.floor((currentTime - startTime) / 1000);

      const shiftsTimes = [0, 10, 35, 60, 85, 110, 135];

      const shiftIndex = shiftsTimes.indexOf(secondsElapsed);

      if (shiftIndex != -1 && !triggeredShifts.has(secondsElapsed)) {
        if (shiftIndex < shiftsTimes.length - 1 && shiftIndex > 0) {
          if (forceShift) {
            $gameShift = shiftIndex;
          }
          triggerAlert();
        }
        $realGameShift = shiftIndex;

        triggeredShifts.add(secondsElapsed);
      }
      console.log(secondsElapsed);
    }, 500);
  });

  onDestroy(() => {
    clearInterval(timerInterval);
  });
</script>

<div class="indicator absolute ml-[100px]">
  <span
    class="indicator-item badge badge-accent {teleopStartStr.length > 0
      ? colors[$realGameShift]
      : 'btn-black'} w-[250px] text-l py-5"
  >
    {!teleopStartStr
      ? "No Teleop Start Received"
      : "Current Game Shift: " + shifts[$realGameShift]}
  </span>
</div>
<div class="mt-10">
  <button
    class="btn w-[200px]{forceShift ? ' btn-disabled' : ''}{!animateButton ||
    forceShift
      ? ''
      : ' animate-bounce'} {colors[$gameShift]}"
    on:click={handleClick}>{shifts[$gameShift]}</button
  >
</div>

<style>
  .btn {
    padding: 12px 24px;
    font-size: 24px;
  }

  .btn-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .btn-black {
    background-color: rgb(25, 25, 25);
    color: white;
  }
  .btn-primary {
    background-color: rgb(0, 51, 255);
    color: white;
  }
  .btn-red {
    background-color: rgb(255, 0, 0);
    color: white;
  }

  .btn-orange {
    background-color: rgb(255, 150, 0);
    color: white;
  }

  .btn-yellow {
    background-color: rgb(255, 255, 0);
    color: black;
  }

  .btn-green {
    background-color: rgb(25, 200, 25);
    color: white;
  }

  .btn-blue {
    background-color: rgb(0, 51, 255);
    color: white;
  }

  .btn-purple {
    background-color: rgb(160, 0, 160);
    color: white;
  }

  .btn-black:hover {
    background-color: rgb(0, 0, 0);
    color: white;
  }

  .btn-red:hover {
    background-color: rgb(200, 0, 0);
    color: white;
  }

  .btn-orange:hover {
    background-color: rgb(200, 117, 0);
    color: white;
  }

  .btn-yellow:hover {
    background-color: rgb(200, 200, 0);
    color: black;
  }

  .btn-green:hover {
    background-color: rgb(23, 169, 23);
    color: white;
  }

  .btn-blue:hover {
    background-color: rgb(0, 40, 200);
    color: white;
  }

  .btn-purple:hover {
    background-color: rgb(105, 0, 105);
    color: white;
  }
</style>
