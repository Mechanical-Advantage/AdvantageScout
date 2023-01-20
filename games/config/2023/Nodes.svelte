<script>
    import {
        liveGamepiece,
        liveLocation,
        highConeSuccess,
        floorPickup,
    } from "./stores";
    export let level = 1;
    export let type = "success";

    function update() {
        console.log("score");

        if ($liveGamepiece === "cone" && level === "3") {
            console.log("score");
            $highConeSuccess++;
        }
        if ($liveLocation === "floor") {
            $floorPickup++;
        }
    }
</script>

<button
    class="btn {type === 'success' ? 'btn-success' : 'btn-error'} rounded-md w-24 h-24" on:click={update}>
    {$highConeSuccess}
</button>
