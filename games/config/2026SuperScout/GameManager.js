import GameComponent from "./GameComponent.svelte";

import { get } from "svelte/store";
import { gameState, gameData, reversedAlliance, uploadState, currentTeam, currentSchedule } from "./stores";


export default class Game {
    #gameComponent = null;

    constructor(root, appManager, reversed) {
        currentSchedule.set(JSON.parse(JSON.stringify(appManager.schedule)))
        console.log("First thing ", get(currentSchedule))
        console.log("Second thing ", appManager.schedule["teams"])
        console.log("Hello, this is the module for the 2026 Supes game!", root);
        reversedAlliance.update(n => reversed)
        currentTeam.update(n => appManager.team)
        uploadState.subscribe(uploadState => {
            if (uploadState > 0) {
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
        console.log("Team ", appManager.team)
        console.log("Schedule ", appManager.schedule)

    }
    getData() {
        return get(gameData);
    }


}