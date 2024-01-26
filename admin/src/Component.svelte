<script>
	export let item;
	export let index;
</script>

<style>
	span{
		background-color: #288a71d9;
		border-radius: 4px;
		padding: 0 1em;
		font-size: 1.75em;
	}
</style>

<h1>
	<span>{index+1}</span> {item.name}   -   {item.score}
</h1>