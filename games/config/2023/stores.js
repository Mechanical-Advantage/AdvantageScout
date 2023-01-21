import { writable } from 'svelte/store';

export const liveGamepiece = writable("cone");
export const liveLocation = writable("floor");
export const floorPickup = writable(0);
export const highConeSuccess = writable(0);
