<script>
    import ChargeStationBalanced from './ChargeStationEngaged.svelte';
    import ChargeStationCrossedButton from './ChargeStationCrossedButton.svelte';
    import ChargeStationDocked from './ChargeStationDocked.svelte';
    import { gameState } from './stores';
</script>


        <div class="flex flex-col gap-y-4">
            {#if $gameState == 0}
            <ChargeStationCrossedButton />
            {/if}
            <ChargeStationDocked />
            <ChargeStationBalanced />
        </div>


