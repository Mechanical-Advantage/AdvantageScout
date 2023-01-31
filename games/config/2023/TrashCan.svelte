<script>
    import {
        liveGamepiece,
        autoDataLog,
        teleDataLog,
        gameData,
        gameState
    } from "./stores";

    export let gameMode = "Auto"
    let dataField = " "

    function update() {
        if ($gameState === 0) {
            $autoDataLog.push(JSON.parse(JSON.stringify($gameData)));
        } else {
            $teleDataLog.push(JSON.parse(JSON.stringify($gameData)));
        }
        console.log("score");
        dataField = gameMode + $liveGamepiece + "Drop" 
        $gameData[dataField] = $gameData[dataField] + 1    
        console.log(dataField)

        $liveGamepiece = 0
    }

</script>
<div class="indicator">
    <span class="indicator-item badge badge-accent text-xl"
        >{$gameData[gameMode + "Cube" + "Drop"]}</span
    >
    <span class="indicator-item indicator-start badge badge-secondary text-xl"
        >{$gameData[gameMode + "Cone" + "Drop"]}</span
    >
<button class="btn btn-square btn-outline w-24 h-24 btn-error" on:click={update} disabled={$liveGamepiece == 0}>
    <svg
        width="84px"
        height="84px"
        viewBox="0 0 1024.00 1024.00"
        class="icon"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill="#ffffff"
        stroke="#ffffff"
        stroke-width="12.288"
        transform="rotate(0)"
    >
        <g id="SVGRepo_bgCarrier" stroke-width="0" />

        <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke="#ffffff"
            stroke-width="16.384"
        />

        <g id="SVGRepo_iconCarrier">
            <path
                d="M692.2 182.2V72.9H327.8v109.3H145.6v72.9h728.8v-72.9H692.2z m-291.5 0v-36.4h218.6v36.4H400.7zM730.8 874.5H289.2l-34.3-548.8-72.8 4.5 38.6 617.2h578.6l38.6-617.2-72.8-4.5z"
                fill="#ffffff"
            />

            <path
                d="M400.7 400.8h72.9v437.3h-72.9zM546.4 400.8h72.9v437.3h-72.9z"
                fill="#ffffff"
            />
        </g>
    </svg>
</button>
</div>
