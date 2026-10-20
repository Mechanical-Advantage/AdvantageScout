<script>
  import GamePiece from "../2023/GamePiece.svelte";
  import GamePieceLocation from "./GamePieceLocation.svelte";
  import { gameState, gameData } from "./stores";
  export let gameMode = "Auto";
</script>

{#if $gameState == 0}
<div class="flex flex-col absolute ml-[300px] mt-[40px] gap-y-[100px]">
  <div>
    <GamePieceLocation
      location="Floor"
      gamePieceLocation="Floor"
      gamePiece="Boulder"
      {gameMode}
      btnsize=" w-[50px] h-[50px]"
    />
  </div>
  <div>
    <GamePieceLocation
      location="Tunnel"
      gamePieceLocation="Tunnel"
      gamePiece="Boulder"
      {gameMode}
      btnsize=" w-[50px] h-[50px]"
    />
  </div>
</div>
{/if}
{#if $gameState == 1}
  <div class="flex flex-col absolute ml-[400px] mt-[40px] gap-y-[100px]">
    <div>
      <GamePieceLocation
        location="Floor"
        gamePieceLocation="Floor"
        gamePiece="Boulder"
        {gameMode}
        btnsize=" w-[50px] h-[50px]"
      />
    </div>
    <div>
      <GamePieceLocation
        location="Tunnel"
        gamePieceLocation="Tunnel"
        gamePiece="Boulder"
        {gameMode}
        btnsize=" w-[50px] h-[50px]"
      />
    </div>
  </div>
{/if}
