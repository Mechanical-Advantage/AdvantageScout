<script>
    let schedule = {}
    let teams = []
    let scouts = []
    let ready = []
    let match = 0
    async function getSchedule(){
        
    const response = await fetch("/get_schedule", { method: "GET" });
    const data = await response.json();
    schedule = data;
    console.log("Schedule" + data["match"])
    teams = schedule["teams"]
    console.log(teams)
    scouts = schedule["scouts"]
    ready = schedule["ready"]
    match = schedule["match"]
}
setInterval(getSchedule, 500)

</script>

<div>
    <table class="table-auto border-separate border-spacing-1 ">
        <tbody class="rounded-md table-auto">
                Schedule for Match {match}
                <tr />
                {#each teams as team, i}
                    <td class = {i < 3 ? ready[i] == true ? "blueUploaded" : "blueNotUploaded" : ready[i] == true ? "redUploaded" : "redNotUploaded"}>{team}</td>
                {/each}
                <tr />
                {#each scouts as scout, i}
                    <td class = {i < 3 ? ready[i] == true ? "blueUploaded" : "blueNotUploaded" : ready[i] == true ? "redUploaded" : "redNotUploaded"}>{scout}</td>
                {/each}
        </tbody>
    </table>
</div>

<style>
    .blueUploaded {
        background-color: #87C3FF;
        color: black;
        text-decoration: line-through;
        text-align: center;
    }

    .blueNotUploaded {
        background-color: #87C3FF;
        color: black;
        text-align: center;
    }

    .redUploaded {
        background-color: #FF6E6E;
        color: black;
        text-decoration: line-through;
        text-align: center;
    }

    .redNotUploaded {
        background-color: #FF6E6E;
        color: black;
        text-align: center;
    }

</style>