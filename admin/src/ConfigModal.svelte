<script>
    let currentGame = 'Game'
    let currentEvent = 'Event'
    let reverse_alliances = 'Red Left, Blue Right'
    let dev_mode = 'On'
    let auto_schedule = 'Auto'

    let key = ''
    let value = ''
    let actionurl = "/set_config/"
    async function updateConfig(key, value) {
        const res = await fetch(actionurl, {
            method: "POST",
            body: JSON.stringify({key, value})
        })
    }
</script>

<!-- The button to open modal -->
<label for="my-modal-3" class="btn modal-button">Config</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal-3" class="modal-toggle" />
<div class="modal">
    <div class="modal-box relative">
        <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            Game
            <div><input bind:value = {currentGame}></div>
            <button on:click={updateConfig("game", currentGame)}>Save Game</button>
            Event
            <div><input bind:value = {currentEvent}></div>
            <button on:click={updateConfig("event", currentEvent)}>Save Event</button>
            Reverse Alliances
            <select id = "reverse_alliances" name = "reverse_alliances" bind:value={reverse_alliances}>
                <option value = "0">Red Left, Blue Right</option>
                <option value = "1">Blue Left, Red Right</option>
            </select>
            <button on:click={updateConfig("reverse_alliances", reverse_alliances)}>Save Reverse Alliances</button>
            Dev Mode
            <select id = "dev_mode" name = "dev_mode" bind:value={dev_mode}>
                <option value = "0">On</option>
                <option value = "1">Off</option>
            </select>
            <button on:click={updateConfig("dev_mode", dev_mode)}>Save Dev Mode</button>
            Auto Schedule
            <select id = "auto_schedule" name = "auto_schedule" bind:value={auto_schedule}>
                <option value = "0">Auto</option>
                <option value = "1">Manual</option>
            </select>
            <button on:click={updateConfig("auto_schedule", auto_schedule)}>Save Auto Schedule</button>
    </div>
</div>
