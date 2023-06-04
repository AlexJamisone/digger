import { Box } from '@chakra-ui/react';
import { YMaps } from '@pbe/react-yandex-maps';
import type { ReactNode } from 'react';
import MapsObject from './MapsObject';
type MapsProps = {
	maps?: ReactNode;
};
const Maps = ({ maps }: MapsProps) => {
	return (
		<Box w="100vw" h="100vh" overflow="hidden" overflowY="hidden">
			<YMaps
				query={{
					apikey: process.env.NEXT_PUBLIC_YANDEX_MAPS,
					lang: 'ru_RU',
				}}
			>
				{maps}
			</YMaps>
		</Box>
	);
};

Maps.Object = MapsObject;

export default Maps;
