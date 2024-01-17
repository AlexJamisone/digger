import {
	Center,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	Text,
} from '@chakra-ui/react';
import { Point } from '@prisma/client';
import { motion } from 'framer-motion';
type PointDrawerProps = {
	isOpen: boolean;
	onClose: () => void;
	point: Point;
};
const PointDrawer = ({ isOpen, onClose, point }: PointDrawerProps) => {
	return (
		<Drawer
			isOpen={isOpen}
			onClose={onClose}
			placement="bottom"
			size={'sm'}
		>
			<motion.div
				style={{
					width: '100%',
					borderRadius: 30,
					backgroundColor: '#fff',
					zIndex: 120,
				}}
				drag="y"
				onDragEnd={(e) => {
					console.log(e);
					onClose();
				}}
				dragConstraints={{
					top: 0,
					bottom: 125,
				}}
				dragTransition={{
					bounceStiffness: 600,
					bounceDamping: 20,
				}}
				dragElastic={0.5}
			>
				<DrawerContent borderTopRadius={12} width={500}>
					<DrawerCloseButton />
					<DrawerHeader>{point.name}</DrawerHeader>
					<DrawerBody>
						<Text>{point.description}</Text>
					</DrawerBody>
				</DrawerContent>
			</motion.div>
		</Drawer>
	);
};
export default PointDrawer;
