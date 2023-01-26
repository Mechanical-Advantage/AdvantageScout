<script>
    import GamePiece from "./GamePiece.svelte";
    import Community from "./Community.svelte";
    import StartGamePiece from "./StartGamePiece.svelte";
    import { autoState } from "./stores";
    import ChargeStation from "./ChargeStation.svelte";
    import StartingLine from "./StartingLine.svelte";
    import ChargeStationCrossedButton from "./ChargeStationCrossedButton.svelte";  
    import ChargeStationDocked from "./ChargeStationDocked.svelte";
    import ChargeStationBalanced from "./ChargeStationBalanced.svelte";

    function handleClick() {
        $autoState = 1;
    }
</script>





<Community width=294 height=462 strokeWidth=5.5 flippedH=true />


<div class="absolute left-[650px] -mt-[240px]">
    <div class="tooltip tooltip-open tooltip-top tooltip-primary" data-tip="Starting Gamepiece">
    <StartGamePiece mode="Start" />
    </div>
</div>

<div class="absolute bg-grey ml-[475px] -mt-[400px]">
    <ChargeStation />
</div>

<div class="absolute -mt-[400px] ml-[850px]">
<StartingLine />
</div>
<div class="absolute -mt-[400px] ml-[850px]">
    <button class="btn btn-primary" on:click={handleClick}>Start</button>
</div>


