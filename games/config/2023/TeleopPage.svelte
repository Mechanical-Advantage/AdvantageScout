 <script>
    import Nodes from "./Nodes.svelte";
    import LocationSelector from "./LocationSelector.svelte";
    import TrashCan from "./TrashCan.svelte";
 </script>
 
 <!-- <ScoringGrid /> -->
    <div class="absolute left-[20px] top-[40px]">
        <Nodes level="3" type="Success" gameMode="Tele" />
    </div>
    <div class="absolute left-[160px] top-[40px]">
        <Nodes level="3" type="Fail" gameMode="Tele" />
    </div>
    <div class="absolute left-[20px] top-[195px]">
        <Nodes level="2" type="Success" gameMode="Tele"/>
    </div>
    <div class="absolute left-[160px] top-[195px]">
        <Nodes level="2" type="Fail" gameMode="Tele"/>
    </div>
    <div class="absolute left-[20px] top-[350px]">
        <Nodes level="1" type="Success" gameMode="Tele"/>
    </div>
    <div class="absolute left-[160px] top-[350px]">
        <Nodes level="1" type="Fail" gameMode="Tele"/>
    </div>

    <div class="absolute left-[765px]">
        <LocationSelector gameMode="Tele"/>
    </div>

    <div class="absolute left-[465px] top-[350px]">
        <TrashCan gameMode="Tele"/>
    </div>
