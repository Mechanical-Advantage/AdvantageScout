<script>
    import {
        liveGamepiece,
        gameState,
        gameData,
        autoDataLog,
        teleDataLog,
        liveLocation
    } from "./stores";

    export let level = 1;
    export let type = "Success";
    export let gameMode = "Auto";

    let dataField = " ";
    let locationField = " "
    $gameData["StartPosition"] = 2;

    let displayConeValue = 0;
    let displayCubeValue = 0;

    function update() {
        if ($gameState === 0) {
            $autoDataLog.push(JSON.parse(JSON.stringify($gameData)));
            
        } else {
            $teleDataLog.push(JSON.parse(JSON.stringify($gameData)));
        }
        console.log("score");
        dataField = gameMode + gameLevelMap[level] + $liveGamepiece + type;
        locationField = gameMode + $liveLocation + $liveGamepiece + "Collect";
        $gameData[dataField] = $gameData[dataField] + 1;
        $gameData[locationField] = $gameData[locationField] + 1;
        // console.log(
        //     level,
        //     gameLevelMap[level],
        //     $gameData["AutoHighConeSuccess"]
        // );

        console.log(dataField);
        console.log(locationField,$gameData[locationField])

        $liveGamepiece = 0;
    }

    let gameLevelMap = {
        1: "Hybrid",
        2: "Mid",
        3: "High",
    };
</script>

<div class="indicator">
    <span class="indicator-item badge badge-accent text-xl"
        >{$gameData[gameMode + gameLevelMap[level] + "Cube" + type]}</span
    >
    <span class="indicator-item indicator-start badge badge-secondary text-xl"
        >{$gameData[gameMode + gameLevelMap[level] + "Cone" + type]}</span
    >
    <button
        class="btn btn-square btn-outline rounded-md w-24 h-24"
        disabled={$liveGamepiece == 0}
        on:click={update}
    >
        {#if type === "Success"}
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
