<script>
    import GamePiece from "./GamePiece.svelte";
    import Community from "./Community.svelte";
    import StartGamePiece from "./StartGamePiece.svelte";
    
</script>

<Community/>
<StartGamePiece mode="Start"/>
<div class="flex flex-col -mt-[400px] ml-[600px]">
<StartGamePiece mode="Line" postition=0/>
<StartGamePiece mode="Line"postition=1/>
<StartGamePiece mode="Line"postition=2/>
<StartGamePiece mode="Line"postition=3/>
</div>
