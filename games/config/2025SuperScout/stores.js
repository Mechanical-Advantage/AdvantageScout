import { writable } from 'svelte/store';

export const liveGamepiece = writable(0);
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
export const currentSchedule = writable([])



export const gameData = writable({
    AllianceColor: 0,
    ReversedAlliance: 0,
    StartPosition: 0,
    BotState: 1,
	AutoBotState: 1,
	TeleBotState: 1,
	EndgameBotState: 1,
    AutoSynergyRating: 0,
	TeleSynergyRating: 0,
    DefenseRating: 0,
	TeamRating1: 0,
	TeamRating2: 0,
	TeamRating3: 0,
	DNP: 0,
	DriverTeam: 0,
	DriverSkill: 0,
	DriverSpeed: 0,
	DefenseOnly: 0,
	PlayingDefenseDuration: 0,
    UnderDefenseDuration: 0,
	AutoComment: " ",
	TeleComment: " ",
	EndgameComment: " ",
	DisabledComment: " ",
	DNPComment: " ",
    Comment: " ",
	Team1Comment: " ",
	Team2Comment: " ",
	Team3Comment: " ",
	Team1: 571,
	Team2: 6328,
	Team3: 2910
})
