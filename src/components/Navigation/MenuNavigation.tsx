import { Link } from '@chakra-ui/next-js';
import {
	Divider,
	Icon,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Stack,
	Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { RiMenu4Fill, RiMenuLine } from 'react-icons/ri';
import { links } from '~/constants/links';

const MenuNavigation = () => {
	return (
		<Menu autoSelect={false}>
			{({ isOpen }) => (
				<>
					<MenuButton
						as={IconButton}
						variant={'outline'}
						icon={
							<Stack
								as={motion.div}
								initial={{ opacity: 0 }}
								animate={{
									opacity: 1,
									transition: {
										type: 'spring',
										duration: 3,
									},
								}}
							>
								<Icon as={isOpen ? RiMenu4Fill : RiMenuLine} />
							</Stack>
						}
						size={'sm'}
						aria-label="menu"
					/>
					<MenuList>
						<Text p={2} textAlign={'center'}>
							Соц. сети
						</Text>
						<Divider />
						{links.map(({ id, icon, href, title, color }) => (
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
								transition={'all .3s ease-in-out'}
							>
								<Stack direction={'row'} alignItems={'center'}>
									<Icon as={icon} />
									<Text>{title}</Text>
								</Stack>
							</MenuItem>
						))}
					</MenuList>
				</>
			)}
		</Menu>
	);
};
export default MenuNavigation;
