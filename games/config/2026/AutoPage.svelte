<script>
  import Nodes from "./Nodes.svelte";
  import { track } from "./tracker.js";
  import LocationSelector from "./LocationSelector.svelte";
  import { autoState, fuelButtonTap } from "./stores";
  import CurrentTeam from "./CurrentTeam.svelte";
  import TowerClimb from "./TowerClimb.svelte";
  import ButtonRepeatSpeed from "./ButtonRepeatSpeed.svelte";
  import ButtonIncrementSlider from "./ButtonIncrementSlider.svelte";
  import ButtonModeToggle from "./ButtonModeToggle.svelte";

  function handleClick() {
    $autoState = 0;
  }
</script>

<main>
  <div class="absolute left-[425px] mt-[30px]">
    <CurrentTeam />
  </div>

  <div class="absolute left-[60px] top-[40px]">
    <Nodes level="3" type="Success" gameMode="Auto" />
  </div>
  <div class="absolute left-[60px] top-[190px]">
    <Nodes level="2" type="Success" gameMode="Auto" />
  </div>
  <div class="absolute left-[900px] top-[190px]">
    <Nodes level="2" type="Fail" gameMode="Auto" />
  </div>
  <div class="absolute left-[60px] top-[340px]">
    <Nodes level="1" type="Success" gameMode="Auto" />
  </div>
  <div class="absolute left-[900px] top-[340px]">
    <Nodes level="1" type="Fail" gameMode="Auto" />
  </div>
  <div class="absolute left-[400px] top-[280px]">
    <ButtonModeToggle />
    {#if $fuelButtonTap}
      <ButtonIncrementSlider />
    {:else if !$fuelButtonTap}
      <ButtonRepeatSpeed />
    {/if}
  </div>
  <div class="absolute left-[280px] top-[40px]">
    <LocationSelector gameMode="Auto" />
  </div>
  <div class="absolute top-[10px] left-[607px]">
    <div class="flex flex-col gap-y-[25px]">
      <button
        class="btn btn-primary"
        on:click={handleClick}
        use:track={"AutoPageBackButton"}>Back</button
      >
    </div>
  </div>
  <div class="absolute ml-[300px] mt-[150px]">
    <TowerClimb buttonType="L1" />
  </div>
</main>
