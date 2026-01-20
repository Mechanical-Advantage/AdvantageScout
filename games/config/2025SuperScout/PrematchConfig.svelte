<script>
    import { autoState, gameData, gameState } from "./stores";
    import CurrentTeam from "./CurrentTeam.svelte";
    import { reversedAlliance, currentSchedule } from "./stores";
    import DefenseOnly from "./DefenseOnly.svelte";
    let topMargin = "top-[42px]";
if ($reversedAlliance === 0) {
    topMargin = "top-[42px]";

} else {
    topMargin = "top-[210px]";
}

    function handleClick() {
        $autoState = 1;
    }
console.log("current schedule: " , currentSchedule)

</script>
<DefenseOnly />


<!-- <div class="flex flex-col absolute left-[300px] {topMargin} gap-y-[45px]">
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
        </div> -->


<div class="absolute top-0 left-[475px] m-2">
    <button
        class="btn btn-primary"
        on:click={handleClick}>Start</button
    >
</div>