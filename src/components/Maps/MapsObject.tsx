import { Map, Placemark, TypeSelector } from '@pbe/react-yandex-maps';
import { useReducer } from 'react';
import type { MapEvent } from 'yandex-maps';
import MapsContex from '~/context/mapsContext';
import { initialState, pointReducer } from '~/reducer/pointReducer';
import { initialStateSelect, selectReducer } from '~/reducer/selecteReducer';
import { api } from '~/utils/api';
import CreatePoints from '../Create/CreatePoints';
import PlaceMarkPoint from '../PlaceMarkPoint';

const MapsObject = () => {
	const { data: role } = api.user.get.useQuery();
	const { data: points } = api.points.get.useQuery();
	const [state, dispatch] = useReducer(pointReducer, initialState);
	const [c, dispatchSelect] = useReducer(selectReducer, initialStateSelect);
	const handlClick = (event: MapEvent) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const [latitude, longitude]: number[] = event.get('coords');
		dispatch({
			type: 'SET_ALL',
			payload: {
				...state,
				latitude,
				longitude,
				isSet: true,
			},
		});
	};
	return (
		<MapsContex.Provider
			value={{
				state,
				dispatch,
				role,
				dispatchSelect,
				sel: c,
			}}
		>
			<Map
				defaultState={{
					center: [45.115365, 34.563004],
					zoom: 8.5,
					type: 'yandex#hybrid',
				}}
				state={{
					center: [
						state.latitude ?? c.coord[0] ?? 45.115365,
						state.longitude ?? c.coord[1] ?? 34.563004,
					],
					zoom: 8.5,
					type: 'yandex#hybrid',
				}}
				width="100vw"
				height="100vh"
				onClick={role === 'ADMIN' ? handlClick : null}
			>
				{state.isSet ? (
					<Placemark
						geometry={[state.latitude, state.longitude]}
						options={{
							preset: 'islands#darkGreenIcon',
						}}
					/>
				) : null}
				<TypeSelector />
				{points?.map((point) => (
					<PlaceMarkPoint key={point.id} point={point} />
				))}
			</Map>
			<CreatePoints
				action={<CreatePoints.Action />}
				images={<CreatePoints.Image />}
				inputs={<CreatePoints.Inputs />}
			/>
		</MapsContex.Provider>
	);
};

export default MapsObject;
