<script>
    import { autoDataLog, teleDataLog, gameData, gameState, undoDisplayCondition } from "./stores";

    let autoList = ["AutoL1CellSuccess",
    "AutoL2CellSuccess",
    "AutoInnerCellSuccess",
    "AutoL4CellSuccess",
    "AutoL1CellFail",
    "AutoL2CellFail",
    "AutoInnerCellFail",
    "AutoL4CellFail",
    "AutoProcessorAlgaeFail",
    "AutoProcessorAlgaeSuccess",
    "AutoNetAlgaeSuccess",
    "AutoNetAlgaeFail",
    "AutoCellDrop",
    "AutoPreloadedCellCollect",
    "AutoMark1CellCollect",
    "AutoMark2CellCollect",
    "AutoMark3CellCollect",
	"AutoFloorCellCollect",
    "AutoStationCellCollect",
    "TeleCellDrop",
    "Leave"]

    let tempUndoData = {}

    let teleList = ["TeleL1CellSuccess",
    "TeleL2CellSuccess",
    "TeleInnerCellSuccess",
    "TeleL4CellSuccess",
    "TeleL1CellFail",
    "TeleL2CellFail",
    "TeleInnerCellFail",
    "TeleL4CellFail",
    "TeleProcessorAlgaeFail",
    "TeleProcessorAlgaeSuccess",
    "TeleNetAlgaeSuccess",
    "TeleNetAlgaeFail",
    "TeleCellDrop",
    "TelePreloadedCellCollect",
    "TeleColorPos",
	"TeleColorRot",
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

