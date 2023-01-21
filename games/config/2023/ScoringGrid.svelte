<script>
    import Nodes from "./Nodes.svelte";
</script>

<div class="grid grid-cols-2 grid-rows-3 gap-0">
    <div>
        <Nodes level="3" type="success" />
    </div>
    <div>
        <Nodes level="3" type="fail" />
    </div>
    <!-- <br /> -->
    <div>
        <Nodes level="2" type="success" />
    </div>
    <div>
        <Nodes level="2" type="fail" />
    </div>
    <!-- <br /> -->
    <div>
        <Nodes level="1" type="success" />
    </div>
    <div>
        <Nodes level="1" type="fail" />
    </div>
</div>
