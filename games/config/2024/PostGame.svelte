<script>
    import Ratings from "./Ratings.svelte";
    import { gameData, uploadState } from "./stores";
    import Radio from './Radio.svelte'


    const options = [{
		value: 0,
		label: 'No Issues',
	},
{
		value: 1,
		label: 'Fell Over',
	}, {
		value: 2,
		label: 'Brown Outs',
	}, {
		value: 3,
		label: 'Lost Comms',
	}]

    let buttonColor = "btn-primary";
    function handleClick() {
        $gameData["Disabled"] = $gameData["Disabled"] === 0 ? 1 : 0;

        buttonColor = $gameData["Disabled"] === 0 ? "btn-primary" : "btn-error";
    }

    function upload() {
        $gameData["Comment"] = $gameData["Comment"].replace(
            /[^\x20-\x7E]+/g,
            ""
        );
        $gameData["Points"] =
            $gameData["Points"] === null ? 0 : $gameData["Points"];
        $gameData["Penalties"] =
            $gameData["Penalties"] === null ? 0 : $gameData["Penalties"];
        $uploadState += 1;
    }
</script>

<div class="flex flex-row gap-x-[90px] ml-[30px]">
    <Ratings name="DriverRating" />
    <Ratings name="NoteIntakeRating" />
</div>

<div class="flex flex-row gap-x-[90px] mt-[20px] ml-[30px]">
    <Ratings name="PlayingDefenseDuration" />
    <Ratings name="DefenseRating" />
</div>

<div class="flex flex-row gap-x-[90px] mt-[20px] ml-[30px]">
    <Ratings name="UnderDefenseDuration" />
    <Ratings name="UnderDefenseRating" />
</div>

<div class="absolute ml-[700px] -mt-[200px]">
    <label for="message" class="block mb-2 text-sm font-bold text-white"
        >Comment</label
    >
    <textarea
        id="message"
        rows="4"
        class="block p-2.5 w-[300px] text-sm rounded-lg border border-gray-300 placeholder-gray-400 text-gray-50 bg-gray-700 focus:ring-blue-500 focus:border-blue-500 resize-none"
        placeholder="15 characters or more..."
        bind:value={$gameData["Comment"]}
    />
</div>

<!-- <div class="flex flex-row gap-x-[50px] ml-[30px] mt-[30px]">
    <button class="btn {buttonColor}" on:click={handleClick}>
        Disabled/Fell</button
    > -->
<div class = "dropdown dropdown-bottom flex flex-row gap-x-[50px] ml-[30px] mt-[30px]">
    <button class="btn {$gameData["Disabled"] === 0 ? "btn " : "btn-success"} {$gameData["Inoperable"] === 2 ? "btn" : ""}" on:click={handleClick}>Dis/Inop</button>
    <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52">
        <li><a>Disabled/Fell</a></li>
        <li><a>Inoperable</a></li>
        </ul>
    
        <!-- <Radio {options} fontSize={16} legend='InOP Issues' bind:userSelected={$gameData["Inoperable"]}/> -->

    <div class="flex">
        <span
            class="inline-flex items-center px-3 text-sm border border-r-0 border-gray-300 rounded-l-md bg-gray-600 text-gray-200 border-gray-600"
        >
            Points
        </span>
        <input
            type="number"
            class="rounded-none rounded-r-lg w-[90px] text-sm p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            bind:value={$gameData["Points"]}
            min="0"
        />
    </div>

    <div class="flex">
        <span
            class="inline-flex items-center px-3 text-sm border border-r-0 border-gray-300 rounded-l-md bg-gray-600 text-gray-200 border-gray-600"
        >
            Penalties
        </span>
        <input
            type="number"
            class="rounded-none rounded-r-lg w-[90px] text-sm p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            bind:value={$gameData["Penalties"]}
            min="0"
        />
    </div>

    <button
        class="btn {$gameData['Comment'].length < 14
            ? 'btn-disabled'
            : 'btn-primary'}"
        on:click={upload}>Upload</button
    >
</div>
