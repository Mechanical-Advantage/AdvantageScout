import { writable } from 'svelte/store';

export const liveGamepiece = writable(0);
export const liveLocation = writable("Floor");
export const floorPickup = writable(0);
export const highConeSuccess = writable(0);
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


export const gameData = writable({
    AllianceColor: 0,
    StartPosition: 0,
    StartConfig: ["Cone", "Cone", "Cone", "Cone"],
    StartGamePiece: "Cone",
    Mobility: 0,
    AutoSpeakerNoteSuccess: 0,
    AutoSpeakerNoteFail: 0,
    AutoAmpNoteSuccess: 0,
    AutoAmpNoteFail: 0,
    TeleSpeakerNoteSuccess:0,
    TeleSpeakerNoteFail: 0,
    TeleAmpNoteSuccess: 0,
    TeleAmpNoteFail: 0,
    AutoFloorConeCollect: 0,
    AutoFloorCubeCollect: 0,
    TeleFloorConeCollect: 0,
    TeleFloorCubeCollect: 0,
    TeleSingleConeCollect: 0,
    TeleSingleCubeCollect: 0,
    TeleDoubleConeCollect: 0,
    TeleDoubleCubeCollect: 0,
    AutoNoteDrop: 0,
    TeleNoteDrop: 0,
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
