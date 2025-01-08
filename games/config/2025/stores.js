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
    TeleL1CoralSuccess: 0,
	TeleL2CoralSuccess: 0,
	TeleL3CoralSuccess: 0,
	TeleL4CoralSuccess: 0,
	AutoL1CoralSuccess: 0,
	AutoL2CoralSuccess: 0,
	AutoL3CoralSuccess: 0,
	AutoL4CoralSuccess: 0,
	TeleL1CoralFailure: 0,
	TeleL2CoralFailure: 0,
	TeleL3CoralFailure: 0,
	TeleL4CoralFailure: 0,
	AutoL1CoralFailure: 0,
	AutoL2CoralFailure: 0,
	AutoL3CoralFailure: 0,
	AutoL4CoralFailure: 0,
	TeleProcessorAlgaeSuccess: 0,
	AutoProcessorAlgaeSuccess: 0,
	TeleProcessorAlgaeFailure: 0,
	AutoProcessorAlgaeFailure: 0,
    TeleNetAlgaeSuccess: 0,
	AutoNetAlgaeSuccess: 0,
	TeleNetAlgaeFailure: 0,
	AutoNetAlgaeFailure: 0,
	TeleClimbShallow: 0,
	TeleClimbDeep: 0,
	AutoAlgaeDrop: 0,
    TeleAlgaeDrop: 0,
	AutoCoralDrop: 0,
    TeleCoralDrop: 0,
	AutoPreLoadedCoralCollect: 0,
	TelePreLoadedCoralCollect: 0,
    TeleFloorAlgaeCollect: 0,
	TeleFloorCoralCollect: 0,
    TeleStationCoralCollect: 0,
	AutoMark1AlgaeCollect: 0,
	AutoMark2CoralCollect: 0,
	AutoMark3AlgaeCollect: 0,
	AutoMark1CoralCollect: 0,
	AutoMark2AlgaeCollect: 0,
	AutoMark3CoralCollect: 0,
    PlayingDefenseDuration: 0,
    UnderDefenseDuration: 0,
    Park: 0,
    Points: 0,
    Penalties: 0,
    BotState: 1,
    Disabled: 0,
    DriverRating: 0,
    CoralIntakeRating: 0,
    AlgaeIntakeRating: 0,
    DefenseRating: 0,
    UnderDefenseRating: 0,
    AutoPath: ["sz1"], 
    AutoPathWithResult: ["sz1"],
    Comment: " "
})
