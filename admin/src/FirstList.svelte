<script>
  import { onMount } from "svelte";
  import SortableList from "./SortableList.svelte";
  import Component from "./Component.svelte";
  import { firstPickList } from "./PicklistStores.js";
  export let picklist = "";
  export let list = [];
  export let pickType = "";
  onMount(() => {
    promise = (async () => {
      const response = await fetch("/get_firstlistpg", { method: "GET" });
      const data = await response.json();
      list = data;
    })();
  });

  async function updateList(data, actionUrl) {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    const res = await fetch(actionUrl, {
      method: "POST",
      body: formData,
    });
    alert("UPDATED ORDER!");
  }

  function handleClick() {
    updateList($firstPickList, "/set_picklistorderpg");
  }

  const sortList = (ev) => {
    list = ev.detail;
  };
</script>

<div class="flex flex-col gap-x-40">
  <h1>
    {pickType}
    <button
      class="h-12 px-6 m-2 text-xl rounded-lg bg-yellow-500 text-green-700"
      on:click={handleClick}>Save</button
    >
  </h1>
  <SortableList
    {list}
    key="id"
    on:sort={sortList}
    let:item
    let:index
    {pickType}
  >
    <Component {item} {index} />
  </SortableList>
</div>
