<script>
  import Nodes from "./Nodes.svelte";
  import LocationSelector from "./LocationSelector.svelte";
  import CurrentTeam from "./CurrentTeam.svelte";
  import AutoClimbDismount from "./AutoClimbDismount.svelte";
  import ButtonRepeatSpeed from "./ButtonRepeatSpeed.svelte";
  import GameShift from "./GameShift.svelte";
  import { liveLocation, fuelButtonTap } from "./stores";
  import TowerClimb from "./TowerClimb.svelte";
  import ClimbPositions from "./ClimbPositions.svelte";
  import ClimbTimer from "./ClimbTimer.svelte";
  import ButtonIncrementSlider from "./ButtonIncrementSlider.svelte";
  import ButtonModeToggle from "./ButtonModeToggle.svelte";

  $liveLocation = "Floor";
</script>

<!-- <ScoringGrid /> -->
<div class="absolute left-[60px] top-[40px]">
  <Nodes level="3" type="Success" gameMode="Tele" />
</div>
<div class="absolute left-[60px] top-[190px]">
  <Nodes level="2" type="Success" gameMode="Tele" />
</div>
<div class="absolute left-[900px] top-[190px]">
  <Nodes level="2" type="Fail" gameMode="Tele" />
</div>
<div class="absolute left-[60px] top-[340px]">
  <Nodes level="1" type="Success" gameMode="Tele" />
</div>
<div class="absolute left-[900px] top-[340px]">
  <Nodes level="1" type="Fail" gameMode="Tele" />
</div>

<div class="absolute left-[280px] top-[60px]">
  <LocationSelector gameMode="Tele" />
</div>
<div class="absolute left-[400px] top-[280px]">
  <ButtonModeToggle />
  {#if $fuelButtonTap}
    <ButtonIncrementSlider />
  {:else if !$fuelButtonTap}
    <ButtonRepeatSpeed />
  {/if}
</div>
<div class="ml-[425px] mt-[30px]">
  <CurrentTeam />
</div>
<!-- <div class="absolute ml-[400px] mt-[300px]">
  <AutoClimbDismount />
</div>  -->
<div class="absolute ml-[300px] mt-[75px]">
  <GameShift />
</div>
<div class="absolute ml-[600px] mt-[-40px]">
  <div class="flex flex-row gap-x-3">
    <TowerClimb buttonType="L1" />
    <TowerClimb buttonType="L2" />
    <TowerClimb buttonType="L3" />
    <ClimbPositions />
  </div>
  <div class="absolute ml-[300px] mt-[30px]">
    <ClimbTimer />
  </div>
</div>
