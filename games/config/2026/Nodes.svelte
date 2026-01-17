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

  let dataField = " ";
  let locationField = " ";
  let driverField = " ";
  let intervalId;
  let reverseIntervalId;
  let shiftNames = ["", "S1", "S2", "S3", "S4", "SE"];
  let shiftName = gameMode == "Auto" ? "" : shiftNames[$gameShift];
  
  let driveMap = {
    0: {1: {"NearStation": "DriverLeftStation",
            "FarStation": "DriverRightStation",
            "NearFloor": "DriverLeftFloor",
            "FarFloor": "DriverRightFloor"},
        0: {"NearStation": "DriverRightStation",
            "FarStation": "DriverLeftStation",
            "NearFloor": "DriverRightFloor",
            "FarFloor": "DriverLeftFloor"}},
    1: {0: {"NearStation": "DriverLeftStation",
            "FarStation": "DriverRightStation",
            "NearFloor": "DriverLeftFloor",
            "FarFloor": "DriverRightFloor"},
        1: {"NearStation": "DriverRightStation",
            "FarStation": "DriverLeftStation",
            "NearFloor": "DriverRightFloor",
            "FarFloor": "DriverLeftFloor"}}
        }
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
    console.log("Shift Name: " + shiftName);
    $gameData[driverField] = $gameData[driverField] + 1;
    dataField = gameMode + shiftName + gameLevelMap[level] + $liveGamepiece + type;
    locationField = gameMode + shiftName + $liveLocation + $liveGamepiece + "Collect";
    console.log("LocationField" + locationField)
    $gameData[dataField] = $gameData[dataField] + 1;
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
      $gameData[driverField] = $gameData[driverField] + 1;
      dataField = gameMode + shiftName + gameLevelMap[level] + $liveGamepiece + type;
      locationField = gameMode + shiftName + $liveLocation + $liveGamepiece + "Collect";
      $gameData[dataField] = $gameData[dataField] + 1;
      $gameData[locationField] = $gameData[locationField] + 1;
    }, $fuelButtonSpeed);
  }
  function reverseUpdate() {
    dataField = gameMode + shiftName + gameLevelMap[level] + $liveGamepiece + type;
    locationField = gameMode + shiftName + $liveLocation + $liveGamepiece + "Collect";
    if ($gameData[dataField] == 0 || $gameData[locationField] == 0) {
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
    console.log("Shift Name: " + shiftName);
    $gameData[driverField] = $gameData[driverField] - 1;
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

  {#if level == 1}
  <span class="indicator-item badge badge-accent text-2xl">
    {type == "Success" ? $fuelCycleCountSuccess : $fuelCycleCountFail}
  </span>
  {/if}
  <button
    class="btn btn-square btn-outline rounded-md w-20 h-20"
    disabled={$liveGamepiece == 0}
    on:mousedown={update}
    on:mouseup={stopPress}
    on:mouseleave={stopPress}
  >
    {#if type === "Success"}
      <span class="indicator-item indicator-left indicator-start badge badge-primary">
        {gameLevelMap[level]}
      </span>
      <span class="badge badge-success">
        {$gameData[gameMode + shiftName + gameLevelMap[level] + "Fuel" + type]}
      </span>
    {:else}
      {#if level == 1 || level == 2}
        <span class="badge badge-error">
          {$gameData[gameMode + shiftName + gameLevelMap[level] + "Fuel" + type]}
        </span>
      {/if}
    {/if}
  </button>
  {#if type === "Success"}
    <button 
      class="btn btn-primary min-h-[20px] h-[20px] text-xs absolute ml-[90px] mt-[30px] px-[10px] py-[0px]"
      on:mousedown={reverseUpdate}
      on:mouseup={reverseStopPress}
      on:mouseleave={reverseStopPress}>
      -
    </button>
  {:else}
    <button 
      class="btn btn-primary min-h-[20px] h-[20px] text-xs absolute -ml-[35px] mt-[30px] px-[10px] py-[0px]"
      on:mousedown={reverseUpdate}
      on:mouseup={reverseStopPress}
      on:mouseleave={reverseStopPress}>
      -
    </button>
  {/if}
</div>
