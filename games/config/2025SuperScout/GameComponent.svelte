<script>
    import AutoPage from "./AutoPage.svelte";
    import TeleopPage from "./TeleopPage.svelte";
    import { autoState, gameState } from "./stores";
    import PostGame from "./PostGame.svelte";
</script>


{#if $gameState === 0}
    <AutoPage />
{:else if $gameState === 1}
<TeleopPage/>
{:else if $gameState === 2}
    <PostGame />
{/if}
