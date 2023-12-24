import { Link } from '@chakra-ui/next-js';
import { Button, Center, Stack, useMediaQuery } from '@chakra-ui/react';
import { UserButton, useAuth } from '@clerk/nextjs';
import Logo from '~/icons/Logo';
import NavLink from '../Navigation/NavLink';
import SelectMap from '../SelectMap';
import MobileMneu from './MobileMneu';

const Navigation = () => {
	const { isSignedIn } = useAuth();
	const [isLower1069] = useMediaQuery(['(max-width: 1069px)']);
	return (
		<Stack direction={['column', 'row']} alignItems="center" pb={[5, 0]}>
			<Center as="header" px={[15, 15, 36]} h={20} w="100%">
				<Center
					as="nav"
					justifyContent={
						isLower1069 ? 'space-between' : 'space-around'
					}
					alignItems="center"
					w="100%"
					position="relative"
				>
					{isLower1069 ? (
						<Button
							size="sm"
							colorScheme="brand"
							as={Link}
							href="https://www.tinkoff.ru/cf/142W441ULA3"
						>
							Поддержать
						</Button>
					) : (
						<NavLink position="first" />
					)}
					<Stack>
						<Link href={'/'}>
							<Logo boxSize={40} />
						</Link>
					</Stack>
					{isLower1069 ? (
						<MobileMneu />
					) : (
						<NavLink position="second" />
					)}
					{isSignedIn ? (
						<Stack
							position={isLower1069 ? 'relative' : 'absolute'}
							right={[0]}
						>
							<UserButton afterSignOutUrl="/" />
						</Stack>
					) : null}
				</Center>
			</Center>
			<SelectMap />
		</Stack>
	);
};

export default Navigation;
