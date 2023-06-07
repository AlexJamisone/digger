import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Icon,
	IconButton,
	useDisclosure,
	useMediaQuery,
} from '@chakra-ui/react';
import { RxHamburgerMenu } from 'react-icons/rx';
import NavLink from '../Navigation/NavLink';
const MobileMneu = () => {
	const { isOpen, onClose, onToggle } = useDisclosure();
	const [isLower1069] = useMediaQuery(['(max-width: 1069px)']);
	return (
		<>
			<IconButton
				aria-label="burger"
				onClick={onToggle}
				icon={<Icon as={RxHamburgerMenu} />}
			/>
			<Drawer isOpen={isOpen} onClose={onClose} placement="right">
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Подписывайся!</DrawerHeader>
					<DrawerBody>
						<NavLink position="all" mobile={isLower1069} />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default MobileMneu;
