<script>
    import { gameData, autoDataLog } from "./stores";
    import { fade, fly } from "svelte/transition";
    let visible = true;

    function handleClick() {
        $autoDataLog.push(JSON.parse(JSON.stringify($gameData)));

        $gameData["Mobility"] =
            $gameData["Mobility"] === 0
                ? ($gameData["Mobility"] = 1)
                : ($gameData["Mobility"] = 0);
    }
</script>

<!--<style>-->
<!--button {-->
<!--        position: relative;-->
<!--        left: 70px;-->
<!--        transition: left 0.5s ease-in-out;-->
<!--}-->

<!--button:active {-->
<!--        left: 0px;-->
<!--        transform: rotate(30deg);-->
<!--    opacity: 0;-->
<!--    transition: opacity 0.5s ease-in-out;-->
<!--}-->
<!--</style>-->

<button class="btn btn-square w-24 h-24" on:click={handleClick}>
    {#if $gameData["Mobility"] === 0}
        <svg
            width="92px"
            height="92px"
            viewBox="0 0 24 24"
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            ><defs>
                <style>
                    .cls-1 {
                        fill: #ff0000;
                        stroke: #ffffff;
                        stroke-miterlimit: 10;
                        stroke-width: 1.01px;
                    }
                </style></defs
            ><circle class="cls-1" cx="6.24" cy="17.8" r="1.91" /><circle
                class="cls-1"
                cx="16.76"
                cy="17.8"
                r="1.91"
            /><line
                class="cls-1"
                x1="14.85"
                y1="17.8"
                x2="8.15"
                y2="17.8"
            /><path
                class="cls-1"
                d="M4.33,17.8H1.46V13.6A11.37,11.37,0,0,1,3.37,7.28h10.1a2.85,2.85,0,0,1,2.24,1.08l3,3.71h1a2.86,2.86,0,0,1,2.87,2.86V17.8H18.67"
            /><polyline
                class="cls-1"
                points="5.28 7.28 6.24 12.06 18.67 12.06"
            /><line class="cls-1" x1="0.5" y1="7.28" x2="3.37" y2="7.28" /><line
                class="cls-1"
                x1="11.02"
                y1="7.28"
                x2="11.98"
                y2="12.07"
            /></svg
        >
    {:else}
        <svg
            width="92px"
            height="92px"
            viewBox="0 0 24 24"
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs
                ><style>
                    .cls-1 {
                        fill: #00ff00;
                        stroke: #ffffff;
                        stroke-miterlimit: 10;
                        stroke-width: 1.01px;
                    }
                </style></defs
            >
            <circle class="cls-1" cx="6.24" cy="17.8" r="1.91" /><circle
                class="cls-1"
                cx="16.76"
                cy="17.8"
                r="1.91"
            /><line
                class="cls-1"
                x1="14.85"
                y1="17.8"
                x2="8.15"
                y2="17.8"
            /><path
                class="cls-1"
                d="M4.33,17.8H1.46V13.6A11.37,11.37,0,0,1,3.37,7.28h10.1a2.85,2.85,0,0,1,2.24,1.08l3,3.71h1a2.86,2.86,0,0,1,2.87,2.86V17.8H18.67"
            /><polyline
                class="cls-1"
                points="5.28 7.28 6.24 12.06 18.67 12.06"
            /><line class="cls-1" x1="0.5" y1="7.28" x2="3.37" y2="7.28" /><line
                class="cls-1"
                x1="11.02"
                y1="7.28"
                x2="11.98"
                y2="12.07"
            />
        </svg>
    {/if}
</button>
