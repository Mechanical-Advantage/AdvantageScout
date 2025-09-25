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
    import ActiveGamePiece from "./ActiveGamePiece.svelte";
    import { liveGamepiece } from "./stores";

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
<div class="absolute left-[130px] top-[40px]">
  <Nodes level="3" type="Success" gameMode="Auto" />
</div>
<!-- <div class="absolute left-[200px] top-[140px]">
  <Nodes level="3" type="Fail" gameMode="Auto" />
</div> -->
<div class="absolute left-[60px] top-[140px]">
  <Nodes level="2" type="Success" gameMode="Auto" />
</div>
<div class="absolute left-[200px] top-[140px]">
  <Nodes level="2" type="Fail" gameMode="Auto" />
</div>
<div class="absolute left-[60px] top-[250px]">
  <Nodes level="1" type="Success" gameMode="Auto" />
</div>
<div class="absolute left-[200px] top-[250px]">
  <Nodes level="1" type="Fail" gameMode="Auto" />
</div>


<div>
  {#if $liveGamepiece[0] == "Cell"}
  <div>
    <div class="absolute ml-[650px] mt-[75px]">
      
      <ActiveGamePiece activeGamePiece = "Cell" />
    
    </div>
  </div>
  {/if}
  {#if $liveGamepiece[1] == "Cell"}
  <div>
    <div class="absolute ml-[650px] mt-[125px]">
      
      <ActiveGamePiece activeGamePiece = "Cell" />
    
    </div>
  </div>
  {/if}
  {#if $liveGamepiece[2] == "Cell"}
  <div>
    <div class="absolute ml-[650px] mt-[175px]">
      
      <ActiveGamePiece activeGamePiece = "Cell" />
    
    </div>
  </div>
  {/if}
  {#if $liveGamepiece[3] == "Cell"}
  <div>
    <div class="absolute ml-[700px] mt-[75px]">
      
      <ActiveGamePiece activeGamePiece = "Cell" />
    
    </div>
  </div>
  {/if}
  {#if $liveGamepiece[4] == "Cell"}
  <div>
    <div class="absolute ml-[700px] mt-[125px]">
      
      <ActiveGamePiece activeGamePiece = "Cell" />
    
    </div>
  </div>
  {/if}
</div>

<!-- <div class="absolute left-[425px] top-[350px]">
  <Nodes level="4" type="Success" gameMode="Tele" />
</div> -->

<!-- {#if $liveGamepiece == "Coral"}
<div>
  <div class="absolute ml-[750px] mt-[175px]">
    
    <ActiveGamePiece activeGamePiece = "Coral" />
  
  </div>
</div>
{/if}

{#if $liveGamepiece == "Algae"}
<div>
  <div class="absolute ml-[750px] mt-[225px]">
    
    <ActiveGamePiece activeGamePiece = "Algae" />
  
  </div>
</div>
{/if} -->
<div class="absolute left-[400px]">
  <LocationSelector gameMode="Auto" />
</div>


    <div class="absolute top-[10px] left-[607px]">
        <div class="flex flex-col gap-y-[25px]">
            <button class="btn btn-primary" on:click={handleClick}>Back</button>
           
        </div>
    </div>

    <div class="absolute top-[250px] left-[425px]">
        <div class="flex flex-col gap-y-[25px]">
            <div>
                <TrashCan gameMode="Auto" />
            </div>

                
            
        </div>
    </div>
     <div class="absolute top-[250px] left-[600px]">
            <div>
                <Mobility />
            </div>
      </div>
      <div class="absolute top-[375px] left-[750px]">

                <Undo />
            
        </div>
    
</main>


