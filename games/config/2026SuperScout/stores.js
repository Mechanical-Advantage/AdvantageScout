import { writable } from 'svelte/store';

export const liveGamepiece = writable(0);
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
export const currentSchedule = writable([]);
export const gameShift = writable(0);
export const gameData = writable({
	AllianceColor: 0,
	ReversedAlliance: 0,
	DefenseOnly: 0,
	TeamRating1: 0,
	TeamRating2: 0,
	TeamRating3: 0,
	TeamDriveRating1: 0,
	TeamDriveRating2: 0,
	TeamDriveRating3: 0,
	TeamRobotRating1: 0,
	TeamRobotRating2: 0,
	TeamRobotRating3: 0,
	TeamDNP1: 0,
	TeamDNP2: 0,
	TeamDNP3: 0,
	Team1: 0,
	Team2: 0,
	Team3: 0,
	TeamWatch1: 0,
	TeamWatch2: 0,
	TeamWatch3: 0,
	TeamPick1: 0,
	TeamPick2: 0,
	TeamPick3: 0,
	Team1Comment: " ",
	Team2Comment: " ",
	Team3Comment: " "
})
