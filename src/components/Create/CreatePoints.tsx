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
import PointsImages from './PointsImagesUpload';
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
						},
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
				as={motion.section}
				initial={{ x: -500 }}
				animate={{
					x: 0,
					transition: {
						type: 'keyframes',
						delay: 0.3,
						duration: 0.5,
					},
				}}
				exit={{
					x: -500,
					transition: { type: 'spring', duration: 0.5 },
				}}
				layout
			>
				<ModalHeader textAlign="center">{state.edit ? "Обновить точку" : "Создать точку"}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{images}
					{inputs}
				</ModalBody>
				<ModalFooter gap={5} mb={5}>
					{action}
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

CreatePoints.Image = PointsImages;
CreatePoints.Inputs = PointsInputs;
CreatePoints.Action = PointsActions;

export default CreatePoints;
