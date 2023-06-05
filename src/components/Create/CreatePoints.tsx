import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useMapsContext } from '~/context/mapsContext';
import PointsActions from './PointsActions';
import PointsImages from './PointsImages';
import { default as PointsInputs } from './PointsInputs';

type CreatePointsProps = {
	images?: ReactNode;
	inputs?: ReactNode;
	action?: ReactNode;
};

const CreatePoints = ({ action, images, inputs }: CreatePointsProps) => {
	const { closeCreate, state, dispatch } = useMapsContext();
	return (
		<Modal
			isOpen={state.isSet}
			onClose={() => {
				dispatch({ type: 'SET_CLEAR' });
				closeCreate();
			}}
			motionPreset="slideInRight"
		>
			<ModalContent
				containerProps={{
					justifyContent: 'flex-start',
					mt: 3,
				}}
				as={motion.div}
				layout
			>
				<ModalHeader textAlign="center">Новая точка</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{images}
					{inputs}
				</ModalBody>
				<ModalFooter>{action}</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

CreatePoints.Image = PointsImages;
CreatePoints.Inputs = PointsInputs;
CreatePoints.Action = PointsActions;

export default CreatePoints;
