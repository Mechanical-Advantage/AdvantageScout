<script>
    import AutoPage from "./AutoPage.svelte";
    import TeleopPage from "./TeleopPage.svelte";
    import { autoState, gameState } from "./stores";
    import PrematchConfig from "./PrematchConfig.svelte";
    import PostGame from "./PostGame.svelte";
    import AutoPageAlt from "./AutoPageAlt.svelte";
</script>


{#if $gameState === 0}
   {#if $autoState === 0}
    <PrematchConfig />
{:else}
    <!-- <AutoPage /> -->
    <AutoPageAlt />
{/if}

 

{:else if $gameState === 1}
    <TeleopPage />
{:else if $gameState === 2}
    <PostGame />
{/if}
