<script>
  import {
    liveGamepiece,
    gameState,
    gameData,
    autoDataLog,
    teleDataLog,
    liveLocation,
    reversedAlliance,
    fuelCycleCountFail,
    fuelCycleCountSuccess,
    fuelButtonSpeed,
    gameShift

  } from "./stores";

  export let level = 1;
  export let type = "Success";
  export let gameMode = "Auto";

  let dataField = "";
  let locationField = "";
  let driverField = "";
  let intervalId;
  let reverseIntervalId;
  let shiftNames = ["ST", "S1", "S2", "S3", "S4", "SE"];
  let shiftName = gameMode == "Auto" ? "" : shiftNames[$gameShift];

  $: shiftName = gameMode == "Auto" ? "" : shiftNames[$gameShift];
        // driveMap{reversedAlliance}{AllianceColor}{liveLocation}
  function update() {
    if ($gameState === 0) {
      $autoDataLog.push(JSON.parse(JSON.stringify($gameData)));
    } else {
      $teleDataLog.push(JSON.parse(JSON.stringify($gameData)));
    }
    if (level == 1) {
      if (type == "Success") {
        $fuelCycleCountSuccess++;
      } else {
        $fuelCycleCountFail++;
      }
    }
  // compute the field names before using them so we don't accidentally
  // read/write the placeholder " " key and create malformed values
  dataField = gameMode + shiftName + gameLevelMap[level] + $liveGamepiece + type;
  locationField = gameMode + shiftName + $liveLocation + $liveGamepiece + "Collect";
  driverField = gameMode + shiftName + "Driver" + $liveGamepiece;
  console.log("DataField " + dataField);
  $gameData[driverField] = ($gameData[driverField] || 0) + 1;
  console.log("LocationField " + locationField)
  $gameData[dataField] = ($gameData[dataField] || 0) + 1;
  console.log("LiveGamePiece " + $liveGamepiece);
  $gameData[locationField] = $gameData[locationField] + 1;

    intervalId = setInterval(() => {  
      if (level == 1) {
        if (type == "Success") {
          $fuelCycleCountSuccess++;
        } else {
          $fuelCycleCountFail++;
        }
      }
  // recompute on each tick before mutating so fields are valid
  dataField = gameMode + shiftName + gameLevelMap[level] + $liveGamepiece + type;
  locationField = gameMode + shiftName + $liveLocation + $liveGamepiece + "Collect";
  //driverField = gameMode + shiftName + "Driver" + $liveGamepiece;
  //$gameData[driverField] = ($gameData[driverField] || 0) + 1;
  $gameData[dataField] = ($gameData[dataField] || 0) + 1;
  $gameData[locationField] = ($gameData[locationField] || 0) + 1;
    }, $fuelButtonSpeed);
  }
  function reverseUpdate() {
    dataField = gameMode + shiftName + gameLevelMap[level] + $liveGamepiece + type;
    locationField = gameMode + shiftName + $liveLocation + $liveGamepiece + "Collect";
    if ($gameData[dataField] == 0) {
      reverseStopPress();
      return;
    }
    if ($gameState === 0) {
      $autoDataLog.pop(JSON.parse(JSON.stringify($gameData)));
    } else {
      $teleDataLog.pop(JSON.parse(JSON.stringify($gameData)));
    }
    if (level == 1) {
      if (type == "Success" && $fuelCycleCountSuccess > 0) {
        $fuelCycleCountSuccess--;
      } else if (type == "Fail" && $fuelCycleCountFail > 0) {
        $fuelCycleCountFail--;
      }
    }
    console.log("DataField" + dataField);
    console.log("LocationField" + locationField)
    $gameData[dataField] = $gameData[dataField] - 1;
    console.log("LiveGamePiece " + $liveGamepiece);
    $gameData[locationField] = $gameData[locationField] - 1;

    reverseIntervalId = setInterval(() => {  
      dataField = gameMode + shiftName + gameLevelMap[level] + $liveGamepiece + type;
      locationField = gameMode + shiftName + $liveLocation + $liveGamepiece + "Collect";
      if ($gameData[dataField] == 0 || $gameData[locationField] == 0) {
        reverseStopPress();
        return;
      }
      if (level == 1) {
        if (type == "Success" && $fuelCycleCountSuccess > 0) {
          $fuelCycleCountSuccess--;
        } else if (type == "Fail" && $fuelCycleCountFail > 0) {
          $fuelCycleCountFail--;
        }
     }
      $gameData[driverField] = $gameData[driverField] - 1;
      $gameData[dataField] = $gameData[dataField] - 1;
      $gameData[locationField] = $gameData[locationField] - 1;
    }, $fuelButtonSpeed);
  }
  function stopPress() {
    // Clear the interval when the mouse button is released
    console.log("Clearing ")
    clearInterval(intervalId);
    intervalId=null;
  }
  function reverseStopPress() {
    // Clear the interval when the mouse button is released
    console.log("Clearing ")
    clearInterval(reverseIntervalId);
    reverseIntervalId=null;
  }
  let gameLevelMap = {
    1: "Hub",
    2: "Pass",
    3: "Ferry"
  };
</script>

<div class="indicator">

  {#if level == 1 && type == "Success"}
    <span class="indicator-item badge badge-accent text-2xl py-3">
      {$fuelCycleCountSuccess}
    </span>
  {:else if level == 1 && type == "Fail"}
    <span class="indicator-item indicator-left indicator-start badge badge-accent text-2xl py-3">
    {$fuelCycleCountFail}
    </span>
  {/if}
  <button
    class="btn btn-square btn-outline rounded-md w-20 h-20"
    disabled={$liveGamepiece == 0}

    on:pointerup={stopPress}
    on:pointerdown={update}
    on:pointerleave={stopPress}

  >
    {#if (level == 2 || level == 3) && type == "Success"}
      <span class="indicator-item badge badge-success text-2xl py-3">
        {$gameData[gameMode + shiftName + gameLevelMap[level] + "Fuel" + type]}
      </span>
    {:else if (level == 2 || level == 3) && type == "Fail"}
      <span class="indicator-item indicator-left indicator-start badge badge-error text-2xl py-3">
        {$gameData[gameMode + shiftName + gameLevelMap[level] + "Fuel" + type]}
      </span>
    {/if}
    {#if type === "Success"}
      <span class="indicator-item indicator-left indicator-start badge badge-primary">
        {gameLevelMap[level]}
      </span>
      <span class="badge badge-success text-2xl p-3">
        {$gameData[gameMode + shiftName + gameLevelMap[level] + "Fuel" + type]}
      </span>
    {:else}
      <span class="indicator-item indicator-right indicator-end badge badge-primary">
        {gameLevelMap[level]}
      </span>
      {#if level == 1 || level == 2}
        <span class="badge badge-error text-2xl p-3">
          {$gameData[gameMode + shiftName + gameLevelMap[level] + "Fuel" + type]}
        </span>
      {/if}
    {/if}
  </button>
  {#if type === "Success"}
    <button 
      class="btn btn-primary min-h-[20px] h-[20px] text-2xl absolute ml-[130px] mt-[20px] px-[20px] py-[20px] place-content-center"
      on:pointerdown={reverseUpdate}
      on:pointerup={reverseStopPress}
      on:pointerleave={reverseStopPress}>
      -
    </button>
  {:else}
    <button 
      class="btn btn-primary min-h-[20px] h-[20px] text-2xl absolute -ml-[95px] mt-[20px] px-[20px] py-[20px] place-content-center"
      on:pointerdown={reverseUpdate}
      on:pointerup={reverseStopPress}
      on:pointerleave={reverseStopPress}>
      -
    </button>
  {/if}
</div>
