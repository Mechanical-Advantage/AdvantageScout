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

<div class="indicator">
    <span class="indicator-item badge badge-primary text-xl"
        >{$highConeSuccess}</span
    >
    <span class="indicator-item indicator-start badge badge-secondary text-xl"
        >{$highConeSuccess}</span
    >
    <button
        class="btn btn-square btn-outline rounded-md w-24 h-24"
        on:click={update}
    >
        {#if type === "success"}
            <svg
                fill="#1bbb43"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#1bbb43"
                ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                /><g id="SVGRepo_iconCarrier">
                    <polygon
                        fill-rule="evenodd"
                        points="9.707 14.293 19 5 20.414 6.414 9.707 17.121 4 11.414 5.414 10"
                    />
                </g></svg
            >
        {:else}
            <svg
                fill="#e31c1c"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                id="cross"
                class="icon glyph"
                stroke="#e31c1c"
                ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                /><g id="SVGRepo_iconCarrier"
                    ><path
                        d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
                    /></g
                ></svg
            >
        {/if}
    </button>
</div>
