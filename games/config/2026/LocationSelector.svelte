<script>
  import GamePiece from "./GamePiece.svelte";
  import GamePieceLocation from "./GamePieceLocation.svelte";
  import { gameState, gameData } from "./stores";
  export let gameMode = "Auto";
  console.log("Entering locationselector - game mode",gameMode);
</script>

{#if $gameState == 0}
<div class="flex flex-col absolute ml-[400px] mt-[40px] gap-y-[100px]">
  <div>
    <GamePieceLocation
      location="Outpost"
      gamePieceLocation="Outpost"
      gamePiece="Fuel"
      {gameMode}
      btnsize=" w-[62px] h-[62px]"
    />
  </div>
  <div>
    <GamePieceLocation
      location="Floor"
      gamePieceLocation="Floor"
      gamePiece="Fuel"
      {gameMode}
      btnsize=" w-[62px] h-[62px]"
    />
  </div>
</div>
{/if}

{#if $gameState == 1}
  <div class="flex flex-col absolute ml-[400px] mt-[40px] gap-y-[100px]">
    <div>
      <GamePieceLocation
        location="Outpost"
        gamePieceLocation="Outpost"
        gamePiece="Fuel"
        {gameMode}
        btnsize=" w-[62px] h-[62px]"
      />
    </div>
    <div>
      <GamePieceLocation
        location="Floor"
        gamePieceLocation="Floor"
        gamePiece="Fuel"
        {gameMode}
        btnsize=" w-[62px] h-[62px]"
      />
    </div>
  </div>
{/if}
