<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let plusCode = "M12 4v16m8-8H4"
    let minusCode = "M20 12H4"
    export let color = "success"
    export let plusOrMinus = "plus"
    export let directDispatch = false
    export let directDispatchCommand = "pressed"

    function pressed(){
        if(directDispatch) {
            dispatch(directDispatchCommand)
        }
        else{
            dispatch(directDispatchCommand, {
                value: plusOrMinus
            });
        }
    }
</script>

<button on:click={pressed} class="btn btn-{color} btn-outline btn-square w-36 h-24">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24  ml-9 mt-4" fill="none" viewBox="0 0 39 39" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d={((plusOrMinus==="plus") ? plusCode : minusCode)} /></svg>
</button>