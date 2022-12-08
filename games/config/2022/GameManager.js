import GameComponent from "./GameComponent.svelte";
import { Writable } from "svelte/store";
import { get } from "svelte/store";

import data from "./data.js";
import state from "./gamestate.js";


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
        state.update(state => appManager.state - 1);
    }
    setReverseAlliance(reversed) { }
    getData() {
        return get(data);
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

