import { Center, Text } from '@chakra-ui/react';
import { SignedIn, UserButton } from '@clerk/nextjs';

const Navigation = () => {
	return (
		<Center as="header" mx={36} h={20}>
			<Center
				as="nav"
				justifyContent="space-between"
				alignItems="center"
				w="100%"
			>
				<Text fontSize="2xl">LOGO</Text>
				<SignedIn>
					<UserButton afterSignOutUrl="/" />
				</SignedIn>
			</Center>
		</Center>
	);
};

export default Navigation;
