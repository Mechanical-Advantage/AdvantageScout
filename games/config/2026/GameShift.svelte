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
      message = $currentMessages[$currentMessages.length - 1]?.substring(6).split(",");
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

  function playBeep() {
    playBase64Audio(
      "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AAAAA/wAAAAAVVVV//MUZPEAnAFAUAAAAAAAA/wAAAAAVVVV//MUZO8AfAFAEAAAAAAAA/wAAAAAVVVV//MUZO4AOAM+AKAAAAAAA/wBQAAAVVVV//MUZO8AQANAAMAAAAAAA/wBgAAAVVVV//MkZPACDBtCsMQAAAAAA/wBgAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//MUZPoAiAM+UOAAAAAAA/wBwAAAVVVV//MUZPgAGAFAAAAAAAAAA/wAAAAAVVVV//MUZPoATAE+AAAAAAAAA/wAAAAAVVVV//MUZPoAIAFAAAAAAAAAA/wAAAAAVVVV//MUZPwAhAFAUAAAAAAAA/wAAAAAVVVV//MUZPoAAAH+AAAAAAAAA/wAAAAAVVVV//MUZP0ASANAAAAAAAAAA/wAAAAAVVVV//MUZPwAAAH+AAAAAAAAA/wAAAAAVVVV//MUZPwAAAH+AAAAAAAAA/wAAAAAVVVV//MUZPwAAAH+AAAAAAAAA/wAAAAAVVVV//MUZPwAAAH+AAAAAAAAA/wAAAAAVVVV//MUZPwAAAH+AAAAAAAAA/wAAAAAVVVV//MUZPwAAAH+AAAAAAAAA/wAAAAAVVVV//MUZPwAAAH+AAAAAAAAA/wAAAAAVVVV//MUZPwAAAH+AKAAAAAAA/wBQAAAVVVV//MUZP8BiA9AoMEAAAAAA/wBgAAAVVVV//MUZPUAQAFAUOAAAAAAA/wBwAAAVVVV//MUZPYAAAH+AAAAAAAAA/wAAAAAVVVV//MUZPkAAAH+AAAAAAAAA/wAAAAAVVVV//MUZPwAAAH+AAAAAAAAA/wAAAAAVVVV//MUZPwAAAH+AAAAAAAAA/wAAAAAVVVV//MUZPwAAAH+AAAAAAAAA/wAAAAAVVVV//MUZPwAAAH+AAAAAAAAA/wAAAAAVVVV//MUZPwAAAH+AAAAAAAAA/wAAAAAVVVV//MUZPwAAAH+AAAAAAAAA/wAAAAAVVVV//MUZPwAAAH+AAAAAAAAA/wAAAAAVVVV",
    );
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

    const base64Data = base64String.split(",")[1] || base64String;

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
    class="btn w-[200px]{forceShift ? ' btn-disabled' : ''}{!animateButton || forceShift ? '' : ' animate-bounce'} {colors[
      $gameShift
    ]}"
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
