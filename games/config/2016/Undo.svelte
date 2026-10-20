<script>
  import {
    autoDataLog,
    teleDataLog,
    gameData,
    gameState
  } from "./stores";

  let autoList = [
    "Leave",
    "AutoHighBoulderSuccess",
    "AutoHighBoulderFail",
    "AutoLowBoulderSuccess",
    "AutoLowBoulderFail",
    "AutoPortCrossSuccess",
    "AutoPortCrossFail",
    "AutoChevalCrossSuccess",
    "AutoChevalCrossFail",
    "AutoMoatCrossSuccess",
    "AutoMoatCrossFail",
    "AutoRampartsCrossSuccess",
    "AutoRampartsCrossFail",
    "AutoDrawCrossSuccess",
    "AutoDrawCrossFail",
    "AutoSallyCrossSuccess",
    "AutoSallyCrossFail",
    "AutoWallCrossSuccess",
    "AutoWallCrossFail",
    "AutoTerrainCrossSuccess",
    "AutoTerrainCrossFail",
    "AutoLowbarCrossSuccess",
    "AutoLowbarCrossFail",
    "AutoBoulderDrop",
    "AutoPreLoadedBoulderCollect",
    "AutoFloorBoulderCollect",
    "AutoTunnelBoulderCollect",
  ];

  let tempUndoData = {};

  let teleList = [
    "TeleHighBoulderSuccess",
    "TeleHighBoulderFail",
    "TeleLowBoulderSuccess",
    "TeleLowBoulderFail",
    "TelePortCrossSuccess",
    "TelePortCrossFail",
    "TeleChevalCrossSuccess",
    "TeleChevalCrossFail",
    "TeleMoatCrossSuccess",
    "TeleMoatCrossFail",
    "TeleRampartsCrossSuccess",
    "TeleRampartsCrossFail",
    "TeleDrawCrossSuccess",
    "TeleDrawCrossFail",
    "TeleSallyCrossSuccess",
    "TeleSallyCrossFail",
    "TeleWallCrossSuccess",
    "TeleWallCrossFail",
    "TeleTerrainCrossSuccess",
    "TeleTerrainCrossFail",
    "TeleLowbarCrossSuccess",
    "TeleLowbarCrossFail",
    "TeleClimb",
    "TeleChallenge",
    "TeleBoulderDrop",
    "TelePreLoadedBoulderCollect",
    "TeleFloorBoulderCollect",
    "TeleTunnelBoulderCollect",
  ];

  function handleClick() {
    if ($gameState === 0 && $autoDataLog.length > 0) {
      tempUndoData = $autoDataLog.pop();
      console.log(tempUndoData);
      UpdateLists(autoList);
    } else if ($gameState === 1 && $teleDataLog.length > 0) {
      tempUndoData = $teleDataLog.pop();
      UpdateLists(teleList);
    }

    function UpdateLists(undoList) {
      for (let i = 0; i < undoList.length; i++) {
        $gameData[undoList[i]] = tempUndoData[undoList[i]];
      }
    }
  }
</script>

{#if ($gameState === 0 && $autoDataLog.length > 0) || ($gameState === 1 && $teleDataLog.length > 0)}
  <button class="btn" btn-primary on:click={handleClick}> Undo </button>
{/if}
