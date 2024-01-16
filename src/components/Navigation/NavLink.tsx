import { Link } from '@chakra-ui/next-js';
import { Box, Stack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { links } from '~/constants/links';

const NavLink = ({
	position,
	mobile,
}: {
	position: 'first' | 'second' | 'all';
	mobile?: boolean;
}) => {
	return (
		<>
			{mobile && position === 'all' ? (
				<Stack direction="column" gap={5}>
				</Stack>
			) : (
				<Stack direction="row" spacing={100}>
				</Stack>
			)}
		</>
	);
};

export default NavLink;
