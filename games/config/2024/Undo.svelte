<script>
    import { autoDataLog, teleDataLog, gameData, gameState, undoDisplayCondition } from "./stores";

    let autoList = ["AutoSpeakerNoteSuccess",
    "AutoSpeakerNoteFail",
    "AutoAmpNoteSuccess",
    "AutoAmpNoteFail",
    "AutoFloorPreloadedNoteCollect",
    "AutoFloorSpike0NoteCollect",
    "AutoFloorSpike1NoteCollect",
    "AutoFloorSpike2NoteCollect",
    "AutoFloorCenterline0NoteCollect",
    "AutoFloorCenterline1NoteCollect",
    "AutoFloorCenterline2NoteCollect",
    "AutoFloorCenterline3NoteCollect",
    "AutoFloorCenterline4NoteCollect",
    "AutoNoteDrop",
    "Leave",
    "TeleNoteDrop"]

    let tempUndoData = {}

    let teleList = ["TeleSpeakerNoteSuccess",
    "TeleSpeakerNoteFail",
    "TeleAmpNoteSuccess",
    "TeleAmpNoteFail",
    "TeleFloorNoteCollect",
    "TeleSourceNoteCollect",
    "TeleNoteDrop",
    "TeleTrapNoteSuccess",
    "TeleTrapNoteFail",
    "TeleFerryNoteSuccess"]

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
