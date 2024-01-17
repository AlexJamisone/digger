export type SelectedCoords = {
	coord: number[];
};

interface SetCoordsAction {
	type: 'SET_COORDS';
	payload: number[];
}

interface SetClearAction {
	type: 'SET_CLEAR';
}

interface SetAllAction {
	type: 'SET_ALL';
	payload: SelectedCoords;
}

export type Action = SetCoordsAction | SetAllAction | SetClearAction;

export const initialStateSelect: SelectedCoords = {
	coord: [],
};

export const selectReducer = (
	state: SelectedCoords,
	action: Action,
): SelectedCoords => {
	switch (action.type) {
		case 'SET_COORDS':
			return { ...state, coord: action.payload };
		case 'SET_ALL':
			return {
				...state,
				...action.payload,
			};
		case 'SET_CLEAR':
			return {
				coord: [],
			};
	}
};
