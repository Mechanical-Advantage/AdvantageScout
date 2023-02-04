import GameComponent from "./GameComponent.svelte";

import { get } from "svelte/store";
import { gameState, gameData, reversedAlliance,uploadState } from "./stores";


export default class Game {
    #gameComponent = null;
 
    constructor(root, appManager, reversed) {
        console.log("Hello, this is the module for the 2023 game!", root);
        reversedAlliance.update(n => reversed)
        uploadState.subscribe(uploadState => {
            if (uploadState > 0){
                appManager.scoutManager.upload()
        }
        });
        this.#gameComponent = new GameComponent({
            target: root
        });
    }
    setMode(mode) {
        console.log("app state", appManager.state)
        gameState.update(n => appManager.state - 1);
        console.log("Updates state", get(gameState))
    }
    // setReverseAlliance(reversed) {
    //     console.log("Reversed alliance", get(reversedAlliance))
    //     reversedAlliance.update(n => reversed)

    // }

    getData() {
        return get(gameData);
    }
    
    
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

