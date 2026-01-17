<script>
  import Nodes from "./Nodes.svelte";
  import LocationSelector from "./LocationSelector.svelte";
  import CurrentTeam from "./CurrentTeam.svelte";
  import AutoClimbDismount from "./AutoClimbDismount.svelte";
  import ButtonRepeatSpeed from "./ButtonRepeatSpeed.svelte";
  import GameShift from "./GameShift.svelte";
</script>

<!-- <ScoringGrid /> -->
<div class="absolute left-[60px] top-[40px]">
  <Nodes level="3" type="Success" gameMode="Tele" />
</div>

<div class="absolute left-[60px] top-[140px]">
  <Nodes level="2" type="Success" gameMode="Tele" />
</div>
<div class="absolute left-[800px] top-[140px]">
  <Nodes level="2" type="Fail" gameMode="Tele" />
</div>
<div class="absolute left-[60px] top-[250px]">
  <Nodes level="1" type="Success" gameMode="Tele" />
</div>
<div class="absolute left-[800px] top-[250px]">
  <Nodes level="1" type="Fail" gameMode="Tele" />
</div>

<div class="absolute left-[100px] top-[40px]">
  <LocationSelector gameMode="Tele" />
</div>
<div class="absolute left-[400px] top-[250px]">
  <ButtonRepeatSpeed />
</div>
<div class="ml-[425px] mt-[30px]">
  <CurrentTeam />
</div>
<div class="absolute ml-[400px] mt-[300px]">
  <AutoClimbDismount />
</div>  
<div class="absolute ml-[300px] mt-[00px]">
  <GameShift />
</div>  
