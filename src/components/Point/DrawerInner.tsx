import {
	Button,
	Center,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	Stack,
	Text,
	useMediaQuery,
} from '@chakra-ui/react';
import { Point } from '@prisma/client';
import PointContex from '~/context/pointContext';
import PointPhoto from './PointPhoto';
import PointSocial from './PointSocial';
import PointComments from './PointComments';
import { Link } from '@chakra-ui/next-js';

const DrawerInner = ({ point }: { point: Point }) => {
	const [isLowerThen400] = useMediaQuery(['(max-width: 400px)']);
	return (
		<PointContex.Provider
			value={{
				point,
			}}
		>
			<DrawerContent borderTopRadius={12} width={450} h={[450, '100%']}>
				<DrawerCloseButton />
				<DrawerHeader>
					{isLowerThen400 && (
						<Center
							mx={'auto'}
							my={0}
							width="50px"
							h={'10px'}
							rounded={'full'}
							bgColor={'blackAlpha.300'}
						/>
					)}
					<Stack direction={'row'} mt={5}>
						<Text>{point.name}</Text>
						<Button
							variant={'outline'}
							as={Link}
							target="_blank"
							size={'sm'}
							href={`https://yandex.ru/maps/959/sevastopol/?ll=33.641708%2C44.650942&mode=routes&rtext=~${point.latitude}%2C${point.longitude}&rtt=auto&ruri=~&z=12`}
							_hover={{
								textDecoration: 'none',
							}}
						>
							Проложить маршрут
						</Button>
					</Stack>
				</DrawerHeader>
				<DrawerBody
					as={Stack}
					gap={3}
					sx={{
						'::-webkit-scrollbar': {
							display: 'none',
						},
					}}
				>
					{point.images.length !== 0 && <PointPhoto />}
					<Text fontSize={12} textAlign={'center'}>
						{point.description}
					</Text>
					<PointSocial />
					<PointComments />
				</DrawerBody>
			</DrawerContent>
		</PointContex.Provider>
	);
};
export default DrawerInner;
