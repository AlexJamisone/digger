import type { Role, User } from '@prisma/client';
import { createContext, useContext, type Dispatch } from 'react';
import type { Action, PointState } from '~/reducer/pointReducer';

export interface MapsContext {
	state: PointState;
	dispatch: Dispatch<Action>;
	role?: User | Role | null;
}

const MapsContex = createContext<MapsContext | null>(null);

export function useMapsContext() {
	const context = useContext(MapsContex);
	if (!context)
		throw new Error(
			'Maps.* component must be render as a child of Maps comopnent'
		);
	return context;
}

export default MapsContex;
