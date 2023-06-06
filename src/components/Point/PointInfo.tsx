import { Heading } from '@chakra-ui/react';
import { usePointContext } from '~/context/pointContext';

const PointInfo = () => {
	const { point } = usePointContext();
	return (
		<Heading
			fontSize="medium"
			textColor="blackAlpha.700"
			textAlign="center"
		>
			{point.description}
		</Heading>
	);
};

export default PointInfo;
