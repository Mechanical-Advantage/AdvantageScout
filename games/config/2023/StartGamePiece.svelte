<script>
    import GamePiece from "./GamePiece.svelte";
    import { gameData, liveGamepiece } from "./stores";
    export let mode = 0
    export let postition = 0



    function updateGamePiece() {


         if(mode == "Start"){
             $gameData["StartGamePiece"] = $gameData["StartGamePiece"] == "Cube" ? "Cone" : "Cube"
         }
         else if (mode == "Line"){
            $gameData["StartConfig"][postition] = $gameData["StartConfig"][postition] == "Cube" ? "Cone" : "Cube"
         }

         console.log($gameData["StartGamePiece"])
         console.log($gameData["StartConfig"])


    }
</script>

<label class="swap swap-rotate">
    <input type="checkbox" />

    <svg
        class="swap-on"
        on:click={updateGamePiece}
        fill="#c729c2"
        width="84px"
        height="84px"
        viewBox="0 0 56 56"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#c729c2"
        ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
        /><g id="SVGRepo_iconCarrier"
            ><path
                d="M 28.0000 26.6406 L 50.0783 14.1016 C 49.7264 13.75 49.3045 13.4688 48.7890 13.1875 L 32.2657 3.7657 C 30.8126 2.9453 29.4063 2.5000 28.0000 2.5000 C 26.5938 2.5000 25.1875 2.9453 23.7344 3.7657 L 7.2110 13.1875 C 6.6954 13.4688 6.2735 13.75 5.9219 14.1016 Z M 26.4063 53.5 L 26.4063 29.4532 L 4.3985 16.8906 C 4.2813 17.4063 4.2110 17.9688 4.2110 18.6719 L 4.2110 36.9297 C 4.2110 40.3281 5.4063 41.5938 7.5860 42.8360 L 25.9375 53.2891 C 26.1016 53.3828 26.2422 53.4532 26.4063 53.5 Z M 29.5938 53.5 C 29.7579 53.4532 29.8985 53.3828 30.0626 53.2891 L 48.4141 42.8360 C 50.5938 41.5938 51.7890 40.3281 51.7890 36.9297 L 51.7890 18.6719 C 51.7890 17.9688 51.7189 17.4063 51.6018 16.8906 L 29.5938 29.4532 Z"
            /></g
        ></svg
    >
    <svg
        class="bi bi-cone swap-off"
        on:click={updateGamePiece}
        width="84px"
        height="84px"
        viewBox="0 0 16.00 16.00"
        xmlns="http://www.w3.org/2000/svg"
        fill="#dccc18"
        stroke="#dccc18"
        ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
        /><g id="SVGRepo_iconCarrier">
            <path
                d="M7.03 1.88c.252-1.01 1.688-1.01 1.94 0l2.905 11.62H14a.5.5 0 0 1 0 1H2a.5.5 0 0 1 0-1h2.125L7.03 1.88z"
            />
        </g></svg
    >
</label>
