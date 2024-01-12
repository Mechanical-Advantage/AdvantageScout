<script>
    //import ButtonGroup from "./ButtonGroup.svelte";
    import Nodes from "./Nodes.svelte";
    import LocationSelector from "./LocationSelector.svelte";
    import TrashCan from "./TrashCan.svelte";
    import { autoState, autoDataLog } from "./stores";
    import Undo from "./Undo.svelte";
    import Mobility from "./Mobility.svelte";
    import CurrentTeam from "./CurrentTeam.svelte";
    import GamePiece from "./GamePiece.svelte";

    function handleClick() {
        $autoState = 0;
    }
</script>

<main>
    <!-- <CurrentTeam/> -->
    <div class="absolute left-[350px] mt-[50px]">
        <CurrentTeam />
    </div>

    <!-- <ScoringGrid /> -->
    <div class="absolute left-[80px] top-[40px]">
        <Nodes level="1" type="Success" gameMode="Auto" />
    </div>
    <div class="absolute left-[240px] top-[40px]">
        <Nodes level="1" type="Fail" gameMode="Auto" />
    </div>
    <div class="absolute left-[20px] top-[195px]">
        <Nodes level="2" type="Success" gameMode="Auto" />
    </div>

    <div class="absolute left-[20px] top-[350px]">
        <Nodes level="2" type="Fail" gameMode="Auto" />
    </div>

    <div class="absolute ml-[100px]">
        <LocationSelector gameMode="Auto" />
    </div>

    <!-- <div class="flex flex-col absolute ml-[465px] mt-[20px] gap-y-[25px]">
            <GamePiece gamePiece="Note" />
            <GamePiece />
            <GamePiece />
            <GamePiece />
            <GamePiece />
    </div> -->

    <div class="absolute top-0 right-0 m-2">
        <div class="flex flex-col gap-y-[25px]">
            <button class="btn btn-primary" on:click={handleClick}>Back</button>
            <div class="ml-[6px]">
                <Mobility />
            </div>
        </div>
    </div>

    <div class="absolute top-[250px] right-0 m-[20px]">
        <div class="flex flex-col gap-y-[25px]">
            <div>
                <TrashCan gameMode="Auto" />
            </div>

                <Undo />
            
        </div>
    </div>
</main>
