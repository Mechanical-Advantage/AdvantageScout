<script>
  import GamePiece from "../2023/GamePiece.svelte";
  import GamePieceLocation from "./GamePieceLocation.svelte";
  import { gameState, gameData } from "./stores";
  export let gameMode = "Auto";
</script>

{#if $gameState == 0}
<div class="flex flex-col absolute ml-[300px] mt-[140px] gap-y-[100px]">
  <div>
    <GamePieceLocation
      location="Mark2"
      gamePieceLocation="Mark2"
      gamePiece="Coral"
      {gameMode}
      btnsize=" w-[40px] h-[40px]"
    />
  </div>
  <div>
    <GamePieceLocation
      location="Mark2"
      gamePieceLocation="Mark2"
      gamePiece="Algae"
      {gameMode}
      btnsize=" w-[40px] h-[40px]"
    />
  </div>
</div>
<div class="flex flex-col absolute ml-[400px] mt-[40px] gap-y-[100px]">
  <div>
    <GamePieceLocation
      location="FarStation"
      gamePieceLocation="FarStation"
      gamePiece="Coral"
      {gameMode}
      btnsize=" w-[40px] h-[40px]"
    />
  </div>
  <div>
    <GamePieceLocation
      location="NearStation"
      gamePieceLocation="NearStation"
      gamePiece="Coral"
      {gameMode}
      btnsize=" w-[40px] h-[40px]"
    />
  </div>
  <div>
    <GamePieceLocation
      location="FarFloor"
      gamePieceLocation="FarFloor"
      gamePiece="Coral"
      {gameMode}
      btnsize=" w-[40px] h-[40px]"
    />
  </div>
  <div>
    <GamePieceLocation
      location="NearFloor"
      gamePieceLocation="NearFloor"
      gamePiece="Coral"
      {gameMode}
      btnsize=" w-[40px] h-[40px]"
    />
  </div>
</div>
{/if}

{#if $gameState == 1}
  <div class="flex flex-col absolute ml-[400px] mt-[40px] gap-y-[150px]">
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
