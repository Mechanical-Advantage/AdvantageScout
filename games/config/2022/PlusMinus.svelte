<script>
    import PlusMinusButton from "./PlusMinusButton.svelte";

    export let orientation = "horizontal"
    export let value = 0
    export let floor = 0
    export let ceiling = 1000
    export let colors = "success" //can be success, error, or mix

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
    }
</script>
<span class="inline-grid grid-cols-3 gap-1">

<span>
<PlusMinusButton on:pressed={pressed} color={((colors === "error" || colors === "mix") ? "error" : "success")}
                 plusOrMinus="minus" class="static"/>
</span>

    <span class="static text-5xl">
    {value}
    </span>

    <span>
<PlusMinusButton on:pressed={pressed} color={((colors === "success" || colors === "mix") ? "success" : "error")}
                 plusOrMinus="plus" class="static"/>
        </span>

</span>