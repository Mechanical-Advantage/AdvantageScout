import { writable } from 'svelte/store';

export const liveGamepiece = writable("Fuel");
export const liveLocation = writable(0);
export const floorPickup = writable(0);
export const gameState = writable(0);
export const autoState = writable(0);
export const autoDataLog = writable([]);
export const teleDataLog = writable([]);
export const reversedAlliance = writable(0);
export const selectedCommunity = writable(0); //blue is 0, red is 1
export const displayText = writable(["x", " "]); //idek
export const undoDisplayCondition = writable(false);
export const uploadState = writable(0);
export const currentTeam = writable(0);
export const onStageButton = writable(0);
export const fuelCycleCountSuccess = writable(0);
export const fuelCycleCountFail = writable(0);
export const fuelButtonSpeed = writable(200);
export const gameShift = writable(0);
export const shiftTimerStarted = writable(false);

export const gameData = writable({
	AllianceColor: 0,
	ReversedAlliance: 0,
	StartPosition: 0,
	StartGamePiece: " ",
	StartConfig: " ",
	TeleSTHubFuelSuccess: 0,
	AutoHubFuelSuccess: 0,
	TeleSTHubFuelFail: 0,
	AutoHubFuelFail: 0,
	TeleClimbL3: 0,
	TeleClimbL2: 0,
	TeleClimbL1: 0,
	AutoClimbL1: 0,
	AutoClimbDismount: 0,
	AutoClimbPosition: 0,
	TeleClimbPosition: 0,
	TeleClimbTime: 0,
	AutoPassFuelSuccess: 0,
	TeleSTPassFuelSuccess: 0,
	AutoPassFuelFail: 0,
	TeleSTPassFuelFail: 0,
	AutoFerryFuelSuccess: 0,
	TeleSTFerryFuelSuccess: 0,
	AutoPreLoadedFuelCollect: 0,
	TelePreLoadedFuelCollect: 0,
	AutoOutpostFuelCollect: 0,
	TeleSTOutpostFuelCollect: 0,
	TeleSTFloorFuelCollect: 0,
	AutoFloorFuelCollect: 0,

	TeleS1HubFuelSuccess: 0,
	TeleS1HubFuelFail: 0,
	TeleS1FerryFuelSuccess: 0,
	TeleS1PassFuelSuccess: 0,
	TeleS1PassFuelFail: 0,
	TeleS1OutpostFuelCollect: 0,
	TeleS1FloorFuelCollect: 0,

	TeleS2HubFuelSuccess: 0,
	TeleS2HubFuelFail: 0,
	TeleS2FerryFuelSuccess: 0,
	TeleS2PassFuelSuccess: 0,
	TeleS2PassFuelFail: 0,
	TeleS2OutpostFuelCollect: 0,
	TeleS2FloorFuelCollect: 0,

	TeleS3HubFuelSuccess: 0,
	TeleS3HubFuelFail: 0,
	TeleS3FerryFuelSuccess: 0,
	TeleS3PassFuelSuccess: 0,
	TeleS3PassFuelFail: 0,
	TeleS3OutpostFuelCollect: 0,
	TeleS3FloorFuelCollect: 0,

	TeleS4HubFuelSuccess: 0,
	TeleS4HubFuelFail: 0,
	TeleS4FerryFuelSuccess: 0,
	TeleS4PassFuelSuccess: 0,
	TeleS4PassFuelFail: 0,
	TeleS4OutpostFuelCollect: 0,
	TeleS4FloorFuelCollect: 0,

	TeleSEHubFuelSuccess: 0,
	TeleSEHubFuelFail: 0,
	TeleSEFerryFuelSuccess: 0,
	TeleSEPassFuelSuccess: 0,
	TeleSEPassFuelFail: 0,
	TeleSEOutpostFuelCollect: 0,
	TeleSEFloorFuelCollect: 0,

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
	Comment: " "
})