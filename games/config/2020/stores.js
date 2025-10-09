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
	TeleBottomCellsSuccess: 0,
	TeleColorPosSuccess: 0,
	TeleColorRotSuccess: 0,
	TeleColorPosFail: 0,
	TeleColorRotFail: 0,
	TeleOuterCellsSuccess: 0,
	TeleInnerCellsSuccess: 0,
	AutoBottomCellsSuccess: 0,
	AutoOuterCellsSuccess: 0,
	AutoInnerCellsSuccess: 0,
	TeleBottomCellsFail: 0,
	TeleOuterCellsFail: 0,
	TeleInnerCellsFail: 0,
	AutoBottomCellsFail: 0,
	AutoOuterCellsFail: 0,
	TeleHanging: 0,
	TeleBalanced: 0,
	DriverRightStation: 0,
	DriverLeftStation: 0,
	DriverRightFloor: 0,
	DriverLeftFloor: 0,
	AutoCellsDrop: 0,
	TeleCellsDrop: 0,
	AutoPreLoadedCellsCollect: 0,
	TelePreLoadedCellsCollect: 0,
	AutoFloorCellsCollect: 0,
	TeleFloorCellsCollect: 0,
	TeleChuteCellsCollect: 0,
	PlayingDefenseDuration: 0,
	UnderDefenseDuration: 0,
	Park: 0,
	Points: 0,
	Penalties: 0,
	BotState: 1,
	Disabled: 0,
	DriverRating: 0,
	CellsIntakeRating: 0,
	DefenseRating: 0,
	UnderDefenseRating: 0,
	AutoPath: ["sz1"], 
	AutoPathWithResult: ["sz1"],
	Comment: " "
})
