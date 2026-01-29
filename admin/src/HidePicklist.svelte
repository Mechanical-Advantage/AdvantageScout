<script>
  export let picklistVisibility = false;
  function toggleVisibility() {
    console.log("Changed picklist visibility");
    picklistVisibility = !picklistVisibility;
  }
</script>
<div>
  <button
    class="btn btn-primary"
    on:click={toggleVisibility}
  >
    Show/Hide Picklist
  </button>
</div>