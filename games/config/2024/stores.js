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
export const onStageButton = writable(0)



export const gameData = writable({
    AllianceColor: 0,
    ReversedAlliance: 0,
    StartPosition: 0,
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
    AutoPreLoadedNoteCollect: 0,
    AutoFloorSpike0NoteCollect: 0,
    AutoFloorSpike1NoteCollect: 0,
    AutoFloorSpike2NoteCollect: 0,
    AutoFloorCenterline0NoteCollect: 0,
    AutoFloorCenterline1NoteCollect: 0,
    AutoFloorCenterline2NoteCollect: 0,
    AutoFloorCenterline3NoteCollect: 0,
    AutoFloorCenterline4NoteCollect: 0,
    TelePreLoadedNoteCollect: 0,
    TeleFloorNoteCollect: 0,
    TeleSourceNoteCollect: 0,
    AutoNoteDrop: 0,
    TeleNoteDrop: 0,
    CoopertitionBonus: 0,
    Harmony: 0,
    TeleFerryNoteSuccess: 0,
    PlayingDefenseDuration: 0,
    UnderDefenseDuration: 0,
    Park: 0,
    Points: 0,
    Penalties: 0,
    BotState: 0,
    DriverRating: 0,
    NoteIntakeRating: 0,
    DefenseRating: 0,
    UnderDefenseRating: 0,
    AutoPath: ["sz1"], 
    Comment: " "
})
