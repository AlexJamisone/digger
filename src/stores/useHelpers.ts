import { create } from 'zustand';
type HelperState = {
	isCarosel: boolean;
};
type HelperAction = {
	setIsCarosel: (is: boolean) => void;
};
type Helpers = HelperState & HelperAction;
export const useHelpers = create<Helpers>((set) => ({
	isCarosel: false,
	setIsCarosel: (is) => set({ isCarosel: is }),
}));
