<script>
    import { onMount } from "svelte";
    import { is_function } from "svelte/internal";

   

    let name = "";
    let matches = [];
    async function getUploaded() {
        const response = await fetch("/get_uploaded", { method: "GET" });
        const data = await response.json();
        matches = data;
        matches = matches;
    }
    setInterval(getUploaded, 1500);

    // function deleteRow(rowToBeDeleted) {
    //     data = data.filter((row) => row != rowToBeDeleted);
    // }

    let style = {
        uploadedUs: "uploadedUs",
        uploaded: "uploaded",
        notUploaded: "notUploaded",
        notUploadedUs: "notUploadedUs",
        red: "red",
        blue: "blue",
    };
</script>

<div class="relative overflow-y-auto">
    <table class="table-auto border-separate border-spacing-1 ">
        <thead class="border-slate-900">
            <tr>
                <th class="bg-zinc-500 text-white">match</th>
                <th class="bg-blue-700">B1</th>
                <th class="bg-blue-700">B2</th>
                <th class="bg-blue-700">B3</th>
                <th class="bg-red-700">R1</th>
                <th class="bg-red-700">R2</th>
                <th class="bg-red-700">R3</th>
            </tr>
        </thead>

        <tbody class="rounded-md table-auto">
            {#each matches as match, i}
                <tr />
                <td
                    class={match.teams.includes(6328)
                        ? " bg-gray-700 text-yellow-500 font-bold"
                        : "bg-gray-700 text-white font-bold"}>match {i + 1}</td
                >
                {#each match.teams as team, i}
                    <!-- <td
                        class={match.uploaded[i] ? "text-green-500":
                        team==6328 ? team==match.teams[0] || team==match.teams[1] || team==match.teams[2] ? "bg-red-500 text-yellow-500 font-bold": "bg-blue-500 text-yellow-500 font-bold":
                        team==match.teams[0] || team==match.teams[1] || team==match.teams[2] ? "bg-red-500": "bg-blue-500"}
                    >{team}</td> -->

                    <td
                        class="{team === 6328
                            ? 'font-bold text-yellow-600'
                            : ''} {match.uploaded[i]
                            ? 'bg-green-300'
                            : ''} {!match.uploaded[i]
                            ? team == match.teams[0] ||
                              team == match.teams[1] ||
                              team == match.teams[2]
                                ? 'bg-blue-300 text-black'
                                : 'bg-red-400 text-black'
                            : 'text-black'} text-center">{team}</td
                    >

                    <!--                     
                    {#if team == match.teams[0] || team == match.teams[1] || team == match.teams[2]}
                        {#if team == 6328}
                            {#if match.uploaded[i]}
                                <td class = "{style['uploadedUs']} text-center">{team}</td>
                            {:else}
                                <td class = "{style['red']} {style['notUploadedUs']} text-center">{team}</td>
                            {/if}
                        {:else}
                            {#if match.uploaded[i]}
                                <td class = "{style['uploaded']} text-center">{team}</td>
                            {:else}
                                <td class = "{style['red']} {style['notUploaded']} text-center">{team}</td>
                            {/if}
                        {/if}
                    {:else}
                        {#if team == 6328}
                            {#if match.uploaded[i]}
                                <td class = "{style['uploadedUs']} text-center">{team}</td>
                            {:else}
                                <td class = "{style['blue']} {style['notUploadedUs']} text-center">{team}</td>
                            {/if}
                        {:else}
                            {#if match.uploaded[i]}
                                <td class = "{style['uploaded']} text-center">{team}</td>
                            {:else}
                                <td class = "{style['blue']} {style['notUploaded']} text-center">{team}</td>
                            {/if}
                        {/if}
                    {/if} -->
                {/each}
            {/each}
        </tbody>
    </table>
</div>

<!-- <div class="relative overflow-y-auto">
    <table class="table-auto border-separate border-spacing-2">
        <thead class="border-slate-700">
            <tr>
                <th class="bg-gray-500">match</th>
                <th class="bg-red-500">R1</th>
                <th class="bg-red-500">R2</th>
                <th class="bg-red-500">R3</th>
                <th class="bg-blue-500">B1</th>
                <th class="bg-blue-500">B2</th>
                <th class="bg-blue-500">B3</th>
            </tr>
        </thead>

        <tbody class="rounded-md table-auto">
            {#each matches as match, i}
                <tr />
                <td class={match.teams.includes(6328) ? "text-yellow-500 font-bold" : "text-white font-bold"}
                    >match {i + 1}</td
                >
                {#each match.teams as team, i}
                    <td
                        class={match.uploaded[i] ? "text-green-500" : team== 6328 ? "text-yellow-500" : "text-white"}
                    >
                        {team}
                    </td>
                {/each}
            {/each}
        </tbody>
    </table>
</div> -->
<style>
    table {
        border-collapse: collapse;
        width: 100;
    }

    tr {
        border: 1px solid rgb(0, 0, 0);
    }

    /* td {
        padding: 10px;
        border: 1px solid rgb(0, 0, 0);
        background-color: rgb(200, 200, 200);
        font-weight: bold;
    } */

    /* th {
        padding: 10px;
        border: 1px solid rgb(0, 0, 0);
        background-color: rgb(150, 150, 150);
    } */

    .red {
        background-color: rgb(255, 100, 100);
    }

    .blue {
        background-color: rgb(100, 100, 255);
    }

    .uploaded {
        background-color: rgb(175, 255, 160);
        font-weight: normal;
        color: rgb(0, 0, 0);
    }

    .notUploaded {
        font-weight: normal;
        color: rgb(255, 255, 255);
    }

    .uploadedUs {
        background-color: rgb(175, 255, 160);
        font-weight: bold;
        color: rgb(255, 255, 0);
    }

    .notUploadedUs {
        font-weight: bold;
        color: rgb(255, 255, 25);
    }

    .matchUs {
        background-color: rgb(225, 225, 0);
        font-weight: bold;
        color: rgb(0, 150, 225);
    }

    .match {
        background-color: rgb(200, 200, 200);
        font-weight: bold;
        color: rgb(0, 0, 0);
    }
</style>
