<script>
    let matchNumber = 0
    let actionurl = "/get_cache"

    async function RefreshSchedule(method) {
        const formData = new FormData();
        formData.append("source", method);
        const res = await fetch(actionurl, {
            method: "POST",
            body: formData,
        })
    }
</script>

<label for="Match-Schedule" class="btn modal-button">Match Schedule</label>
<input type="checkbox" id="Match-Schedule" class="modal-toggle" />
<div class="modal">
    <div class="modal-box modal-xl bg-blue-700">
        <label for="Match-Schedule" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <button class = "h-12 px-6 m-2 text-xl rounded-lg bg-yellow-500 text-blue-700" on:click={RefreshSchedule("tba")}>Refresh From TBA</button>
        <br>
            <button class = "h-12 px-6 m-2 text-xl rounded-lg bg-yellow-500 text-blue-700">Refresh from CSV</button>
            <br>
            <button class = "h-12 px-6 m-2 text-xl rounded-lg bg-yellow-500 text-blue-700">Reschedule Next Match</button>
            <br>
            <div><input class = "text-black rounded-md" bind:value = {matchNumber}></div>
            <br>
            <button class = "h-12 px-6 m-2 text-xl rounded-lg bg-yellow-500 text-blue-700">Force Schedule</button>
            </div>
</div>
 