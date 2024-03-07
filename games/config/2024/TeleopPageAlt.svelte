<script>
    import FieldPathTeleop from "./FieldPathTeleop.svelte";
    import {teleEventList} from "./stores"

    let fieldPath;
    let disabled;
    $: {
        disabled = ($teleEventList.length===0); 
        console.log("len: " + $teleEventList.length)
    }
</script>

<div class="grid grid-cols-12">
    <div class="col-span-2">
        <button class="h-full w-full bg-green-700 disabled:bg-slate-900" 
            on:click={fieldPath.undo()}
            disabled={disabled}>Undo</button
        >
    </div>
    <div class="col-span-10">
        <FieldPathTeleop bind:this={fieldPath} canvasSize={{w:760, h:400}}/>
    </div>
</div>
