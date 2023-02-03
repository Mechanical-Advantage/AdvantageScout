<script>
    //import ButtonGroup from "./ButtonGroup.svelte";
    import Nodes from "./Nodes.svelte";
    import LocationSelector from "./LocationSelector.svelte";
    import TrashCan from "./TrashCan.svelte";
    import { autoState, autoDataLog } from "./stores";
    import ChargeStation from "./ChargeStation.svelte";
    import Undo from "./Undo.svelte";
    import Mobility from "./Mobility.svelte";

    function handleClick() {
        $autoState = 0;
    }
</script>

<main>
    <!-- <ScoringGrid /> -->
    <div class="absolute left-[20px] top-[40px]">
        <Nodes level="3" type="Success" gameMode="Auto" />
    </div>
    <div class="absolute left-[160px] top-[40px]">
        <Nodes level="3" type="Fail" gameMode="Auto" />
    </div>
    <div class="absolute left-[20px] top-[195px]">
        <Nodes level="2" type="Success" gameMode="Auto" />
    </div>
    <div class="absolute left-[160px] top-[195px]">
        <Nodes level="2" type="Fail" gameMode="Auto" />
    </div>
    <div class="absolute left-[20px] top-[350px]">
        <Nodes level="1" type="Success" gameMode="Auto" />
    </div>
    <div class="absolute left-[160px] top-[350px]">
        <Nodes level="1" type="Fail" gameMode="Auto" />
    </div>

    <div class="absolute left-[765px]">
        <LocationSelector gameMode="Auto" />
    </div>

    <div class="flex flex-col absolute ml-[465px] mt-[20px] gap-y-[25px]">
        <div class="ml-[6px]">
            <Mobility />
        </div>
        <div>
            <ChargeStation />
        </div>
    </div>

    <div class="absolute top-0 right-0 m-2">
        <button class="btn btn-primary" on:click={handleClick}>Back</button>
    </div>

    <div class="flex flex-row gap-x-[50px] absolute left-[415px] top-[350px]">
        <div>
            <TrashCan gameMode="Auto" />
        </div>

        <div class="mt-[25px]">
                <Undo />
        </div>
    </div>
</main>
