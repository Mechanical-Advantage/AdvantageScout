<script>
    import AutoPage from "./AutoPage.svelte";
    import TeleopPage from "./TeleopPage.svelte";
    import { autoState, gameState } from "./stores";
    import PrematchConfig from "./PrematchConfig.svelte";
    import PostGame from "./PostGame.svelte";
</script>


{#if $gameState === 0}
    {#if $autoState === 0}
    <PrematchConfig />
{:else}
    <AutoPage />
{/if}
{:else if $gameState === 1}
<TeleopPage/>
{:else if $gameState === 2}
    <PostGame />
{/if}
