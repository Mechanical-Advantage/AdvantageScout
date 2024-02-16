<script>
  import GamePiece from "../2023/GamePiece.svelte";
  import GamePieceLocation from "./GamePieceLocation.svelte";
  import { gameState, gameData } from "./stores";
  export let gameMode = "Auto";
</script>

{#if $gameState == 0}
  <div class="flex flex-col absolute ml-[525px] mt-[20px] gap-y-[90px]">
    <div>
      <GamePieceLocation
        location="FloorCenterline0"
        gamePiecelocation="FloorCenterline0"
        gamePiece="Note"
        btnstate={$gameData["AutoFloorCenterline0NoteCollect"] == 0
          ? ""
          : "btn-disabled bg-gray-700"}
        {gameMode}
        btnsize=" w-[64px] h-[64px]"
      />
    </div>
    <div>
      <GamePieceLocation
        location="FloorCenterline1"
        gamePiecelocation="FloorCenterline1"
        gamePiece="Note"
        btnstate={$gameData["AutoFloorCenterline1NoteCollect"] == 0
          ? ""
          : "btn-disabled bg-gray-700"}
        {gameMode}
        btnsize=" w-[64px] h-[64px]"
      />
    </div>
    <div>
      <GamePieceLocation
        location="FloorCenterline2"
        gamePiecelocation="FloorCenterline2"
        gamePiece="Note"
        btnstate={$gameData["AutoFloorCenterline2NoteCollect"] == 0
          ? ""
          : "btn-disabled bg-gray-700"}
        {gameMode}
        btnsize=" w-[64px] h-[64px]"
      />
    </div>
    <div>
      <GamePieceLocation
        location="FloorCenterline3"
        gamePiecelocation="FloorCenterline3"
        gamePiece="Note"
        btnstate = {$gameData["AutoFloorCenterline3NoteCollect"] == 0?"": "btn-disabled bg-gray-700"} {gameMode}
        btnsize=" w-[64px] h-[64px]"
      />
    </div>
    <div>
      <GamePieceLocation
        location="FloorCenterline4"
        gamePiecelocation="FloorCenterline4"
        gamePiece="Note"
        btnstate = {$gameData["AutoFloorCenterline4NoteCollect"] == 0?"": "btn-disabled bg-gray-700"} {gameMode}
        btnsize=" w-[64px] h-[64px]"
      />
    </div>
  </div>

  <div class="flex flex-col absolute mt-[200px] ml-[245px] gap-y-[90px]">
    <div>
      <GamePieceLocation
        location="FloorSpike0"
        gamePiecelocation="FloorSpike0"
        gamePiece="Note"
        btnstate = {$gameData["AutoFloorSpike0NoteCollect"] == 0?"": "btn-disabled bg-gray-700"} {gameMode}
        btnsize=" w-[64px] h-[64px]"
      />
    </div>
    <div>
      <GamePieceLocation
        location="FloorSpike1"
        gamePiecelocation="FloorSpike1"
        gamePiece="Note"
        btnstate = {$gameData["AutoFloorSpike1NoteCollect"] == 0?"": "btn-disabled bg-gray-700"} {gameMode}
        btnsize=" w-[64px] h-[64px]"
      />
    </div>
    <div>
      <GamePieceLocation
        location="FloorSpike2"
        gamePiecelocation="FloorSpike2"
        gamePiece="Note"
        btnstate = {$gameData["AutoFloorSpike2NoteCollect"] == 0?"": "btn-disabled bg-gray-700"} {gameMode}
        btnsize=" w-[64px] h-[64px]"
      />
    </div>
  </div>
{/if}

{#if $gameState == 1}
  <div class="flex flex-col absolute ml-[400px] mt-[40px] gap-y-[320px]">
    <div>
      <GamePieceLocation
        location="Source"
        gamePieceLocation="Floor"
        gamePiece="Note"
        {gameMode}
        btnsize=" w-[84px] h-[84px]"
      />
    </div>
    <div>
      <GamePieceLocation
        location="Floor"
        gamePieceLocation="Source"
        gamePiece="Note"
        {gameMode}
        btnsize=" w-[84px] h-[84px]"
      />
    </div>
  </div>
{/if}
