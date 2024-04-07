import {
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerHeader,
	DrawerOverlay,
	Stack,
	Text,
	Link,
	Icon,
	DrawerContent,
} from '@chakra-ui/react';
import { type Point } from '@prisma/client';
import {
	motion,
	useDragControls,
	useMotionValue,
	useAnimate,
} from 'framer-motion';
import PointSocial from './PointSocial';
import PointPhoto from './PointPhoto';
import { BsStars } from 'react-icons/bs';
import PointComments from './PointComments';
import PointAction from './PointAction';
import { api } from '~/utils/api';
import useMeasure from 'react-use-measure';
type PointDrawerProps = {
	isOpen: boolean;
	onClose: () => void;
	point: Point;
};
const PointDrawer = ({ isOpen, onClose, point }: PointDrawerProps) => {
	const { data: role } = api.user.getRole.useQuery();
	const controls = useDragControls();
	const y = useMotionValue(0);
	const [scope, animate] = useAnimate();
	const [drawerRef, { height }] = useMeasure();

	const handlClose = async () => {
		try {
			void animate(scope.current, { opacity: [1, 0] });
			const yStart = typeof y.get() === 'number' ? y.get() : 0;
			await animate('.drawer', {
				y: [yStart, height],
			});
			onClose();
		} catch (err) {
			console.log(err);
		}
	};
	const Content = motion(DrawerContent);
	return (
		<Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
			<motion.div
				ref={scope}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				style={{
					position: 'fixed',
					inset: 0,
					zIndex: 500,
				}}
			>
				<DrawerOverlay
					initial={{ opacity: 0 }}
					animate={{
						opacity: 0.75,
						transition: {
							type: 'spring',
							duration: 0.5,
						},
					}}
				/>
				<Content
					ref={drawerRef}
					className="drawer"
					initial={{ y: '100%' }}
					animate={{ y: '0%', transition: { type: 'just' } }}
					onClick={(e) => e.stopPropagation()}
					drag="y"
					style={{ y }}
					onDragEnd={() => {
						if (y.get() >= 100) {
							void handlClose();
						}
					}}
					dragControls={controls}
					dragListener={false}
					dragConstraints={{
						top: 0,
						bottom: 0,
					}}
					dragElastic={{
						top: 0,
						bottom: 0.5,
					}}
					position="absolute"
					bottom={0}
					w="full"
					h={['100svh', '45svh']}
				>
					<Box
						position="absolute"
						left={0}
						right={0}
						top={3}
						display="flex"
						justifyContent="center"
					>
						<Button
							onPointerDown={(e) => {
								controls.start(e);
							}}
							size="sm"
							w={20}
							h={2}
							cursor="grab"
							rounded="full"
							bgColor="blackAlpha.500"
							_hover={{
								bgColor: 'blackAlpha.600',
							}}
							sx={{ touchAction: 'none' }}
						/>
					</Box>
					<DrawerCloseButton />
					<DrawerHeader>
						<Stack direction={'row'} mt={5} alignItems="center">
							<Text>{point.name}</Text>
							<Button
								variant={'outline'}
								as={Link}
								target="_blank"
								size="xs"
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
						position="relative"
						zIndex={0}
						h="full"
						sx={{
							'::-webkit-scrollbar': {
								width: '5px',
							},
							'::-webkit-scrollbar-thumb': {
								bgColor: 'blackAlpha.700',
								rounded: 'full',
							},
						}}
						display="flex"
						flexDirection="column"
						gap={5}
					>
						{point.images.length !== 0 && (
							<PointPhoto point={point} />
						)}
						<Text fontSize={12} textAlign={'center'}>
							{point.description}
						</Text>
						<PointSocial point={point} />
						{point.IsTourist && (
							<Stack
								direction="row"
								alignItems="center"
								justifyContent="center"
								cursor="default"
								fontWeight={600}
							>
								<Icon as={BsStars} fill="#b51eff" boxSize={7} />
								<Text>Туристическое место</Text>
							</Stack>
						)}
						<PointComments point={point} />
						{role && (
							<PointAction point={point} onClose={onClose} />
						)}
					</DrawerBody>
				</Content>
			</motion.div>
		</Drawer>
	);
};
export default PointDrawer;
