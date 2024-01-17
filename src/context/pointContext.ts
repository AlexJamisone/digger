import type { Point } from '@prisma/client';
import { createContext, useContext } from 'react';

export interface PointContext {
	point: Point;
	onClose: () => void;
}

const PointContex = createContext<PointContext | null>(null);

export function usePointContext() {
	const context = useContext(PointContex);
	if (!context)
		throw new Error(
			'Point.* component must be render as a child of Point comopnent',
		);
	return context;
}

export default PointContex;
