<script>
    //import ButtonGroup from "./ButtonGroup.svelte";
    import Nodes from "./Nodes.svelte";
    import LocationSelector from "./LocationSelector.svelte";
    import TrashCan from "./TrashCan.svelte";
    import { autoState, autoDataLog } from "./stores";
    import Undo from "./Undo.svelte";
    import Mobility from "./Mobility.svelte";
    import CurrentTeam from "./CurrentTeam.svelte";
    import GamePiece from "./GamePiece.svelte";

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
  <Nodes level="4" type="Success" gameMode="Tele" />
</div>

<div class="absolute left-[200px] top-[40px]">
  <Nodes level="4" type="Fail" gameMode="Tele" />
</div>
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
<div class="absolute left-[425px] top-[215px]">
  <Nodes level="5" type="Success" gameMode="Tele" />
</div>

<div class="absolute left-[605px] top-[215px]">
  <Nodes level="5" type="Fail" gameMode="Tele" />
</div>

<div class="absolute left-[425px] top-[100px]">
  <Nodes level="6" type="Success" gameMode="Tele" />
</div>

<div class="absolute left-[605px] top-[100px]">
  <Nodes level="6" type="Fail" gameMode="Tele" />
</div>

<!-- <div class="absolute left-[425px] top-[350px]">
  <Nodes level="4" type="Success" gameMode="Tele" />
</div> -->

<div class="absolute left-[500px]">
  <LocationSelector gameMode="Tele" />
</div>


    <div class="absolute top-[10px] left-[607px]">
        <div class="flex flex-col gap-y-[25px]">
            <button class="btn btn-primary" on:click={handleClick}>Back</button>
           
        </div>
    </div>

    <div class="absolute top-[350px] left-[425px]">
        <div class="flex flex-col gap-y-[25px]">
            <div>
                <TrashCan gameMode="Auto" />
            </div>

                
            
        </div>
    </div>
     <div class="absolute top-[350px] left-[600px]">
            <div>
                <Mobility />
            </div>
      </div>
      <div class="absolute top-[375px] left-[750px]">

                <Undo />
            
        </div>
    
</main>

