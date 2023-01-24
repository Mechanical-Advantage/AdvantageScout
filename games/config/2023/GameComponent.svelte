<script>
    import AutoPage from "./AutoPage.svelte";
    import TeleopPage from "./TeleopPage.svelte";
    import { autoState, gameState } from "./stores";
    import PrematchConfig from "../../current/PrematchConfig.svelte";
</script>


{#if $gameState == 0}
    {#if $autoState == 0}
    <PrematchConfig width=210 height=330/>
{:else}
    <AutoPage />
{/if}
{:else if $gameState == 1}
<TeleopPage/>
{/if}
