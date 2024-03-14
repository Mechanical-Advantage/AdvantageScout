<script>
    import FieldPathAuto from "./FieldPathAuto.svelte";
    import VideoRecord3 from "./VideoRecord3.svelte"
    import { gameData, autoEventList } from "./stores"
  
    let fieldPath;
    let alliance;
    $: alliance = $gameData.AllianceColor == 0? "blue" : "red";
</script>

<style>
    .inactive {
        background-color: #999999;
        color: #555555;
    }
</style>


<div class="flex">
    <div class="flex-1 bg-slate-800 border-r-2 border-slate-800 p-4">
        <div class="grid grid-cols-2">
            <button class="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2"
                on:click={()=>$gameData.AllianceColor=1}
                class:inactive="{alliance === "blue"}"
                >RED</button
            >
            <button class="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2"
                on:click={()=>$gameData.AllianceColor=0}
                class:inactive="{alliance === "red"}"
                >BLUE</button
            >
        </div>
        <VideoRecord3 />
    </div>
    <div class="flex-1 bg-black p-4">
        <FieldPathAuto  bind:this={fieldPath} alliance={alliance} canvasSize={{w:510, h:380}}/>

        <div class="grid grid-cols-1">
            <button class="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium text-md px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 disabled:bg-slate-200 disabled:text-slate-500 h-full w-full"
                on:click={fieldPath.undo()}
                disabled={$autoEventList.length === 0}>Undo</button
            >
        </div>
    </div>
</div>



