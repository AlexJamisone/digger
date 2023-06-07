import { Avatar, Button, Stack, Textarea } from '@chakra-ui/react';

const PointComments = () => {
	return (
		<Stack w="100%">
			<Stack direction="row">
				<Avatar size="sm" />
				<Textarea />
			</Stack>
			<Button>Оставить комметарий</Button>
		</Stack>
	);
};

export default PointComments;
