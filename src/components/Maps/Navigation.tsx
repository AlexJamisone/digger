import { Link } from '@chakra-ui/next-js';
import { Stack } from '@chakra-ui/react';
import { UserButton, useAuth } from '@clerk/nextjs';
import Logo from '~/icons/Logo';
import MenuNavigation from '../Navigation/MenuNavigation';
import SponserButton from '../Navigation/SponserButton';

const Navigation = () => {
	const { isSignedIn } = useAuth();
	return (
		<Stack
			as={'header'}
			justifyContent="center"
			h={75}
			alignItems={'center'}
		>
			<Stack
				as={'nav'}
				alignItems={'center'}
				direction="row"
				justifyContent={'center'}
				gap={[25, 50]}
			>
				<SponserButton />
				<Link href={'/'}>
					<Logo h={[100, 150]} w={[100, 150]} />
				</Link>
				<MenuNavigation />
				{isSignedIn && <UserButton afterSignOutUrl="/" />}
			</Stack>
		</Stack>
	);
};

export default Navigation;
