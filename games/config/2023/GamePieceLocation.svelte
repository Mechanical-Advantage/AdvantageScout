<script>
    import GamePiece from "./GamePiece.svelte";

    export let location = "Floor";

</script>


<div class="indicator absolute">

    <span
        class="indicator-item indicator-middle indicator-center indicator-start badge badge-primary "
        >{location}</span
    >
    <div class="absolute">
        <GamePiece gamePiece="Cone" {...location} />
    </div>
    <div class="absolute ml-[140px]">
        <GamePiece gamePiece="Cube" {...location} />
    </div>
</div>

