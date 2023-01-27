<script>
    import Nodes from "./Nodes.svelte";
    import LocationSelector from "./LocationSelector.svelte";
    import TrashCan from "./TrashCan.svelte";
    import ChargeStation from "./ChargeStation.svelte";
    import Undo from "./Undo.svelte";
</script>

<!-- <ScoringGrid /> -->
<div class="absolute left-[20px] top-[40px]">
    <Nodes level="3" type="Success" gameMode="Tele" />
</div>
<div class="absolute left-[160px] top-[40px]">
    <Nodes level="3" type="Fail" gameMode="Tele" />
</div>
<div class="absolute left-[20px] top-[195px]">
    <Nodes level="2" type="Success" gameMode="Tele" />
</div>
<div class="absolute left-[160px] top-[195px]">
    <Nodes level="2" type="Fail" gameMode="Tele" />
</div>
<div class="absolute left-[20px] top-[350px]">
    <Nodes level="1" type="Success" gameMode="Tele" />
</div>
<div class="absolute left-[160px] top-[350px]">
    <Nodes level="1" type="Fail" gameMode="Tele" />
</div>

<div class="absolute left-[765px]">
    <LocationSelector gameMode="Tele" />
</div>

<div class="absolute ml-[465px] mt-[70px]">
    <ChargeStation />
</div>

<div class="flex flex-row gap-x-[50px] absolute left-[415px] top-[350px]">
    <div>
        <TrashCan gameMode="Auto" />
    </div>

    <div class="mt-[25px]">
        <Undo />
    </div>
</div>
