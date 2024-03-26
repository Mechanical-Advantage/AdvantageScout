<script>
  import { gameData } from "./stores";
    import {currentTeam} from "./stores"


</script>


<div class="badge {$gameData["AllianceColor"] === 0 ? 'badge-primary' : 'badge-error'} badge-lg">{$currentTeam}</div>
<!-- <div class="badge badge-primary badge-lg">{$currentTeam}</div> -->
