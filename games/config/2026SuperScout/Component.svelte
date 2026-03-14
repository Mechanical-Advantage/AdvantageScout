<script>
	import { onMount } from "svelte";
	export let item;
	export let index;
	onMount(() => console.log("creating component item=", item, "key=", index));
</script>

<h3>
	<span class="label">{index + 1}</span>
	{item.name}
</h3>
<span contenteditable="true">{item.content}</span>

<style>
	.label {
		background-color: #0cb21a;
		border-radius: 4px;
		padding: 0 1em;
		font-size: 0.8em;
	}
</style>
