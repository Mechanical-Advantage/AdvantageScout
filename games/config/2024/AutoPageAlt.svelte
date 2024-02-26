<script>
    import FieldPath from "./FieldPath.svelte";
    import { gameData, autoState,autoEventList } from "./stores"
    import Nodes  from "./Nodes.svelte";
  
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

<main>
    <div class="grid grid-cols-5 gap-3">
        <div class="col-span-1">
            <div class="sidebar w-20">
                <div class="inline">
                    <Nodes level="2" type="Success" gameMode="Auto" />
                </div>

                <div class="inline">
                    <Nodes level="2" type="Fail" gameMode="Auto" />
                </div>
                <div class="inline">
                    <Nodes level="1" type="Success" gameMode="Auto" />
                </div>
                <div class="inline">
                    <Nodes level="1" type="Fail" gameMode="Auto" />
                </div>
            </div>
        </div>
        <div class="col-span-3">
            <FieldPath bind:this={fieldPath} alliance={alliance} />
        </div>
        <div class="col-span-1">
            <button
                on:click={fieldPath.undo()}
                disabled={$autoEventList.length === 0}>Undo</button
            >
            <button class="btn btn-primary" on:click={() => ($autoState = 0)}
                >Back</button
            >
        </div>
    </div>
</main>


