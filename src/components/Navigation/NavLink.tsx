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
					{links(position).map(({ id, href, icon, name }) => (
						<Link href={href} key={id}>
							<Stack direction="row" gap={3} alignItems="center">
								<Text fontSize="large">{name}</Text>
								{icon}
							</Stack>
						</Link>
					))}
				</Stack>
			) : (
				<Stack direction="row" spacing={100}>
					{position === 'first'
						? links(position).map(({ id, color, href, icon }) => (
								<Box
									key={id}
									as={motion.div}
									whileHover={{
										scale: 1.5,
										transition: { type: 'spring' },
										color,
									}}
								>
									<Link href={href} target="_blank">
										{icon}
									</Link>
								</Box>
						  ))
						: links(position).map(({ href, icon, id, color }) => (
								<Box
									key={id}
									as={motion.div}
									whileHover={
										id === 4
											? undefined
											: {
													scale: 1.5,
													transition: {
														type: 'spring',
													},
													color,
											  }
									}
								>
									<Link href={href} target="_blank">
										{icon}
									</Link>
								</Box>
						  ))}
				</Stack>
			)}
		</>
	);
};

export default NavLink;
