import { Drawer, useMediaQuery } from '@chakra-ui/react';
import { Point } from '@prisma/client';
import DrawerInner from './DrawerInner';
import MobileDragDrawer from './MobileDragDrawer';
type PointDrawerProps = {
	isOpen: boolean;
	onClose: () => void;
	point: Point;
};
const PointDrawer = ({ isOpen, onClose, point }: PointDrawerProps) => {
	const [isLowerThen400] = useMediaQuery(['(max-width: 400px)']);
	return (
		<Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
			{isLowerThen400 ? (
				<MobileDragDrawer onClose={onClose}>
					<DrawerInner point={point} onClose={onClose} />
				</MobileDragDrawer>
			) : (
				<DrawerInner point={point} onClose={onClose} />
			)}
		</Drawer>
	);
};
export default PointDrawer;
