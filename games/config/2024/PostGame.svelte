<script>
    import Ratings from "./Ratings.svelte";
    import { gameData, uploadState } from "./stores";
    // import { Radio } from 'flowbite-svelte';
    // import Radio from './Radio.svelte'

//     function myFunction() {
//   document.getElementById({handleClick}).classList.toggle("show");
// }

// // Close the dropdown menu if the user clicks outside of it
// window.onclick = function(event) {
//   if (!event.target.matches({handleClick})) {
//     var dropdowns = document.getElementsByClassName("dropdown-top");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }

    
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
    function handleClick(event) {
        $gameData["BotState"] = event.currentTarget.value;
        // $gameData["Disabled"] && $gameData["Inoperable"] && $gameData["NoIssue"] == $gameData["Disabled"] && $gameData["Inoperable"] && $gameData["NoIssue"]  === 0 ? 1 : 0; 
        // $gameData["Disabled"] = $gameData["Disabled"]  === 0 ? 1 : 0;
        // buttonColor = $gameData["Disabled"] === 0 ? "btn-primary" : "btn-error";
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
<div class="flex flex-col h-full">
    <div class="grid grid-cols-3 w-full h-full">
        <div class="  h-full">
            <Ratings name="DriverRating" />
            <Ratings name="PlayingDefenseDuration" />
            <Ratings name="UnderDefenseDuration" />
        </div>
        <div class="  h-full">
            <Ratings name="NoteIntakeRating" />
            <Ratings name="DefenseRating" />
            <Ratings name="UnderDefenseRating" />
        </div>
        <div class="  h-full">
            <label for="message" class="block mb-2 text-sm font-bold text-white"
            >Comment</label>
            <textarea
                id="message"
                rows="4"
                class="block p-2.5 w-full text-sm rounded-lg border border-gray-300 placeholder-gray-400 text-gray-50 bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
                placeholder="15 characters or more..."
                bind:value={$gameData["Comment"]}
            />
        </div>
    </div>
    <div class="p-2.5 w-full h-[200px] "> 
        <input type="radio" name="Bot State" class="radio checked:bg-red-500" value = "0" checked on:change={handleClick} />
        <span class="label-text">Disabled</span> 
        <input type="radio" name="Bot State" class="p-2.5 radio checked:bg-yellow-500" value = "1" checked on:change={handleClick} />
        <span class="label-text">Inoperable</span> 
        <input type="radio" name="Bot State" class="p-2.5 radio checked:bg-green-500" value = "2" checked on:change={handleClick} />
        <span class=" label-text">No Issues</span>
        <div class="inline-flex bg-gray-700 ">
            <span
                class="inline-flex p-2.5 items-center text-sm border border-r-0 border-gray-300 rounded-l-md bg-gray-600 text-gray-200 border-gray-600"
            >
                Points
            </span>
            <input
                type="number"
                class="rounded-none rounded-r-lg w-[90px] p-2.5 text-sm bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                bind:value={$gameData["Points"]}
                min="0"
            />
        </div>
        <div class="inline-flex bg-gray-700 ">
            <span
                class="inline-flex items-center p-2.5 text-sm border border-r-0 border-gray-300 rounded-l-md bg-gray-600 text-gray-200 border-gray-600"
            >
                Penalties
            </span>
            <input
                type="number"
                class="rounded-none rounded-r-lg w-[90px] p-2.5 text-sm bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
</div>




<!-- <div class="flex flex-row gap-x-[90px] ml-[30px]">
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

<div class="absolute ml-[700px] -mt-[250px]">
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

<div class="flex flex-row gap-x-[50px] ml-[30px] mt-[30px]">
    <button class="btn {buttonColor}" on:click={handleClick}>
        Disabled/Fell</button
    >

<div class = "dropdown dropdown-bottom flex flex-row gap-x-[50px] ml-[30px] mt-[30px]">
    <button class="btn {$gameData["Disabled"] === 0 ? "btn " : "btn-success"} {$gameData["Inoperable"] === 2 ? "btn" : ""}" on:click={handleClick}>Dis/Inop</button>
    <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52">
        <li><a>Disabled/Fell</a></li>
        <li><a>Inoperable</a></li>
        </ul>

<div class="dropdown dropdown-top flex flex-row gap-x-[50px] ml-[30px] mt-[30px]">
            <button onclick="myDropdown" class="dropbtn">Dropdown</button>
            <div id="myDropdown" class="dropdown-content">
              <a >Link 1</a>
              <a >Link 2</a>
              <a> Link 3</a>
            </div>
          

            <div class="absolute gap-x-[0px] ml-[800px] -mt-[100px]">
                <label class="label cursor-pointer">
                  <span class="label-text">Disabled</span> 
                  <input type="radio" name="radio-10" class="radio checked:bg-red-500" checked />
                </label>
              </div>
              <div class="absolute gap-x-[200px] ml-[800px] -mt-[60px]">
                <label class="label cursor-pointer">
                  <span class="label-text">Inoperable</span> 
                  <input type="radio" name="radio-10" class="radio checked:bg-yellow-500" checked />
                </label>
              </div>
              <div class="absolute gap-x-[20px] ml-[800px] -mt-[20px]">
                <label class="label cursor-pointer">
                  <span class="label-text">No Issues</span> 
                  <input type="radio" name="radio-10" class="radio checked:bg-green-500" checked />
                </label>
              </div>
        
    
        <Radio {options} fontSize={16} legend='InOP Issues' bind:userSelected={$gameData["Inoperable"]}/>

    <div class="flex flex-row gap-x-[0px] ml-[30px] mt-[30px]">
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

    <div class="flex flex-row gap-x-[0px] ml-[200px] mt-[-40px]">
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
<div class="flex flex-row gap-x-[0px] ml-[400px] mt-[-45px]">
    <button
        class="btn {$gameData['Comment'].length < 14
            ? 'btn-disabled'
            : 'btn-primary'}"
        on:click={upload}>Upload</button
    >
</div> -->
