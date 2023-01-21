<script>
    import GameObject from "./GameObject.svelte";

    export let location = "floor";
</script>

<div class="tooltip tooltip-open tooltip-left" datatip={location}>
    <div>
        <GameObject gamePiece="cone" {...location} />
    </div>
    <div class="ml-[200px] -mt-[50px]">
        <GameObject gamePiece="cube" {...location} />
    </div>
</div>
