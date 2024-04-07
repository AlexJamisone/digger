import { Link } from '@chakra-ui/next-js';
import { Button } from '@chakra-ui/react';
import { type Point } from '@prisma/client';
import DzenIcon from '~/icons/DzenIcon';
const PointSocial = ({ point }: { point: Point }) => {
	return (
		<Button
			as={Link}
			href={point.linkToVideo}
			rightIcon={<DzenIcon boxSize={4} color="blackAlpha.800" />}
			target="_blank"
			variant={'outline'}
			p={2}
			size="sm"
			_hover={{
				textDecoration: 'none',
			}}
		>
			Смотреть видео с раскопок
		</Button>
	);
};

export default PointSocial;
