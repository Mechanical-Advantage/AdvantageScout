<script>
    import PlusMinusButton from "./PlusMinusButton.svelte";

    export let orientation = "horizontal"
    export let value = 0
    export let floor = 0
    export let ceiling = 1000
    export let colors = "success" //can be success, error, or mix
    let textLeft = 188

    function pressed(event) {
        if (event.detail.value === "plus") {
            if (value < ceiling) {
                value++
                console.log(value)
            }
        } else if (event.detail.value === "minus") {
            if (value > floor) {
                value--
                console.log(value)
            }
        }
        textLeft = 188+15 - (value.toString().length*15)
    }
</script>

<div class="absolute">
    <PlusMinusButton on:pressed={pressed} color={((colors === "error" || colors === "mix") ? "error" : "success")}
                 plusOrMinus="minus"/>
</div>


<div class="absolute text-5xl mt-[25px]"
     style="transform:
		translate({textLeft}px,0px)">
    {value}
</div>

<div class="absolute ml-[260px]">
    <PlusMinusButton on:pressed={pressed} color={((colors === "success" || colors === "mix") ? "success" : "error")}
                 plusOrMinus="plus" class="absolute"/>
</div>