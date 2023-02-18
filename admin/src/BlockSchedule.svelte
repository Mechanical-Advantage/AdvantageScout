<script>
    let actionurl = "/block_schedule"
    let data = {}
    let trainingLength = ""
    let groupSize = ""
    let breakLength = ""
    let start = ""
    let end = ""

    async function blockSchedule(training_length, group_size, break_length, start, end) {
        const formData = new FormData();
        formData.append("training_length", training_length);
        formData.append("group_size", group_size);
        formData.append("break_length", break_length);
        formData.append("start", start);
        formData.append("end", end);
        const res = await fetch(actionurl, {
            method: "POST",
            body: formData,
        })

        alert(res)
    }
</script>

<label for="Block-Schedule" class="btn modal-button">Block Schedule</label>
<input type="checkbox" id="Block-Schedule" class="modal-toggle" />
<div class="modal">
    <div class="modal-box modal-xl bg-blue-700">
        <label for="Block-Schedule" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <div class = "text-2xl font-bold text-yellow-500">Training Length</div>
            <div><input class = "text-black rounded-md" bind:value = {trainingLength}></div>
            <br>
            <div class = "text-2xl font-bold text-yellow-500">Group Size</div>
            <div><input class = "text-black rounded-md" bind:value = {groupSize}></div>
            <br>
            <div class = "text-2xl font-bold text-yellow-500">Break Length</div>
            <div><input class = "text-black rounded-md" bind:value = {breakLength}></div>
            <br>
            <div class = "text-2xl font-bold text-yellow-500">Start</div>
            <div><input class = "text-black rounded-md" bind:value = {start}></div>
            <br>
            <div class = "text-2xl font-bold text-yellow-500">End</div>
            <div><input class = "text-black rounded-md" bind:value = {end}></div>
            <br>
            <button class = "h-12 px-6 text-xl rounded-lg bg-yellow-500 text-blue-700" on:click={blockSchedule(trainingLength, groupSize, breakLength, start, end)}>Save</button>
    </div>
</div>