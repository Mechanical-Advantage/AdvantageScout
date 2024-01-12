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


export const gameData = writable({
    AllianceColor: 0,
    StartPosition: 0,
    StartConfig: ["Cone", "Cone", "Cone", "Cone"],
    StartGamePiece: "Cone",
    Leave: 0,
    AutoSpeakerNoteSuccess: 0,
    AutoSpeakerNoteFail: 0,
    AutoAmpNoteSuccess: 0,
    AutoAmpNoteFail: 0,
    TeleSpeakerNoteSuccess:0,
    TeleSpeakerNoteFail: 0,
    TeleAmpNoteSuccess: 0,
    TeleAmpNoteFail: 0,
    TeleTrapNoteSuccess: 0,
    TeleTrapNoteFail: 0,
    TeleOnstage: 0,
    AutoFloorSpike0Collect: 0,
    AutoFloorSpike1Collect: 0,
    AutoFloorSpike2Collect: 0,
    AutoFloorCenterLine0Collect: 0,
    AutoFloorCenterLine1Collect: 0,
    AutoFloorCenterLine2Collect: 0,
    AutoFloorCenterLine3Collect: 0,
    AutoFloorCenterLine4Collect: 0,
    TeleFloorNoteCollect: 0,
    TeleSourceNoteCollect: 0,
    AutoNoteDrop: 0,
    TeleNoteDrop: 0,
    CoopertitionBonus: 0,
    Harmony: 0,
    PlayingDefenseDuration: 0,
    UnderDefenseDuration: 0,
    Park: 0,
    Points: 0,
    Penalties: 0,
    Disabled: 0,
    DriverRating: 0,
    NoteIntakeRating: 0,
    DefenseRating: 0,
    UnderDefenseRating: 0,
    Comment: " "
})
