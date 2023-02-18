<script>
    import Config from "./Config.svelte";
    import ScoutList from "./ScoutList.svelte";
    import MatchTable from "./MatchTable.svelte";
    import ActiveScouts from "./ActiveScouts.svelte";
    import ScoutPrefs from "./ScoutPrefs.svelte";
    import Devices from "./Devices.svelte";
    import ConfigModal from "./ConfigModal.svelte";
    import MatchScheduleModal from "./MatchScheduleModal.svelte";
    import BlockSchedule from "./BlockSchedule.svelte";
    import CurrentMatchDisplay from "./CurrentMatchDisplay.svelte";
</script>

<div class="absolute mt-0 ml-[750px] z-5">
    <ConfigModal />
</div>

<div class = "absolute mt-[100px] ml-[750px] z-5">
    <MatchScheduleModal />
</div>

<div class = "absolute mt-[200px] ml-[750px] z-5">
    <BlockSchedule />
</div>

<div>
    <CurrentMatchDisplay />
</div>

<div>
    <ActiveScouts />
</div>



<div class="absolute ml-[50px] mt-[100px]">
    <MatchTable />
</div>



<div class="absolute top-10 ml-[900px]">
    <ScoutPrefs />
</div>

<div class="absolute top-10 ml-[1250px]">
    <Devices />
</div>
