import { writable } from 'svelte/store';

export const liveGamepiece = writable(0);
export const liveLocation = writable(0);
export const floorPickup = writable(0);
export const gameState = writable(0)
export const autoState = writable(0)
export const autoDataLog = writable([])
export const teleDataLog = writable([])
export const reversedAlliance = writable(0)
export const selectedCommunity = writable(0) // blue is 0, red is 1
export const displayText = writable(["x"," "]) // idek
export const undoDisplayCondition = writable(false)
export const uploadState = writable(0)
export const currentTeam = writable(0)
export const onStageButton = writable(0)



export const gameData = writable({
	AllianceColor: 0,
	ReversedAlliance: 0,
	StartPosition: 0,
	StartGamePiece: " ",
	StartConfig: " ",
	Leave: 0,
	AutoHighBoulderSuccess: 0,
	AutoHighBoulderFail: 0,
	AutoLowBoulderSuccess: 0,
	AutoLowBoulderFail: 0,
	TeleHighBoulderSuccess: 0,
	TeleHighBoulderFail: 0,
	TeleLowBoulderSuccess: 0,
	TeleLowBoulderFail: 0,
	AutoPortCrossSuccess: 0,
	AutoPortCrossFail: 0,
	AutoChevalCrossSuccess: 0,
	AutoChevalCrossFail: 0,
	AutoMoatCrossSuccess: 0,
	AutoMoatCrossFail: 0,
	AutoRampartsCrossSuccess: 0,
	AutoRampartsCrossFail: 0,
	AutoDrawCrossSuccess: 0,
	AutoDrawCrossFail: 0,
	AutoSallyCrossSuccess: 0,
	AutoSallyCrossFail: 0,
	AutoWallCrossSuccess: 0,
	AutoWallCrossFail: 0,
	AutoTerrainCrossSuccess: 0,
	AutoTerrainCrossFail: 0,
	AutoLowbarCrossSuccess: 0,
	AutoLowbarCrossFail: 0,
	TelePortCrossSuccess: 0,
	TelePortCrossFail: 0,
	TeleChevalCrossSuccess: 0,
	TeleChevalCrossFail: 0,
	TeleMoatCrossSuccess: 0,
	TeleMoatCrossFail: 0,
	TeleRampartsCrossSuccess: 0,
	TeleRampartsCrossFail: 0,
	TeleDrawCrossSuccess: 0,
	TeleDrawCrossFail: 0,
	TeleSallyCrossSuccess: 0,
	TeleSallyCrossFail: 0,
	TeleWallCrossSuccess: 0,
	TeleWallCrossFail: 0,
	TeleTerrainCrossSuccess: 0,
	TeleTerrainCrossFail: 0,
	TeleLowbarCrossSuccess: 0,
	TeleLowbarCrossFail: 0,
	TeleClimb: 0,
	TeleChallenge: 0,
	AutoBoulderDrop: 0,
	TeleBoulderDrop: 0,
	AutoPreLoadedBoulderCollect: 0,
	TelePreLoadedBoulderCollect: 0,
	TeleFloorBoulderCollect: 0,
	AutoFloorBoulderCollect: 0,
	TeleTunnelBoulderCollect: 0,
	AutoTunnelBoulderCollect: 0,
	PlayingDefenseDuration: 0,
	UnderDefenseDuration: 0,
	Park: 0,
	Penalties: 0,
	Disabled: 0,
	DriverRating: 0,
	BoulderIntakeRating: 0,
	DefenseRating: 0,
	UnderDefenseRating: 0,
	LowbarCrossRating: 0,
	PortCrossRating: 0,
	ChevalCrossRating: 0,
	MoatCrossRating: 0,
	RampartsCrossRating: 0,
	DrawCrossRating: 0,
	SallyCrossRating: 0,
	WallCrossRating: 0,
	TerrainCrossRating: 0,
	FieldConfiguration: " ",
	AutoPath: " ",
	AutoPathWithResult: " ",
	BotState: 0,
	Comment: " "
})
