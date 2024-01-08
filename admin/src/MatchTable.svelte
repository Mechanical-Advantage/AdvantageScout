<script>
    import { onMount } from "svelte";
    import { is_function } from "svelte/internal";

    // let matches = [
    //     { teams: [6328, 2713, 6328, 4176, 6367, 5563], uploaded: [true, true, true, true, true, true] },
    //     { teams: [3323, 8626, 501, 1761, 1922, 2423], uploaded: [true, true, true, true, true, true] },
    //     { teams: [8604, 6201, 69, 1099, 5000, 6723], uploaded: [true, true, true, true, true, true] },
    //     { teams: [4909, 5846, 2877, 2084, 1757, 1965], uploaded: [true, true, true, true, true, true] },
    //     { teams: [6933, 125, 7674, 6529, 95, 5752], uploaded: [true, true, true, true, true, true] },
    //     { teams: [7822, 5687, 5347, 97, 151, 6763], uploaded: [true, true, true, true, true, true] },
    //     { teams: [69, 5735, 5000, 5563, 3323, 6201], uploaded: [true, true, true, true, true, true] },
    //     { teams: [1099, 4311, 8626, 1761, 6723, 2877], uploaded: [true, true, true, true, true, true] },
    //     { teams: [2423, 6529, 1965, 1757, 6367, 8604], uploaded: [true, true, true, true, true, true] },
    //     { teams: [7822, 5752, 1474, 6933, 95, 4909], uploaded: [true, true, true, true, true, true] }
    // ];

    let name = "";
    let matches = [];
    async function getUploaded() {
        const response = await fetch("/get_uploaded", { method: "GET" });
        const data = await response.json();
        matches = data;
        matches = matches;
        console.log(matches);
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
        <thead class="border-slate-700">
            <tr>
                <th class="bg-gray-700 text-white">match</th>
                <th class="bg-red-700">R1</th>
                <th class="bg-red-700">R2</th>
                <th class="bg-red-700">R3</th>
                <th class="bg-blue-700">B1</th>
                <th class="bg-blue-700">B2</th>
                <th class="bg-blue-700">B3</th>
            </tr>
        </thead>

        <tbody class="rounded-md table-auto">
            {#each matches as match, i}
                <tr />
                <td
                    class={match.teams.includes(6328)
                        ? " bg-gray-600 text-yellow-500 font-bold"
                        : "bg-gray-600 text-white font-bold"}>match {i + 1}</td
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
                                ? 'bg-red-400 text-black'
                                : 'bg-blue-300 text-black'
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
