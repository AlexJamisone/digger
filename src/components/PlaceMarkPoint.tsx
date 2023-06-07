import { useDisclosure } from '@chakra-ui/react';
import { Placemark } from '@pbe/react-yandex-maps';
import type { Point } from '@prisma/client';
import { useMapsContext } from '~/context/mapsContext';
import PointCard from './Point/PointCard';

type PlaceMarkPointProps = {
	point: Point;
};

const PlaceMarkPoint = ({ point }: PlaceMarkPointProps) => {
	const { dispatchSelect } = useMapsContext();
	const { isOpen, onClose, onToggle } = useDisclosure();
	return (
		<>
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
					preset: isOpen ? 'islands#darkGreenIcon' : undefined,
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
		</>
	);
};

export default PlaceMarkPoint;
