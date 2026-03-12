import GameComponent from "./GameComponent.svelte";

import { get } from "svelte/store";
import { gameState, gameData, reversedAlliance, uploadState, currentTeam, gameShift, currentMessages } from "./stores";
import { eventLog } from "./tracker";
export default class Game {
  #gameComponent = null;

  constructor(root, appManager, reversed) {
    console.log("Hello, this is the module for the 2026 game!", root);
    reversedAlliance.update(n => reversed);
    currentTeam.update(n => appManager.team);
    uploadState.subscribe(uploadState => {
      if (uploadState > 0) {
        this.storeLog();
        appManager.scoutManager.upload();
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
  storeLog() {
    const key = "advantagescout_gamelogs";
    const storage = JSON.parse(localStorage.getItem(key) || '[]');
    storage.push(get(eventLog));
    localStorage.setItem(key, JSON.stringify(storage));
    eventLog.set([]);
  }
  setMode(mode) {
    console.log("app state", appManager.state);
    appManager.dataMessages = [];
    gameState.update(n => appManager.state - 1);
    console.log("Updates state", get(gameState));
    console.log("Team ", appManager.team);
  }
  getData() {
    return get(gameData);
  }
  destroy() {
    clearInterval(this.messageInterval);
  }
}