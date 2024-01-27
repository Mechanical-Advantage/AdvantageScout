<script>
    import { onMount } from "svelte";
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
          const response = await fetch("/get_secondlist", { method: "GET" });
          const data = await response.json();
          list = data;
  
    })();
    });
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
      console.log("sort list" + list)
    };
  </script>
    <div class="flex flex-col gap-x-40">
      <h1>
        {pickType}
      </h1>
      <SortableList {list} key="id" on:sort={sortList} let:item let:index pickType = {pickType}>
        <Component {item} {index} />
      </SortableList>
    </div>
  
  