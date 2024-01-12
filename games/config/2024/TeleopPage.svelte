<script>
    import Nodes from "./Nodes.svelte";
    import LocationSelector from "./LocationSelector.svelte";
    import TrashCan from "./TrashCan.svelte";
    import Undo from "./Undo.svelte";
    import Parked from "./Parked.svelte";
    import { teleDataLog } from "./stores";
    import CurrentTeam from "./CurrentTeam.svelte";
</script>

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

<div class="absolute left-[765px]">
    <LocationSelector gameMode="Tele" />
</div>


<div class="absolute ml-[465px] mt-[70px]">
    <div class="flex flex-col gap-y-2">
    <Parked />
    </div>
</div>

<div class="flex flex-row gap-x-[50px] absolute left-[415px] top-[350px]">
    <div>
        <TrashCan gameMode="Tele" />
    </div>

    <div class="mt-[25px]">
            <Undo />
    </div>
</div>
<div class="ml-[350px] mt-[50px]">
    <CurrentTeam />
</div>
