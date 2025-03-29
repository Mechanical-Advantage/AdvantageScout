<script>
    import AutoPage from "./AutoPage.svelte";
    import PrematchConfig from "./PrematchConfig.svelte";
    import TeleopPage from "./TeleopPage.svelte";
    import { autoState, gameState, gameData } from "./stores";
    import PostGame from "./PostGame.svelte";
    import TeleopDefensePage from "./TeleopDefensePage.svelte"
</script>


{#if $gameState === 0}
    {#if $autoState === 0}
    <PrematchConfig />
{:else}
    <AutoPage />
{/if}
{:else if $gameState === 1}
{#if $gameData['DefenseOnly'] === 0}
    <TeleopPage />
{:else}
    <TeleopDefensePage />
{/if}

{:else if $gameState === 2}
    <PostGame />
{/if}