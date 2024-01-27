<script>
	export let item;
	export let index;
</script>

<style>
	span{
		background-color: #288a71d9;
		border-radius: 4px;
		size: 5em;
		padding: 0 1em;
		/* width: 60; */
		display: inline-block;
		justify-content: center;
		font-size: 1.75em;
	}
</style>

<h1>
	<span>{index+1}</span> {item.name}   -   {item.score}
</h1>