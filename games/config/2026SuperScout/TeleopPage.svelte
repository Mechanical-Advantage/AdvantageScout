<script>
  import { gameData } from "./stores";
</script>

<main>
  <div class="flex flex-row gap-x-[20px] absolute m-[10px]">
    <div>
      <label for="message" class="block mb-2 text-sm font-bold text-white"
        >{$gameData["Team1"]} Comment</label
      >
      <textarea
        id="message"
        rows="4"
        class="block p-2.5 w-[400px] h-[200px] text-base rounded-lg border-gray-300 placeholder-gray-400 text-gray-50 bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
        placeholder="15 characters or more..."
        bind:value={$gameData["Team1Comment"]}
      />
    </div>

    <div>
      <label for="message" class="block mb-2 text-sm font-bold text-white"
        >{$gameData["Team2"]} Comment</label
      >
      <textarea
        id="message"
        rows="4"
        class="block p-2.5 w-[400px] h-[200px] text-base rounded-lg border-gray-300 placeholder-gray-400 text-gray-50 bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
        placeholder="15 characters or more..."
        bind:value={$gameData["Team2Comment"]}
      />
    </div>
    <div>
      <label for="message" class="block mb-2 text-sm font-bold text-white"
        >{$gameData["Team3"]} Comment</label
      >
      <textarea
        id="message"
        rows="4"
        class="block p-2.5 w-[400px] h-[200px] text-base rounded-lg border-gray-300 placeholder-gray-400 text-gray-50 bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
        placeholder="15 characters or more..."
        bind:value={$gameData["Team3Comment"]}
      />
    </div>
  </div>
</main>
