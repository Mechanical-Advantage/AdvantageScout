<script>
  import GamePiece from "../2023/GamePiece.svelte";
  import GamePieceLocation from "./GamePieceLocation.svelte";
  import { gameState, gameData } from "./stores";
  export let gameMode = "Auto";
</script>

{#if $gameState == 0}
  <div class="flex flex-col absolute ml-[525px] mt-[380px] gap-y-[90px]">
    <div>
      <GamePieceLocation
        location="Floor"
        gamePiecelocation="Floor"
        gamePiece="Cube"
        btnstate={$gameData["AutoFloorCubeCollect"] == 0
          ? ""
          : "btn-disabled bg-gray-700"}
        {gameMode}
        btnsize=" w-[84px] h-[84px]"
      />
    </div>
 
  </div>
{/if}

{#if $gameState == 1}
  <div class="flex flex-col absolute ml-[400px] mt-[40px] gap-y-[160px]">
    <div>
      <GamePieceLocation 
        location="Portal"
        gamePieceLocation="Portal"
        gamePiece="Cube"
        {gameMode}
        btnsize=" w-[84px] h-[84px]"
      />
    </div>
    <div>
      <GamePieceLocation
        location="Exchange"
        gamePieceLocation="Exchange"
        gamePiece="Cube"
        {gameMode}
        btnsize=" w-[84px] h-[84px]"
      />
    </div>
    <div>
      <GamePieceLocation
        location="Floor"
        gamePieceLocation="Floor"
        gamePiece="Cube"
        {gameMode}
        btnsize=" w-[84px] h-[84px]"
      />
    </div>
  </div>
{/if}
