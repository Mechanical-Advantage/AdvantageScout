import { writable } from 'svelte/store';

export const liveGamepiece = writable(0);
export const liveLocation = writable("Floor");
export const floorPickup = writable(0);
export const gameState = writable(0)
export const autoState = writable(0)
export const autoDataLog = writable([])
export const teleDataLog = writable([])
export const reversedAlliance = writable(0)
export const selectedCommunity = writable(0) //blue is 0, red is 1
export const displayText = writable(["x", " "]) //idek
export const undoDisplayCondition = writable(false)
export const uploadState = writable(0)
export const currentTeam = writable(0)
export const climbButton = writable(0)



export const gameData = writable({
    AllianceColor: 0,
    ReversedAlliance: 0,
    StartPosition: 0,
    Leave: 0,
    AutoScaleCubeSuccess: 0,
    AutoScaleCubeFail: 0,
    AutoSwitchCubeSuccess: 0,
    AutoSwitchCubeFail: 0,
    TeleScaleCubeSuccess:0,
    TeleScaleCubeFail: 0,
    TeleSwitchCubeSuccess: 0,
    TeleSwitchCubeFail: 0,
    TeleClimb: 0,
    TeleAssistedClimb: 0,
    AutoPreLoadedCubeCollect: 0,
    AutoFloorCubeCollect: 0,
    TelePreLoadedCubeCollect: 0,
    TeleFloorCubeCollect: 0,
    TelePortalCubeCollect: 0,
    TeleExchangeCubeCollect: 0,
    TeleExchangeCubeSuccess: 0,
    TeleExchangeCubeFail: 0,
    AutoCubeDrop: 0,
    TeleCubeDrop: 0,
    PlayingDefenseDuration: 0,
    UnderDefenseDuration: 0,
    Park: 0,
    Points: 0,
    Penalties: 0,
    BotState: 1,
    Disabled: 0,
    DriverRating: 0,
    CubeIntakeRating: 0,
    DefenseRating: 0,
    UnderDefenseRating: 0,
    Comment: " "
})
