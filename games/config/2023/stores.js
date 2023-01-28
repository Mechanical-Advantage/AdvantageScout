import { writable } from 'svelte/store';

export const liveGamepiece = writable(0);
export const liveLocation = writable("Floor");
export const floorPickup = writable(0);
export const highConeSuccess = writable(0);
export const gameState = writable(0)
export const autoState = writable(0)
export const dataLog = writable([])
export const reversedAlliance = writable(0)
export const selectedCommunity = writable(0) //blue is 0, red is 1
export const displayText = writable(["x", " " ]) //idek


export const gameData = writable({
    AllianceColor: 0,
    StartPosition: 0,
    StartConfig: ["Cone", "Cone", "Cone", "Cone"],
    StartGamePiece: "Cone",
    Mobility: 0,
    AutoHybridConeSuccess: 0,
    AutoHybridConeFail: 0,
    AutoHybridCubeSuccess: 0,
    AutoHybridCubeFail: 0,
    AutoMidConeSuccess: 0,
    AutoMidConeFail: 0,
    AutoMidCubeSuccess: 0,
    AutoMidCubeFail: 0,
    AutoHighConeSuccess: 0,
    AutoHighConeFail: 0,
    AutoHighCubeSuccess: 0,
    AutoHighCubeFail: 0,
    TeleHybridConeSuccess: 0,
    TeleHybridConeFail: 0,
    TeleHybridCubeSuccess: 0,
    TeleHybridCubeFail: 0,
    TeleMidConeSuccess: 0,
    TeleMidConeFail: 0,
    TeleMidCubeSuccess: 0,
    TeleMidCubeFail: 0,
    TeleHighConeSuccess: 0,
    TeleHighConeFail: 0,
    TeleHighCubeSuccess: 0,
    TeleHighCubeFail: 0,
    AutoDock: 0,
    AutoEngage: 0,
    TeleDock: "",
    TeleEngage: "",
    AutoDockTraverse: 0,
    TeleDockTraverse: 0,
    AutoFloorConeCollect: 0,
    AutoFloorCubeCollect: 0,
    TeleFloorConeCollect: 0,
    TeleFloorCubeCollect: 0,
    TeleSingleConeCollect: 0,
    TeleSingleCubeCollect: 0,
    TeleDoubleConeCollect: 0,
    TeleDoubleCubeCollect: 0,
    AutoConeDrop: 0,
    AutoCubeDrop: 0,
    TeleConeDrop: 0,
    TeleCubeDrop: 0,
    CoopertitionBonus: 0,
    LinkRP: 0,
    PlayingDefenseDuration: 0,
    UnderDefenseDuration: 0,
    Park: 0,
    Points: 0,
    Penalties: 0,
    Disabled: 0,
    DriverRating: 0,
    CubeIntakeRating: 0,
    ConeIntakeRating: 0,
    DefenseRating: 0,
    UnderDefenseRating: 0,
    Comment: " "
})
