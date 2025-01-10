<script>
  import GamePiece from "../2023/GamePiece.svelte";
  import GamePieceLocation from "./GamePieceLocation.svelte";
  import { gameState, gameData } from "./stores";
  export let gameMode = "Auto";
</script>

{#if $gameState == 0}
<div class="flex flex-col absolute ml-[400px] mt-[40px] gap-y-[160px]">
  <div>
    <GamePieceLocation
      location="Station"
      gamePieceLocation="Station"
      gamePiece="Coral"
      {gameMode}
      btnsize=" w-[84px] h-[84px]"
    />
  </div>
  <div>
    <GamePieceLocation
      location="Floor"
      gamePieceLocation="Floor"
      gamePiece="Coral"
      {gameMode}
      btnsize=" w-[84px] h-[84px]"
    />
  </div>
  <div>
    <GamePieceLocation
      location="Floor"
      gamePieceLocation="Floor"
      gamePiece="Algae"
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
        location="Station"
        gamePieceLocation="Station"
        gamePiece="Coral"
        {gameMode}
        btnsize=" w-[84px] h-[84px]"
      />
    </div>
    <div>
      <GamePieceLocation
        location="Floor"
        gamePieceLocation="Floor"
        gamePiece="Coral"
        {gameMode}
        btnsize=" w-[84px] h-[84px]"
      />
    </div>
    <div>
      <GamePieceLocation
        location="Floor"
        gamePieceLocation="Floor"
        gamePiece="Algae"
        {gameMode}
        btnsize=" w-[84px] h-[84px]"
      />
    </div>
  </div>
{/if}
