<script>
    import { autoDataLog, teleDataLog, gameData, gameState, undoDisplayCondition } from "./stores";

    let autoList = ["AutoHybridConeSuccess",
    "AutoHybridConeFail",
    "AutoHybridCubeSuccess",
    "AutoHybridCubeFail",
    "AutoMidConeSuccess",
    "AutoMidConeFail",
    "AutoMidCubeSuccess",
    "AutoMidCubeFail",
    "AutoHighConeSuccess",
    "AutoHighConeFail",
    "AutoHighCubeSuccess",
    "AutoHighCubeFail",
    "AutoDock",
    "AutoEngage",
    "AutoDockTraverse",
    "AutoFloorConeCollect",
    "AutoFloorCubeCollect",
    "AutoConeDrop",
    "AutoCubeDrop"]

    let tempUndoData = {}

    let teleList = ["TeleHybridConeSuccess",
    "TeleHybridConeFail",
    "TeleHybridCubeSuccess",
    "TeleHybridCubeFail",
    "TeleMidConeSuccess",
    "TeleMidConeFail",
    "TeleMidCubeSuccess",
    "TeleMidCubeFail",
    "TeleHighConeSuccess",
    "TeleHighConeFail",
    "TeleHighCubeSuccess",
    "TeleHighCubeFail",
    "TeleDock",
    "TeleEngage",
    "TeleDockTraverse",
    "TeleFloorConeCollect",
    "TeleFloorCubeCollect",
    "TeleSingleConeCollect",
    "TeleSingleCubeCollect",
    "TeleDoubleConeCollect",
    "TeleDoubleCubeCollect",
    "TeleConeDrop",
    "TeleCubeDrop"]

    let undoList = []

    function handleClick() {
        if ($gameState === 0 && $autoDataLog.length > 0) {
            tempUndoData = $autoDataLog.pop();
            UpdateLists(autoList)
        } else if ($gameState === 1 && $teleDataLog.length > 0) {
            tempUndoData = $teleDataLog.pop();
            UpdateLists(teleList)
        }

    function UpdateLists(undoList) {
        for (let i = 0; i < undoList.length; i++) {
        $gameData[undoList[i]] = tempUndoData[undoList[i]]
  }
}
    console.log(undoList)
    }

</script>

{#if ($gameState === 0 && $autoDataLog.length > 0) || ($gameState === 1 && $teleDataLog.length > 0)}
    <button class="btn btn-primary" on:click={handleClick}> Undo </button>
{/if}
