import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useHelpers } from '~/stores/useHelpers';

const MobileDragDrawer = ({
	children,
	onClose,
}: {
	children: ReactNode;
	onClose: () => void;
}) => {
	const is = useHelpers((state) => state.isCarosel);
	return (
		<motion.div
			drag={!is ? 'y' : undefined}
			dragConstraints={{
				top: 0,
				bottom: 250,
			}}
			dragElastic={0.5}
			onDragEnd={(e, info) => {
				e.stopPropagation();
				if (info.offset.y > 15) {
					onClose();
				}
			}}
		>
			{children}
		</motion.div>
	);
};
export default MobileDragDrawer;
