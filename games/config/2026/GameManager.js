import GameComponent from "./GameComponent.svelte";

import { get } from "svelte/store";
import { gameState, gameData, reversedAlliance,uploadState, currentTeam, gameShift, currentMessages } from "./stores";


export default class Game {
    #gameComponent = null;
 
    constructor(root, appManager, reversed) {
        console.log("Hello, this is the module for the 2026 game!", root);
        reversedAlliance.update(n => reversed);
        currentTeam.update(n => appManager.team);
        uploadState.subscribe(uploadState => {
            if (uploadState > 0) {
                appManager.scoutManager.upload()
            }
            
        });
        gameShift.subscribe(n => appManager.shift = n);
        this.#gameComponent = new GameComponent({
            target: root
        });

        this.messageInterval = setInterval(() => {
        if (get(currentMessages) !== appManager.dataMessages && appManager.dataMessages.length > 0) {
            currentMessages.set(appManager.dataMessages);
        }
    }, 200);
    }
    setMode(mode) {
        console.log("app state", appManager.state);
        appManager.dataMessages = [];
        gameState.update(n => appManager.state - 1);
        console.log("Updates state", get(gameState));
        console.log("Team ", appManager.team);
        
    }
    // setReverseAlliance(reversed) {
    //     console.log("Reversed alliance", get(reversedAlliance))
    //     reversedAlliance.update(n => reversed)

    // }
    getData() {
        return get(gameData);
    }
    destroy() {
        clearInterval(this.messageInterval);
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

