import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Stack,
} from '@chakra-ui/react';
import type { Point } from '@prisma/client';
import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import { useMapsContext } from '~/context/mapsContext';
import PointContex from '~/context/pointContext';
import PointAction from './PointAction';
import PointComments from './PointComments';
import PointInfo from './PointInfo';
import PointPhoto from './PointPhoto';
import PointSocial from './PointSocial';

type PointCardProps = {
	isOpen: boolean;
	onClose: () => void;
	point: Point;
	photo?: ReactNode;
	info?: ReactNode;
	social?: ReactNode;
	comments?: ReactNode;
	action?: ReactNode;
};

const PointCard = ({
	info,
	photo,
	social,
	isOpen,
	onClose,
	comments,
	point,
	action,
}: PointCardProps) => {
	const { role } = useMapsContext();
	return (
		<PointContex.Provider
			value={{
				point,
				onClose,
			}}
		>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				motionPreset="slideInRight"
				closeOnEsc={false}
			>
				<ModalContent
					containerProps={{
						justifyContent: 'flex-end',
						mt: 3,
					}}
					as={motion.section}
				>
					<ModalHeader textAlign="center">{point.name}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack gap={7}>
							{role === 'ADMIN' ? action : null}
							{photo}
							{info}
							{social}
						</Stack>
					</ModalBody>
					<ModalFooter>{comments}</ModalFooter>
				</ModalContent>
			</Modal>
		</PointContex.Provider>
	);
};

PointCard.Photo = PointPhoto;
PointCard.Action = PointAction;
PointCard.Info = PointInfo;
PointCard.Social = PointSocial;
PointCard.Comments = PointComments;

export default PointCard;
