import { Map } from '@pbe/react-yandex-maps';
const MapsObject = () => {
	return (
		<Map
			defaultState={{
				center: [45.115365, 34.563004],
				zoom: 8.5,
			}}
			width="100vw"
			height="100vh"
		></Map>
	);
};

export default MapsObject;
