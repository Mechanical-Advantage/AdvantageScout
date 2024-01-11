<script>
    import { autoState, gameData } from "./stores";
    import FullField from "./FullField.svelte";
    import CurrentTeam from "./CurrentTeam.svelte";

    function handleClick() {
        $autoState = 1;
    }
</script>

<FullField />

<div class="absolute left-[350px] -mt-[450px]">
    <CurrentTeam />
</div>

<div class="absolute top-0 left-[475px] m-2">
    <button
        class="btn btn-primary {$gameData['StartPosition'] > 0
            ? ' '
            : 'btn-disabled'}"
        on:click={handleClick}>Start</button
    >
</div>


