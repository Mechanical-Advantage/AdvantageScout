import { writable } from 'svelte/store';

export const liveGamepiece = writable("Fuel");
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
export const fuelCycleCountSuccess = writable(0);
export const fuelCycleCountFail = writable(0);
export const fuelButtonSpeed = writable(200);

export const gameData = writable({
	AllianceColor: 0,
	ReversedAlliance: 0,
	StartPosition: 0,
	StartGamePiece: " ",
	StartConfig: " ",
	TeleHubFuelSuccess: 0,
	AutoHubFuelSuccess: 0,
	TeleHubFuelFail: 0,
	AutoHubFuelFail: 0,
	TeleClimbL3: 0,
	TeleClimbL2: 0,
	TeleClimbL1: 0,
	AutoClimbL1: 0,
	AutoClimbDismount: 0,
	AutoClimbPosition: 0,
	TeleClimbPosition: 0,
	AutoPassFuelSuccess: 0,
	TelePassFuelSuccess: 0,
	AutoPassFuelFail: 0,
	TelePassFuelFail: 0,
	AutoFerryFuelSuccess: 0,
	TeleFerryFuelSuccess: 0,
	AutoPreLoadedFuelCollect: 0,
	TelePreLoadedFuelCollect: 0,
	AutoOutpostFuelCollect: 0,
	TeleOutpostFuelCollect: 0,
	TeleFloorFuelCollect: 0,
	AutoFloorFuelCollect: 0,
	AutoHubFuelCyclesSuccess: [],
	AutoHubFuelCyclesFail: [],
	TeleHubFuelCyclesSuccess: [],
	TeleHubFuelCyclesFail: [],
	PlayingDefenseDuration: 0,
	UnderDefenseDuration: 0,
	Penalties: 0,
	Disabled: 0,
	DriverRating: 0,
	FuelIntakeRating: 0,
	DefenseRating: 0,
	UnderDefenseRating: 0,
	CrossBumpRating: 0,
	BotState: 0,
	Comment: " ",
})