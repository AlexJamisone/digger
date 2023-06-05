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
import { api } from '~/utils/api';
import PointsActions from './PointsActions';
import PointsImages from './PointsImages';
import { default as PointsInputs } from './PointsInputs';

type CreatePointsProps = {
	images?: ReactNode;
	inputs?: ReactNode;
	action?: ReactNode;
};

const CreatePoints = ({ action, images, inputs }: CreatePointsProps) => {
	const { mutate: deletAllImages } = api.images.deletAllImages.useMutation();
	const { state, dispatch } = useMapsContext();
	return (
		<Modal
			isOpen={state.isSet}
			onClose={() => {
				if (state.image.length !== 0) {
					deletAllImages(
						{
							images: state.image,
						},
						{
							onSuccess: () => {
								dispatch({ type: 'SET_CLEAR' });
							},
						}
					);
				}
				dispatch({ type: 'SET_CLEAR' });
			}}
			motionPreset="slideInRight"
			closeOnOverlayClick={false}
			closeOnEsc={false}
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
				<ModalFooter gap={5}>{action}</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

CreatePoints.Image = PointsImages;
CreatePoints.Inputs = PointsInputs;
CreatePoints.Action = PointsActions;

export default CreatePoints;
