<script>
  import { fuelButtonTap } from "./stores";

  function handleClick() {
    $fuelButtonTap = !$fuelButtonTap;
  }
</script>

<button class="btn btn-primary" on:click={handleClick}
  >{$fuelButtonTap ? "Switch to BPS" : "Switch to BPT"}</button
>

<style>
  .btn {
    padding: 1px 10px;
    font-size: 10px;
  }

  .btn-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-primary {
    background-color: rgb(0, 51, 255);
    color: white;
  }

  .btn-success {
    background-color: green;
    color: white;
  }
</style>
