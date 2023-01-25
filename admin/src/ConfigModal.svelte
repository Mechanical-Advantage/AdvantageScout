<script>
    let currentGame = 'Game'
    let currentEvent = 'Event'
    let reverse_alliances = 'Red Left, Blue Right'
    let dev_mode = 'On'
    let auto_schedule = 'Auto'

    let key = ''
    let value = ''
    let actionurl = "/set_config"


    async function updateConfig(key, value) {
        const formData = new FormData();
        formData.append("key", key);
        formData.append("value", value);
        const res = await fetch(actionurl, {
            method: "POST",
            body: formData,
        })
    }
</script>

<!-- The button to open modal -->
<label for="my-modal-3" class="btn modal-button">Config</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal-3" class="modal-toggle" />
<div class="modal">
    <div class="modal-box modal-xl bg-blue-700">
        <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <div class = "text-2xl font-bold text-yellow-500">Game</div>
            <div><input class = "text-black" bind:value = {currentGame}></div>
            <button class = "h-12 px-6 m-2 text-xl bg-yellow-500 text-blue-700" on:click={updateConfig("game", currentGame)}>Save</button>
            <div class = "text-2xl font-bold text-yellow-500">Event</div>
            <div><input class = "text-black" bind:value = {currentEvent}></div>
            <button class = "h-12 px-6 m-2 text-xl bg-yellow-500 text-blue-700" on:click={updateConfig("event", currentEvent)}>Save</button>
            <div class = "text-2xl font-bold text-yellow-500">Reverse Alliances</div>
            <select id = "reverse_alliances" name = "reverse_alliances" class = "text-black" bind:value={reverse_alliances}>
                <option value = "0">Red Left, Blue Right</option>
                <option value = "1">Blue Left, Red Right</option>
            </select>
            <button class = "h-12 px-6 m-2 text-xl bg-yellow-500 text-blue-700" on:click={updateConfig("reverse_alliances", reverse_alliances)}>Save</button>
            <div class = "text-2xl font-bold text-yellow-500">Dev Mode</div>
            <select id = "dev_mode" name = "dev_mode" class = "text-black" bind:value={dev_mode}>
                <option value = "0">On</option>
                <option value = "1">Off</option>
            </select>
            <button class = "h-12 px-6 m-2 text-xl bg-yellow-500 text-blue-700" on:click={updateConfig("dev_mode", dev_mode)}>Save</button>
            <div class = "text-2xl font-bold text-yellow-500">Auto Schedule</div>
            <select id = "auto_schedule" name = "auto_schedule" class = "text-black" bind:value={auto_schedule}>
                <option value = "0">Auto</option>
                <option value = "1">Manual</option>
            </select>
            <button class = "h-12 px-6 m-2 text-xl bg-yellow-500 text-blue-700" on:click={updateConfig("auto_schedule", auto_schedule)}>Save</button>
    </div>
</div>
