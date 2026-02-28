
<script>
    import { gameShift, currentMessages, realGameShift } from "./stores";
    import { onDestroy, onMount } from 'svelte';
    
    let shifts = ["Transition", "Shift 1", "Shift 2", "Shift 3", "Shift 4", "Endgame", "End of Match"];
    let colors = ["btn-red", "btn-orange", "btn-yellow", "btn-green", "btn-blue", "btn-purple", "btn-black"];
    let animateButton = false;
    let teleopStartStr = "";
    $: {
      if ($currentMessages.length > 0) {
        teleopStartStr = $currentMessages[$currentMessages.length - 1]?.substring(6);
      }
    }
    
    let timerInterval;
    let triggeredShifts = new Set();

    function handleClick() {
      $gameShift = ($gameShift + 1) % (shifts.length - 1);
    }

    function playBeep() {
      playBase64Audio("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")
      // const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      // const oscillator = audioCtx.createOscillator();
      // const gainNode = audioCtx.createGain();
      // oscillator.connect(gainNode);
      // gainNode.connect(audioCtx.destination);
      // oscillator.type = 'square';
      // oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
      // gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
      // oscillator.start();
      // oscillator.stop(audioCtx.currentTime + 0.2);
    }
    async function playBase64Audio(base64String) {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

      const base64Data = base64String.split(',')[1] || base64String;

      const binaryString = window.atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
      }

      try {
          const audioBuffer = await audioCtx.decodeAudioData(bytes.buffer);

          const source = audioCtx.createBufferSource();
          const gainNode = audioCtx.createGain();
          
          source.buffer = audioBuffer;
          source.connect(gainNode);
          gainNode.connect(audioCtx.destination);

          gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);

          source.start(0);
      } catch (err) {
          console.error("Error decoding audio data:", err);
      }
  }
  function triggerAlert() {
      animateButton = true;
      playBeep();
      setTimeout(() => animateButton = false, 5000);
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
            if (shiftIndex < shiftsTimes.length - 1) {
              triggerAlert();
            }
            $realGameShift = shiftIndex;
            triggeredShifts.add(secondsElapsed);
          }
          console.log(secondsElapsed)
      }, 500);
  });

  onDestroy(() => {
      clearInterval(timerInterval);
  });
</script>

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
<div class="indicator absolute ml-[100px]">
  <span class="indicator-item badge badge-accent {teleopStartStr.length > 0 ? colors[$realGameShift] : "btn-black"} w-[250px] text-l py-5">
     {!teleopStartStr ? "No Teleop Start Recived" : "Current Game Shift: " + shifts[$realGameShift]}
  </span>
</div>
<div class="mt-10">
<button class="btn w-[200px] {animateButton ? "animate-bounce" : ""} {colors[$gameShift]}"
     on:click={handleClick}>{shifts[$gameShift]}</button>
</div>