<script>
    import SortableList from './SortableList.svelte';
    import Component from './Component.svelte';
    let headerText = "First Pick";
    export let picklist = "";
    let list = "";
    if (picklist == "1"){
        list = [
        {id: 1, name: '8808', score:20},
        {id: 2, name: '176', score:44},
        {id: 3, name: '4909', score:33},
        {id: 4, name: '195', score:19},
        {id: 5, name: '128', score:60},
        {id: 6, name: '8410', score:37},
        {id: 7, name: '2168', score:23},
        {id: 8, name: '3467', score:19},
        {id: 9, name: '78', score:10},
        {id: 10, name: '5000', score:26},
        {id: 11, name: '1433', score:38},
        {id: 12, name: '190', score:68},
        {id: 13, name: '1073', score:92},
        {id: 14, name: '1058', score:22},
        {id: 15, name: '319', score:59},
        {id: 16, name: '6328', score:6}
    ];
    }
    else {
        headerText = "Second Pick";
        list = [
        {id: 1, name: '238', score:20},
        {id: 2, name: '254', score:52},
        {id: 3, name: '4905', score:13},
        {id: 4, name: '1768', score:19},
        {id: 5, name: '3263', score:60},
        {id: 6, name: '7407', score:55},
        {id: 7, name: '1071', score:53},
        {id: 8, name: '501', score:73},
        {id: 9, name: '88', score:12},
        {id: 10, name: '1729', score:10},
        {id: 11, name: '1153', score:84},
        {id: 12, name: '157', score:31},
        {id: 13, name: '1100', score:18},
        {id: 14, name: '20', score:95},
        {id: 15, name: '48', score:31},
        {id: 16, name: '6329', score:34}
    ];
    }
    console.log("hello" + picklist)
    const sortList = ev => {list = ev.detail};
    </script>
    <div class="flex flex-col gap-x-40">
    <h1>
        {headerText}
    </h1>
    <SortableList 
        {list} 
        key="id" 
        on:sort={sortList}
        let:item
            let:index
    >
        <Component {item} {index}/>
    </SortableList>
    </div>
