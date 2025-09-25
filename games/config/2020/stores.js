import { writable } from 'svelte/store';

export const liveGamepiece = writable([]);
export const liveLocation = writable(0);
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
    TeleBottomCellSuccess: 0,
	TeleColorPos: 0,
	TeleColorRot: 0,
	TeleOuterCellSuccess: 0,
	TeleInnerCellSuccess: 0,
	TeleL4CellSuccess: 0,
	AutoBottomCellSuccess: 0,
	AutoOuterCellSuccess: 0,
	AutoInnerCellSuccess: 0,
	AutoL4CellSuccess: 0,
	TeleBottomCellFail: 0,
	TeleOuterCellFail: 0,
	TeleInnerCellFail: 0,
	TeleL4CellFail: 0,
	AutoBottomCellFail: 0,
	AutoOuterCellFail: 0,
	AutoInnerCellFail: 0,
	AutoL4CellFail: 0,
	TeleProcessorAlgaeSuccess: 0,
	AutoProcessorAlgaeSuccess: 0,
	TeleProcessorAlgaeFail: 0,
	AutoProcessorAlgaeFail: 0,
    TeleNetAlgaeSuccess: 0,
	AutoNetAlgaeSuccess: 0,
	TeleNetAlgaeFail: 0,
	AutoNetAlgaeFail: 0,
	TeleHanging: 0,
	TeleBalanced: 0,
    AutoHanging: 0,
	AutoBalanced: 0,
	DriverRightStation: 0,
	DriverLeftStation: 0,
	DriverRightFloor: 0,
	DriverLeftFloor: 0,
	AutoCellDrop: 0,
    TeleCellDrop: 0,
	AutoPreLoadedCellCollect: 0,
	TelePreLoadedCellCollect: 0,
	AutoNearFloorCellCollect: 0,
	AutoNearStationCellCollect: 0,
	AutoFarFloorCellCollect: 0,
	AutoFarStationCellCollect: 0,
	TeleNearFloorCellCollect: 0,
	TeleNearStationCellCollect: 0,
	TeleFarFloorCellCollect: 0,
	TeleFarStationCellCollect: 0,
	TeleFloorCellCollect: 0,
    TeleStationCellCollect: 0,
	AutoFloorCellCollect: 0,
    AutoStationCellCollect: 0,
	AutoMark2CellCollect: 0,
	AutoMark1CellCollect: 0,
	AutoMark3CellCollect: 0,
	TeleMark2CellCollect: 0,
    PlayingDefenseDuration: 0,
    UnderDefenseDuration: 0,
    Park: 0,
    Points: 0,
    Penalties: 0,
    BotState: 1,
    Disabled: 0,
    DriverRating: 0,
    CellIntakeRating: 0,
    DefenseRating: 0,
    UnderDefenseRating: 0,
    AutoPath: ["sz1"], 
    AutoPathWithResult: ["sz1"],
    Comment: " "
})
