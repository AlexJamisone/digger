import { Link } from '@chakra-ui/next-js';
import { Button } from '@chakra-ui/react';
import { usePointContext } from '~/context/pointContext';
import DzenIcon from '~/icons/DzenIcon';
const PointSocial = () => {
	const { point } = usePointContext();
	return (
		<Button
			as={Link}
			href={point.linkToVideo}
			rightIcon={<DzenIcon boxSize={4} color="blackAlpha.800" />}
			target="_blank"
			variant={'outline'}
			p={2}
			_hover={{
				textDecoration: 'none',
			}}
		>
			Смотреть видео с раскопок
		</Button>
	);
};

export default PointSocial;
