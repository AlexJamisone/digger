export type PointState = {
	id: string;
	name: string;
	description: string;
	image: string[];
	videoLink: string;
	latitude?: number;
	longitude?: number;
	isSet: boolean;
	edit: boolean;
};

interface SetIdAction {
	type: 'SET_ID';
	payload: string;
}
interface SetNameAction {
	type: 'SET_NAME';
	payload: string;
}
interface SetDescriptionAction {
	type: 'SET_DESC';
	payload: string;
}
interface SetImgAction {
	type: 'SET_IMG';
	payload: string[];
}
interface SetVideoLinkAction {
	type: 'SET_VIDEO';
	payload: string;
}
interface SetLongitudeAction {
	type: 'SET_LON';
	payload: number;
}
interface SetLatitudeAction {
	type: 'SET_LAT';
	payload: number;
}
interface SetSetAction {
	type: 'SET_SET';
	payload: boolean;
}
interface SetEditAction {
	type: 'SET_EDIT';
	payload: boolean;
}
interface SetClearAction {
	type: 'SET_CLEAR';
}
interface SetAllAction {
	type: 'SET_ALL';
	payload: PointState;
}

export type Action =
	| SetAllAction
	| SetClearAction
	| SetDescriptionAction
	| SetIdAction
	| SetNameAction
	| SetImgAction
	| SetVideoLinkAction
	| SetLongitudeAction
	| SetLatitudeAction
	| SetSetAction
	| SetEditAction;

export const initialState: PointState = {
	id: '',
	description: '',
	image: [],
	isSet: false,
	edit: false,
	name: '',
	videoLink: '',
	latitude: undefined,
	longitude: undefined,
};
export const pointReducer = (state: PointState, action: Action): PointState => {
	switch (action.type) {
		case 'SET_ID':
			return { ...state, id: action.payload };
		case 'SET_NAME':
			return { ...state, name: action.payload };
		case 'SET_DESC':
			return { ...state, description: action.payload };
		case 'SET_IMG':
			return { ...state, image: action.payload };
		case 'SET_VIDEO':
			return { ...state, videoLink: action.payload };
		case 'SET_LON':
			return { ...state, longitude: action.payload };
		case 'SET_LAT':
			return { ...state, latitude: action.payload };
		case 'SET_SET':
			return { ...state, isSet: action.payload };
		case 'SET_EDIT':
			return { ...state, edit: action.payload };
		case 'SET_CLEAR':
			return {
				id: '',
				description: '',
				image: [],
				isSet: false,
				latitude: undefined,
				longitude: undefined,
				edit: false,
				name: '',
				videoLink: '',
			};
		case 'SET_ALL':
			return { ...state, ...action.payload };
		default:
			return state;
	}
};
