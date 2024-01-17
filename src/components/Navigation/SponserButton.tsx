import { Link } from '@chakra-ui/next-js';
import { Button } from '@chakra-ui/react';

const SponserButton = () => {
	return (
		<Button
			size="sm"
			colorScheme="brand"
			as={Link}
            _hover={{
                textDecoration: 'none'
            }}
            target='_blank'
			href="https://www.tinkoff.ru/cf/142W441ULA3"
		>
			Поддержать
		</Button>
	);
};

export default SponserButton;
