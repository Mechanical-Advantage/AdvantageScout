<script>
    import GamePiece from "./GamePiece.svelte";

    export let location
    export let gamePieceLocation

</script>


<div class="indicator absolute">

    <div class="absolute hover:animate-bounce">
        <GamePiece gamePiece="Note" gamePieceLocation={location} {...location} />
    </div>
    </div>


