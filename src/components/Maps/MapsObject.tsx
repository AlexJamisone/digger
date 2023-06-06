import { useDisclosure } from '@chakra-ui/react';
import { Map, Placemark } from '@pbe/react-yandex-maps';
import React, { useReducer, useState } from 'react';
import type { MapEvent } from 'yandex-maps';
import MapsContex from '~/context/mapsContext';
import { initialState, pointReducer } from '~/reducer/pointReducer';
import { api } from '~/utils/api';
import CreatePoints from '../Create/CreatePoints';
import PointCard from '../Point/PointCard';

const MapsObject = () => {
	const { data: role } = api.user.get.useQuery();
	const { data: points } = api.points.get.useQuery();
	const [state, dispatch] = useReducer(pointReducer, initialState);
	const [selectedCoords, setSelectedCoords] = useState<number[]>([]);
	const { isOpen, onClose, onToggle } = useDisclosure();
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
			}}
		>
			<Map
				defaultState={{
					center: [45.115365, 34.563004],
					zoom: 8.5,
				}}
				state={{
					center: [
						state.latitude ?? selectedCoords[0] ?? 45.115365,
						state.longitude ?? selectedCoords[1] ?? 34.563004,
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
				{points?.map((point) => (
					<React.Fragment key={point.id}>
						<Placemark
							geometry={[point.latitude, point.longitude]}
							onClick={() => {
								onToggle();
								setSelectedCoords([
									point.latitude,
									point.longitude,
								]);
							}}
							options={{
								preset: isOpen
									? 'islands#darkGreenIcon'
									: undefined,
							}}
						/>
						<PointCard
							isOpen={isOpen}
							onClose={onClose}
							point={point}
							photo={<PointCard.Photo />}
							info={<PointCard.Info />}
							social={<PointCard.Social />}
							action={<PointCard.Action />}
						/>
					</React.Fragment>
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
