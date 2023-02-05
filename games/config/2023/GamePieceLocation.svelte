<script>
    import GamePiece from "./GamePiece.svelte";

    export let location

</script>


<div class="indicator absolute">

    <span
        class="indicator-item indicator-middle indicator-center indicator-start badge badge-primary "
        >{location}</span
    >
    <div class="absolute hover:animate-bounce">
        <GamePiece gamePiece="Cone" {location} />
    </div>
    <div class="absolute ml-[140px] hover:animate-bounce">
        <GamePiece gamePiece="Cube" {location} />
    </div>
</div>

