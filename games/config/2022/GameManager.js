import GameComponent from "./GameComponent.svelte";
//import { writable } from "svelte/store";
import { get } from "svelte/store";

//import { data } from "./data.js";
import { state } from "./gamestate.js";


export default class Game {
    #gameComponent = null;

    constructor(root, appManager) {
        console.log("Hello, this is the module for the 2022 game!", root);
        this.#gameComponent = new GameComponent({
            target: root
        });
    }
    //implement store here

    setMode(mode) {
        console.log("app state", appManager.state)
        state.update(n => appManager.state - 1);
        console.log("Updates state", get(state))
    }
    setReverseAlliance(reversed) { }
    getData() {
        //      return get(data);
    }

    // appManager.scoutManager.upload()
}

// export default class Game {
//     constructor(root, appManager) {
//         console.log("Hello, this is the module for the 2022 game!", root);
//         root.style.backgroundColor = "pink";
//     }

//     setMode(mode) { }
//     setReverseAlliance(reversed) { }
//     getData() { }
// }

