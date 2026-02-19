<script>
    import AutoPage from "./AutoPage.svelte";
    import PrematchConfig from "./PrematchConfig.svelte";
    import TeleopPage from "./TeleopPage.svelte";
    import { autoState, gameState, gameData, currentSchedule } from "./stores";
    import PostGame from "./PostGame.svelte";

    console.log("Current Schedule: ", (currentSchedule))
</script>


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