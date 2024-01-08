<script>
    let matchNumber = 0;
    let actionurl = "/get_cache";
    let actionurl2 = "/reschedule";
    async function RefreshSchedule(method) {
        const formData = new FormData();
        formData.append("source", method);
        const res = await fetch(actionurl, {
            method: "POST",
            body: formData,
        });
    }

    async function ForceSchedule(matchNumber) {
        const formData = new FormData();
        formData.append("force_match", matchNumber);
        const res = await fetch(actionurl2, {
            method: "POST",
            body: formData,
        });
    }

    async function ReSchedule() {
        const res = await fetch(actionurl2, {
            method: "GET",
        });
    }
</script>

<label for="Match-Schedule" class="btn modal-button">Match Schedule</label>
<input type="checkbox" id="Match-Schedule" class="modal-toggle" />
<div class="modal">
    <div class="modal-box modal-xl bg-blue-700">
        <label
            for="Match-Schedule"
            class="btn btn-sm btn-circle absolute right-2 top-2">✕</label
        >
        <button
            class="h-12 px-6 m-2 text-xl rounded-lg bg-yellow-500 text-blue-700"
            on:click={RefreshSchedule("tba")}>Refresh From TBA</button
        >
        <br />
        <button
            class="h-12 px-6 m-2 text-xl rounded-lg bg-yellow-500 text-blue-700"
            on:click={RefreshSchedule("csv")}>Refresh from CSV</button
        >
        <br />
        <button
            class="h-12 px-6 m-2 text-xl rounded-lg bg-yellow-500 text-blue-700"
            on:click={ReSchedule}>Reschedule Next Match</button
        >
        <div>
        <button
            class="h-12 px-6 m-2 text-xl rounded-lg bg-yellow-500 text-blue-700"
            on:click={ForceSchedule(matchNumber)}>Force Schedule</button
        >
        
        <input class="input w-[100px] " type="number" bind:value={matchNumber} />
        </div>
    </div>
</div>

