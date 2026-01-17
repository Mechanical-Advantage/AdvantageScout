<script>
    import Nodes from "./Nodes.svelte";
    import LocationSelector from "./LocationSelector.svelte";
    import { autoState, autoDataLog } from "./stores";
    import CurrentTeam from "./CurrentTeam.svelte";
    import TowerClimb from "./TowerClimb.svelte";
    import ButtonRepeatSpeed from "./ButtonRepeatSpeed.svelte";

    function handleClick() {
        $autoState = 0;
    }
</script>

<main>
    <!-- <CurrentTeam/> -->
    <div class="absolute left-[425px] mt-[30px]">
        <CurrentTeam />
    </div>

    <!-- <ScoringGrid /> -->
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
  <ButtonRepeatSpeed />
</div>
<div class="absolute left-[280px] top-[40px]">
  <LocationSelector gameMode="Auto" />
</div>
<div class="absolute top-[10px] left-[607px]">
  <div class="flex flex-col gap-y-[25px]">
    <button class="btn btn-primary" on:click={handleClick}>Back</button>
  </div>
</div>
<div class="absolute ml-[300px] mt-[150px]">
  <TowerClimb buttonType="L1" />
</div>  
</main>


