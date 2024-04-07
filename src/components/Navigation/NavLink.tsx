import { Stack } from '@chakra-ui/react';

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
				<Stack direction="column" gap={5}></Stack>
			) : (
				<Stack direction="row" spacing={100}></Stack>
			)}
		</>
	);
};

export default NavLink;
