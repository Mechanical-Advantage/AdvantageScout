<script>
  import { gameData, uploadState } from "./stores";
  import Ratings from "./Ratings.svelte";

</script>

  <main>
    <div class=" absolute top-[12px] left-[60px] ">
      <label for="message" class="block mb-2 text-sm font-bold text-white"
        >Defense Comment</label
      >
      <textarea
        id="message"
        rows="4"
        class="block p-2.5 w-[400px] h-[200px] text-base rounded-lg border-gray-300 placeholder-gray-400 text-gray-50 bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
        placeholder="15 characters or more..."
        bind:value={$gameData["TeleComment"]}
      />
      <div class="mt-[15px] ">
        <Ratings name="DriverSpeed" />
        <Ratings name="DriverSkill" />
      </div>
    </div>
    <div class="w-full absolute top-[50px] left-[550px]">
      <div class="inline-flex bg-gray-700">
        <span
          class="inline-flex items-center p-2.5 text-sm border border-r-0 border-gray-300 rounded-l-md bg-gray-600 text-gray-200 border-gray-600"
        >
          Driver Team
        </span>
        <input
          type="number"
          class="rounded-none rounded-r-lg w-[90px] p-2.5 text-sm bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          bind:value={$gameData["DriverTeam"]}
          min="0"
        />
      </div>

    <div class="p-2.5 w-full h-[200px]"></div>


</main>

