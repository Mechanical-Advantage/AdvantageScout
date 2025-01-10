<script>
    import { autoDataLog, teleDataLog, gameData, gameState, undoDisplayCondition } from "./stores";

    let autoList = ["AutoL1CoralSuccess",
    "AutoL2CoralSuccess",
    "AutoL3CoralSuccess",
    "AutoL4CoralSuccess",
    "AutoL1CoralFail",
    "AutoL2CoralFail",
    "AutoL3CoralFail",
    "AutoL4CoralFail",
    "AutoProcessorAlgaeFail",
    "AutoProcessorAlgaeSuccess",
    "AutoNetAlgaeSuccess",
    "AutoNetAlgaeFail",
    "AutoAlgaeDrop",
    "AutoCoralDrop",
    "AutoPreloadedCoralCollect",
    "AutoMark1AlgaeCollect",
    "AutoMark2AlgaeCollect",
    "AutoMark3AlgaeCollect",
    "AutoMark1CoralCollect",
    "AutoMark2CoralCollect",
    "AutoMark3CoralCollect",
    "AutoFloorAlgaeCollect",
	"AutoFloorCoralCollect",
    "AutoStationCoralCollect",
    "TeleAlgaeDrop",
    "TeleCoralDrop",
    "Leave"]

    let tempUndoData = {}

    let teleList = ["TeleL1CoralSuccess",
    "TeleL2CoralSuccess",
    "TeleL3CoralSuccess",
    "TeleL4CoralSuccess",
    "TeleL1CoralFail",
    "TeleL2CoralFail",
    "TeleL3CoralFail",
    "TeleL4CoralFail",
    "TeleProcessorAlgaeFail",
    "TeleProcessorAlgaeSuccess",
    "TeleNetAlgaeSuccess",
    "TeleNetAlgaeFail",
    "TeleAlgaeDrop",
    "TeleCoralDrop",
    "TelePreloadedCoralCollect",
    "TeleMark1AlgaeCollect",
    "TeleMark2AlgaeCollect",
    "TeleMark3AlgaeCollect",
    "TeleMark1CoralCollect",
    "TeleMark2CoralCollect",
    "TeleMark3CoralCollect",
    "TeleFloorAlgaeCollect",
	"TeleFloorCoralCollect",
    "TeleStationCoralCollect",
    "TeleAlgaeDrop",
    "TeleCoralDrop",
    "TelePreLoadedCoralCollect",
    "TeleFloorAlgaeCollect",
    "TeleFloorCoralCollect",
    "TeleStationCoralCollect",
]

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
    
    }

</script>

{#if ($gameState === 0 && $autoDataLog.length > 0) || ($gameState === 1 && $teleDataLog.length > 0)}
    <button class="btn btn-primary" on:click={handleClick}> Undo </button>
{/if}
