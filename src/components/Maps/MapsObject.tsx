import { Map, Placemark, TypeSelector, useYMaps } from '@pbe/react-yandex-maps';
import { useReducer } from 'react';
import type { MapEvent } from 'yandex-maps';
import MapsContex from '~/context/mapsContext';
import { initialState, pointReducer } from '~/reducer/pointReducer';
import { initialStateSelect, selectReducer } from '~/reducer/selecteReducer';
import { useMap } from '~/stores/useMap';
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
	const yapi = useYMaps(['Layer']);
	const time = useMap((state) => state.time);
	const timemod = time === '1842' || time === '1941';
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
					type: 'yandex#hybrid',
					zoom: 9,
				}}
				state={{
					center: [
						state.latitude ?? c.coord[0] ?? 45.115365,
						state.longitude ?? c.coord[1] ?? 34.563004,
					],
					zoom: 9,
					type: 'yandex#hybrid',
				}}
				width="100vw"
				height="100svh"
				onClick={role === 'ADMIN' ? handlClick : null}
				instanceRef={(ref) => {
					const valid = yapi && ref;
					if (valid) {
						const layer1842 = new yapi.Layer(
							'https://api.maptiler.com/tiles/d185ab68-b6a2-43a3-ad09-bbdabc4dae06/%z/%x/%y.webp?key=7D3WMyA8HBZbuCxHcNFn',
						);
						const layer1941 = new yapi.Layer(
							'https://api.maptiler.com/tiles/42dfaa3f-e16d-4869-aeb7-a0ca0a9e4049/%z/%x/%y.webp?key=27REPdqiPDdr26KGbYAr',
						);

						if (time === '1842') {
							ref.layers.add(layer1842);
						}
						if (time === '1941' && valid) {
							ref.layers.add(layer1941);
						}
					}
				}}
				options={{
					mapAutoFocus: true,
					maxZoom: timemod ? 13 : undefined,
					minZoom: timemod ? 6 : undefined,
					restrictMapArea: timemod ? true : false,
				}}
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
