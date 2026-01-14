<script>
    import { autoDataLog, teleDataLog, gameData, gameState, undoDisplayCondition } from "./stores";

    let autoList = [
        "AutoHubFuelSuccess",
        "AutoHubFuelFail",
        "AutoFuelPassSuccess",
        "AutoFuelPassFail",        
        "AutoFuelFerry",
        "AutoPreloadedFuelCollect",
        "AutoFloorFuelCollect",
        "AutoOutpostFuelCollect"
    ]

    let tempUndoData = {}

    let teleList = [
        "TeleHubFuelSuccess",
        "TeleHubFuelFail",
        "TeleFuelPassSuccess",
        "TeleFuelPassFail",
        "TeleFuelFerry",
        "TeleFloorFuelCollect",
        "TeleOutpostFuelCollect",
        "TelePreLoadedFuelCollect",
    ]

    let undoList = []

    function handleClick() {
        if ($gameState === 0 && $autoDataLog.length > 0) {
            tempUndoData = $autoDataLog.pop();
            console.log(tempUndoData)
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

