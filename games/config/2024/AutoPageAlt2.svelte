<script>
    import FieldPath from "./FieldPath.svelte";
    import VideoRecord3 from "./VideoRecord3.svelte"
    import { gameData, autoState,autoEventList } from "./stores"
  
    let fieldPath;
    let alliance = $gameData.AllianceColor == 0? "blue" : "red";

</script>

<style>

    button {
        border: 1px solid green;
        background-color: black;
        width: 100%;
        height: 50%;
        color: greenyellow;
        font-size: 30px;
    }

    button:disabled,
    button[disabled] {
        border: 1px solid #999999;
        background-color: gray;
        color: #666666;
    }
</style>


<div class="min-h-screen flex">
    <div class="flex-1 bg-slate-800 border-r-2 border-slate-800 p-4">
        <VideoRecord3 />
    </div>
    <div class="flex-1 bg-black p-4">
        <FieldPath  bind:this={fieldPath} alliance={alliance} canvasSize={{w:480, h:410}}/>
        <div class="grid grid-cols-2">
            <button class="btn btn-primary" on:click={() => ($autoState = 0)}
                >Back</button
            >
            <button class="btn btn-primary"
                on:click={fieldPath.undo()}
                disabled={$autoEventList.length === 0}>Undo</button
            >
        </div>
    </div>
</div>



