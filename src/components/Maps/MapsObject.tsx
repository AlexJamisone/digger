import { useDisclosure } from '@chakra-ui/react';
import { Map, Placemark } from '@pbe/react-yandex-maps';
import { useReducer } from 'react';
import type { MapEvent } from 'yandex-maps';
import MapsContex from '~/context/mapsContext';
import { initialState, pointReducer } from '~/reducer/pointReducer';
import { api } from '~/utils/api';
import CreatePoints from '../Create/CreatePoints';

const MapsObject = () => {
	const { data: role } = api.user.get.useQuery();
	const { data: points } = api.points.get.useQuery();
	const [state, dispatch] = useReducer(pointReducer, initialState);
	const { onClose: closeCreate } = useDisclosure();

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
				closeCreate,
			}}
		>
			<Map
				defaultState={{
					center: [45.115365, 34.563004],
					zoom: 8.5,
				}}
				state={{
					center: [
						state.latitude === undefined
							? 45.115365
							: state.latitude,
						state.longitude === undefined
							? 34.563004
							: state.longitude,
					],
					zoom: 8.5,
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
				{points?.map(({ id, latitude, longitude }) => (
					<Placemark
						key={id}
						geometry={[latitude, longitude]}
						onClick={() => console.log('click')}
					/>
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
