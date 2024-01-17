import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const MobileDragDrawer = ({
	children,
	onClose,
}: {
	children: ReactNode;
	onClose: () => void;
}) => {
    console.log('render mobile')
	return (
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
			{children}
		</motion.div>
	);
};
export default MobileDragDrawer;
