<script>
    import StartGamePiece from "./StartGamePiece.svelte";
    import { autoState } from "./stores";
    import StartingLine from "./StartingLine.svelte";
    import FullField from "./FullField.svelte";


    function handleClick() {
        $autoState = 1;
    }
</script>

<FullField/>



<div class="absolute left-[650px] -mt-[240px]">
    <div
        class="tooltip tooltip-open tooltip-top tooltip-primary"
        data-tip="Starting Gamepiece"
    >
        <StartGamePiece mode="Start" />
    </div>
</div>


<div class="absolute top-0 left-[460px] m-2">
    <button class="btn btn-primary" on:click={handleClick}>Start</button>
</div>

<div class="absolute -mt-[400px] ml-[460px]">
    <StartingLine />
</div>
