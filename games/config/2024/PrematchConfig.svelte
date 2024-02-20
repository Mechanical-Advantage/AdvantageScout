<script>
    import { autoState, gameData } from "./stores";
    import FullField from "./FullField.svelte";
    import CurrentTeam from "./CurrentTeam.svelte";
    import AutoSpikeSVG from "./AutoSpikeSVG.svelte";
    import { reversedAlliance, liveGamepiece, liveLocation } from "./stores";
    let topMargin = "top-[42px]";
if ($reversedAlliance === 0) {
    topMargin = "top-[42px]";

} else {
    topMargin = "top-[210px]";
}

    function handleClick() {
        $autoState = 1;
        $liveGamepiece ="Note";
        $liveLocation = "PreLoaded"
    }
</script>

<FullField />

<div class="flex flex-col absolute left-[300px] {topMargin} gap-y-[45px]">
    <div> <AutoSpikeSVG/>
    </div>

    <div> <AutoSpikeSVG/>
    </div>

    <div> <AutoSpikeSVG/>
    </div>
    </div>

    <div class="flex flex-col absolute left-[685px] {topMargin} gap-y-[45px]">
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


