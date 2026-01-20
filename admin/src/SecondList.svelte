<script>
  import { onMount } from "svelte";
  import { secondPickList } from "./PicklistStores.js";
  import SortableList from "./SortableList.svelte";
  import Component from "./Component.svelte";
  let headerText = "First Pick";
  export let picklist = "";
  export let list = [];
  let i = 0;
  let tempList = [];
  export let pickType = "";
  let fullList = [];
  let promise = new Promise(() => {});
  let promise2 = new Promise(() => {});
  //   onMount(() => {
  //     promise = (async () => {
  //         const response = await fetch("/get_firstlist", { method: "GET" });
  //         const data = await response.json();
  //         list = data;

  //   })();
  //   });
  onMount(() => {
    promise2 = (async () => {
      const response = await fetch("/get_secondlistpg", { method: "GET" });
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
    updateList($secondPickList, "/set_picklistorderpg");
  }
  console.log("await" + list);
  //   function getPickList(fullList, pickType) {
  //     i = 0;
  //     tempList = [];
  //     while (i < fullList.length)
  //       if (fullList[i]["type"] == pickType) {
  //         tempList.append(fullList[i]);
  //       }
  //     i++;
  //     console.log("correct options" + list)
  //     list = tempList;
  //   }

  console.log("signifying picklist" + picklist);

  const sortList = (ev) => {
    list = ev.detail;
    console.log("sort list" + list);
  };


</script>

<div class="flex flex-col gap-x-40">
  <h1>
    {pickType}
    <button
      class="h-12 px-6 m-2 text-xl rounded-lg bg-yellow-500 text-purple-800"
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
