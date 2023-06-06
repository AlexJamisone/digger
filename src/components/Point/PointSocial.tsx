import { Button, Link } from '@chakra-ui/react';
import { usePointContext } from '~/context/pointContext';
import DzenIcon from '~/icons/DzenIcon';
const PointSocial = () => {
	const { point } = usePointContext();
	return (
		<Button
			as={Link}
			href={point.linkToVideo}
			rightIcon={<DzenIcon boxSize={5} color="blackAlpha.800" />}
			target="_blank"
			w="100%"
			_hover={{
				textDecoration: 'none',
			}}
		>
			Смотреть видео с раскопок
		</Button>
	);
};

export default PointSocial;
