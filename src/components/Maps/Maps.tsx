import { YMaps } from '@pbe/react-yandex-maps';
import type { ReactNode } from 'react';
import MapsObject from './MapsObject';
type MapsProps = {
	maps?: ReactNode;
};
const Maps = ({ maps }: MapsProps) => {
	return (
		<YMaps
			query={{
				apikey: process.env.NEXT_PUBLIC_YANDEX_MAPS,
				lang: 'ru_RU',
			}}
		>
			{maps}
		</YMaps>
	);
};

Maps.Object = MapsObject;

export default Maps;
