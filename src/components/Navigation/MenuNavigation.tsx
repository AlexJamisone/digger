import { Link } from '@chakra-ui/next-js';
import {
	Icon,
	IconButton,
	Menu,
	MenuButton,
	MenuDivider,
	MenuGroup,
	MenuItem,
	MenuItemOption,
	MenuList,
	MenuOptionGroup,
	Stack,
	Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { RiMenu4Fill, RiMenuLine } from 'react-icons/ri';
import { links } from '~/constants/links';
import { type MapState, useMap } from '~/stores/useMap';

const MenuNavigation = () => {
	const { setTime } = useMap();
	const { reload } = useRouter();
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
						<MenuOptionGroup
							title="Вид карты"
							onChange={(value) => {
								if (value === 'now') {
									reload();
								} else {
									setTime(value as MapState['time']);
								}
							}}
							defaultValue={'now'}
						>
							<MenuItemOption value="now">
								Наше время
							</MenuItemOption>
							<MenuItemOption value="1842">
								Крым 1842 год
							</MenuItemOption>
							<MenuItemOption value="1941">
								Крым 1941 год
							</MenuItemOption>
						</MenuOptionGroup>
						<MenuDivider />
						<MenuGroup title="Мои соц. сети">
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
									<Stack
										direction={'row'}
										alignItems={'center'}
									>
										<Icon as={icon} />
										<Text>{title}</Text>
									</Stack>
								</MenuItem>
							))}
						</MenuGroup>
					</MenuList>
				</>
			)}
		</Menu>
	);
};
export default MenuNavigation;
