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
    fuelCycleCountSuccess
  } from "./stores";

  export let level = 1;
  export let type = "Success";
  export let gameMode = "Auto";

  let dataField = " ";
  let locationField = " ";
  let driverField = " ";
  let intervalId;

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
 
        // driveMap{reversedAlliance}{AllianceColor}{liveLocation}
  function update() {
    if (level == 1) {
      if (type == "Success") {
        $fuelCycleCountSuccess++;
      } else {
        $fuelCycleCountFail++;
      }
    }
    if ($gameState === 0) {
      $autoDataLog.push(JSON.parse(JSON.stringify($gameData)));
    } else {
      $teleDataLog.push(JSON.parse(JSON.stringify($gameData)));
    }
    $gameData[driverField] = $gameData[driverField] + 1;
    dataField = gameMode + gameLevelMap[level] + $liveGamepiece + type;
    locationField = gameMode + $liveLocation + $liveGamepiece + "Collect";
    console.log("LocationField" + locationField)
    $gameData[dataField] = $gameData[dataField] + 1;
    console.log("LiveGamePiece " + $liveGamepiece);
    $gameData[locationField] = $gameData[locationField] + 1;

    intervalId = setInterval(() => {
    $gameData[driverField] =$gameData[driverField] +1;
    dataField = gameMode + gameLevelMap[level] + $liveGamepiece + type;
    locationField = gameMode + $liveLocation + $liveGamepiece + "Collect";
    // console.log("LocationField" + locationField)
    $gameData[dataField] = $gameData[dataField] + 1;
    // console.log("LiveGamePiece " + $liveGamepiece);
    $gameData[locationField] = $gameData[locationField] + 1;
    }, 250);
  }
  function stopPress() {
    // Clear the interval when the mouse button is released
    console.log("Clearing ")
    clearInterval(intervalId);
    intervalId=null;
  }
  let gameLevelMap = {
    1: "Hub",
    2: "Pass",
    3: "Ferry"
  };
</script>

<div class="indicator">

  {#if level == 1 || level == 2 || level == 3}

  <span class="indicator-item badge badge-accent text-2xl">
    {$gameData[gameMode + gameLevelMap[level] + "Fuel" + type]}
  </span
  >
  {/if}
  <button
    class="btn btn-square btn-outline rounded-md w-20 h-20"
    disabled={$liveGamepiece == 0}
    on:mousedown={update}
    on:mouseup={stopPress}
    on:mouseleave={stopPress}
  >
    {#if type === "Success"}
      <span class="indicator-item indicator-left indicator-left indicator-start badge badge-primary">
        {gameLevelMap[level]}
      </span>
      <span class="badge badge-success">
        {$gameData[gameMode + gameLevelMap[level] + "Fuel" + type]}
      </span>
    {:else}
      {#if level == 1 || level == 2}
        <span class="badge badge-error">
          {$gameData[gameMode + gameLevelMap[level] + "Fuel" + type]}
        </span>
      {/if}
    {/if}
  </button>
</div>

