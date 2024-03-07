<script>
    import Nodes from "./Nodes.svelte";
    import LocationSelector from "./LocationSelector.svelte";
    import TrashCan from "./TrashCan.svelte";
    import Undo from "./Undo.svelte";
    import Parked from "./Parked.svelte";
    import { teleDataLog } from "./stores";
    import CurrentTeam from "./CurrentTeam.svelte";
    import OnStage from "./OnStage.svelte";
</script>

<!-- <ScoringGrid /> -->
<div class="absolute left-[80px] top-[40px]">
    <Nodes level="1" type="Success" gameMode="Tele" />
</div>

<div class="absolute left-[240px] top-[40px]">
    <Nodes level="1" type="Fail" gameMode="Tele" />
</div>
<div class="absolute left-[60px] top-[195px]">
    
    <Nodes level="2" type="Success" gameMode="Tele" />
</div>
<div class="absolute left-[60px] top-[350px]">
    <Nodes level="2" type="Fail" gameMode="Tele" />
</div>
<div class="absolute left-[425px] top-[195px]">
    <Nodes level="3" type="Success" gameMode="Tele" />
</div>

<div class="absolute left-[605px] top-[195px]">
    <Nodes level="3" type="Fail" gameMode="Tele" />
</div>

<div class="absolute left-[425px] top-[350px]">
    <Nodes level="4" type="Success" gameMode="Tele" />
</div>

<div class="absolute left-[500px]">
    <LocationSelector gameMode="Tele" />
</div>


<div class="absolute ml-[525px] mt-[30px]">
    <div class="flex flex-col gap-y-2">
    <Parked />
    </div>
</div>
<div class="absolute ml-[675px] mt-[30px]">
    <div class="flex flex-col gap-y-2">
    <OnStage />
    </div>
</div>

<div>
    <div class="flex flex-row gap-x-[50px] absolute left-[905px] top-[217px]">
        <Undo />
</div> 
</div>


<div class="flex flex-row gap-x-[50px] absolute left-[605px] top-[350px]"> 
    <div>
        <TrashCan gameMode="Tele" />
    </div>


</div>
<div class="ml-[425px] mt-[30px]">
    <CurrentTeam />
</div>
