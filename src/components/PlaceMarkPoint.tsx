import { Stack, useDisclosure } from '@chakra-ui/react';
import { Placemark } from '@pbe/react-yandex-maps';
import type { Point } from '@prisma/client';
import { useMapsContext } from '~/context/mapsContext';
import PointDrawer from './Point/PointDrawer';

type PlaceMarkPointProps = {
	point: Point;
};

const PlaceMarkPoint = ({ point }: PlaceMarkPointProps) => {
	const { dispatchSelect } = useMapsContext();
	const { isOpen, onClose, onToggle } = useDisclosure();
	return (
		<Stack zIndex={99999} position="relative" cursor="pointer">
			<Placemark
				geometry={[point.latitude, point.longitude]}
				onClick={() => {
					dispatchSelect({
						type: 'SET_COORDS',
						payload: [point.latitude, point.longitude],
					});
					onToggle();
				}}
				options={{
					preset:
						isOpen && !point.IsTourist
							? 'islands#darkGreenIcon'
							: point.IsTourist && !isOpen
								? 'islands#violetCircleDotIcon'
								: isOpen && point.IsTourist
									? 'islands#darkGreenCircleDotIcon'
									: undefined,
				}}
			/>
			<PointDrawer isOpen={isOpen} onClose={onClose} point={point} />
		</Stack>
	);
};

export default PlaceMarkPoint;
