import { create } from 'zustand';

export type MapState = {
	time: 'now' | '1842' | '1941';
};

type MapAction = {
	setTime: (time: MapState['time']) => void;
	setCler: () => void;
};

type Map = MapState & MapAction;

const initial: MapState = {
	time: 'now',
};

export const useMap = create<Map>((set) => ({
	...initial,
	setCler: () => set(initial),
	setTime: (time) => set({ time }),
}));
