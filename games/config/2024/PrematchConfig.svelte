<script>
    import { autoState, gameData } from "./stores";
    import FullField from "./FullField.svelte";
    import CurrentTeam from "./CurrentTeam.svelte";
    import AutoSpikeSVG from "./AutoSpikeSVG.svelte";
    import { liveGamepiece, liveLocation } from "./stores";

    function handleClick() {
        $autoState = 1;
        $liveGamepiece ="Note";
        $liveLocation = "PreLoaded"
    }
</script>

<FullField />

<div class="flex flex-col absolute left-[300px] top-[42px] gap-y-[45px]">
    <div> <AutoSpikeSVG/>
    </div>

    <div> <AutoSpikeSVG/>
    </div>

    <div> <AutoSpikeSVG/>
    </div>
    </div>

    <div class="flex flex-col absolute left-[685px] top-[42px] gap-y-[45px]">
        <div> <AutoSpikeSVG/>
        </div>
    
        <div> <AutoSpikeSVG/>
        </div>
    
        <div> <AutoSpikeSVG/>
        </div>
        </div>

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


