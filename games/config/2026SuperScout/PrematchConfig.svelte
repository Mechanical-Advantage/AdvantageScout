<script>
    import { autoState } from "./stores";
    import { reversedAlliance, currentSchedule } from "./stores";
    let topMargin = "top-[42px]";
    if ($reversedAlliance === 0) {
        topMargin = "top-[42px]";
    } else {
        topMargin = "top-[210px]";
    }
    
    function handleClick() {
        $autoState = 1;
    }
    console.log("current schedule: ", currentSchedule);
</script>

<div class="absolute top-0 left-[475px] m-2">
    <button class="btn btn-primary" on:click={handleClick}>Start</button>
</div>
