import { Link } from '@chakra-ui/next-js';
import {
	Button,
	Center,
	Divider,
	Icon,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Stack,
	Text,
	useMediaQuery,
} from '@chakra-ui/react';
import { UserButton, useAuth } from '@clerk/nextjs';
import { RiMenu4Fill, RiMenuLine } from 'react-icons/ri';
import { links } from '~/constants/links';
import Logo from '~/icons/Logo';
import NavLink from '../Navigation/NavLink';
import SelectMap from '../SelectMap';

const Navigation = () => {
	const { isSignedIn } = useAuth();
	const [isLower1069] = useMediaQuery(['(max-width: 1069px)']);
	return (
		<Stack direction={['column', 'row']} alignItems="center" pb={[5, 0]}>
			<Center as="header" px={[15, 15, 36]} h={70} w="100%">
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
					<Menu autoSelect={false}>
						{({ isOpen }) => (
							<>
								<MenuButton
									as={IconButton}
									variant={'outline'}
									icon={<Icon as={isOpen ? RiMenu4Fill : RiMenuLine} />}
									size={'sm'}
									aria-label="menu"
								/>
								<MenuList>
									<Text p={2} textAlign={'center'}>
										Соц. сети
									</Text>
									<Divider />
									{links.map(
										({ id, icon, href, title, color }) => (
											<MenuItem
												as={Link}
												key={id}
												href={href}
												target="_blank"
												_hover={{
													textDecoration: 'none',
													bgColor: color,
													textColor: 'white',
												}}
												transition={
													'all .3s ease-in-out'
												}
											>
												<Stack
													direction={'row'}
													alignItems={'center'}
												>
													<Icon as={icon} />
													<Text>{title}</Text>
												</Stack>
											</MenuItem>
										)
									)}
								</MenuList>
							</>
						)}
					</Menu>
					{isSignedIn && (
						<Stack
							position={isLower1069 ? 'relative' : 'absolute'}
							right={[0]}
						>
							<UserButton afterSignOutUrl="/" />
						</Stack>
					)}
				</Center>
			</Center>
			<SelectMap />
		</Stack>
	);
};

export default Navigation;
