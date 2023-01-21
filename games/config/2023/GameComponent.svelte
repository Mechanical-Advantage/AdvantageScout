<script>
    import AutoPage from "./AutoPage.svelte";
    import TeleopPage from "./TeleopPage.svelte";
    import { gameState } from "./stores";
</script>

{#if $gameState == 0}
<AutoPage />
{:else if $gameState == 1}
<TeleopPage/>
{/if}
