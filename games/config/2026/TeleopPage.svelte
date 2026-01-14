<script>
  import Nodes from "./Nodes.svelte";
  import LocationSelector from "./LocationSelector.svelte";
  import TrashCan from "./TrashCan.svelte";
  import Undo from "./Undo.svelte";
  import Parked from "./Parked.svelte";
  import { teleDataLog } from "./stores";
  import CurrentTeam from "./CurrentTeam.svelte";
  import ActiveGamePiece from "./ActiveGamePiece.svelte";
  import { liveGamepiece } from "./stores";
</script>

<!-- <ScoringGrid /> -->
<div class="absolute left-[60px] top-[140px]">
  <Nodes level="3" type="Success" gameMode="Tele" />
</div>
<div class="absolute left-[200px] top-[140px]">
  <Nodes level="3" type="Fail" gameMode="Tele" />
</div>
<div class="absolute left-[60px] top-[240px]">
  <Nodes level="2" type="Success" gameMode="Tele" />
</div>
<div class="absolute left-[200px] top-[240px]">
  <Nodes level="2" type="Fail" gameMode="Tele" />
</div>
<div class="absolute left-[60px] top-[350px]">
  <Nodes level="1" type="Success" gameMode="Tele" />
</div>
<div class="absolute left-[200px] top-[350px]">
  <Nodes level="1" type="Fail" gameMode="Tele" />
</div>

<div class="absolute left-[500px]">
  <LocationSelector gameMode="Tele" />
</div>

<div>
  <div class="flex flex-row gap-x-[50px] absolute left-[750px] top-[375px]">
    <Undo />
  </div>
</div>

<div class="ml-[775px] mt-[30px]">
  <CurrentTeam />
</div>
