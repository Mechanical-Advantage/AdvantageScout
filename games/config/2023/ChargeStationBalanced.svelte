<script>
    
    import { gameData } from "./stores";

    let buttonColor
       function handleClick(){

                $gameData["AutoEngage"] = $gameData["AutoEngage"] + 1

        if($gameData["AutoEngage"]==2){
            $gameData["AutoEngage"] = 0

        }


        buttonColor = $gameData["AutoEngage"] == 0 ? "bg-gray" : "bg-green"
    }
    
</script>


<button class="btn btn-primary"on:click={handleClick}>Engaged?</button>