<script>
    import { autoDataLog, teleDataLog, gameData, gameState, undoDisplayCondition } from "./stores";

    let autoList = ["AutoSwitchCubeSuccess",
    "AutoScaleCubeSuccess",
    "AutoSwitchCubeFail",
    "AutoScaleCubeFail",
    "AutoPreloadedCubeCollect",
    "AutoFloorCubeCollect",
    "AutoCubeDrop",
    "Leave"]

    let tempUndoData = {}

    let teleList = ["TeleScaleCubeSuccess",
    "TeleScaleCubeFail",
    "TeleSwitchCubeSuccess",
    "TeleSwitchCubeFail",
    "TeleExchangeCubeSuccess",
    "TeleFloorCubeCollect",
    "TelePortalCubeCollect",
    "TeleExchangeCubeCollect",
    "TeleCubeDrop"
]

    let undoList = [1,2,3,4]

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
    
    }

</script>

{#if ($gameState === 0 && $autoDataLog.length > 0) || ($gameState === 1 && $teleDataLog.length > 0)}
    <button class="btn btn-primary" on:click={handleClick}> Undo </button>
{/if}
