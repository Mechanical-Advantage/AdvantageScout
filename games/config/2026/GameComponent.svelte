<script>
  import AutoPage from "./AutoPage.svelte";
  import TeleopPage from "./TeleopPage.svelte";
  import { autoState, gameState, currentMessages } from "./stores";
  import PrematchConfig from "./PrematchConfig.svelte";
  import PostGame from "./PostGame.svelte";

  let rotation = 0;

  $: {
    if ($currentMessages.length > 0) {
      const lastMsg = $currentMessages[$currentMessages.length - 1];
      const messageContent = lastMsg?.substring(6);
      
      if (messageContent === "r") {
        rotation = rotation === 180 ? 0 : 180;
      }
    }
  }
</script>

<div class="main-viewport" style="--rotation: {rotation}deg;">
  {#if $gameState === 0}
    {#if $autoState === 0}
      <PrematchConfig />
    {:else}
      <AutoPage />
    {/if}
  {:else if $gameState === 1}
    <TeleopPage />
  {:else if $gameState === 2}
    <PostGame />
  {/if}
</div>

<style>
  .main-viewport {
    width: 100vw;
    height: 100vh;
    transform: rotate(var(--rotation));
    transform-origin: center center;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
</style>