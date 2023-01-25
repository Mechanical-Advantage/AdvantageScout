<script>
    //import ButtonGroup from "./ButtonGroup.svelte";
    import Nodes from "./Nodes.svelte";
    import GameObject from "./GamePiece.svelte";
    import GamePieceLocation from "./GamePieceLocation.svelte";
    import LocationSelector from "./LocationSelector.svelte";
    import TrashCan from "./TrashCan.svelte";
    import { autoState } from "./stores";
    function handleClick(){
        $autoState = 0
    }
</script>

<main>
    <!-- <ScoringGrid /> -->
    <div class="absolute left-[20px] top-[40px]">
        <Nodes level="3" type="Success" gameMode="Auto" />
    </div>
    <div class="absolute left-[160px] top-[40px]">
        <Nodes level="3" type="Fail" gameMode="Auto"/>
    </div>
    <div class="absolute left-[20px] top-[195px]">
        <Nodes level="2" type="Success" gameMode="Auto"/>
    </div>
    <div class="absolute left-[160px] top-[195px]">
        <Nodes level="2" type="Fail" gameMode="Auto"/>
    </div>
    <div class="absolute left-[20px] top-[350px]">
        <Nodes level="1" type="Success" gameMode="Auto"/>
    </div>
    <div class="absolute left-[160px] top-[350px]">
        <Nodes level="1" type="Fail" gameMode="Auto"/>
    </div>

    <div class="absolute left-[765px]">
        <LocationSelector gameMode="Auto" />
    </div>


    <div class="absolute left-[465px]">
        <button class="btn btn-primary"on:click={handleClick}>Back</button>
    </div>
    <div class="absolute left-[465px] top-[350px]">
        <TrashCan gameMode="Auto"/>
    </div>
   

</main>
