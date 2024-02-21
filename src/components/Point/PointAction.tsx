import { Icon, IconButton, Stack, useToast } from '@chakra-ui/react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import { useMapsContext } from '~/context/mapsContext';
import { usePointContext } from '~/context/pointContext';
import { api } from '~/utils/api';
const PointAction = () => {
	const { mutate: deletPoint, isLoading } = api.points.delete.useMutation();
	const ctx = api.useContext();
	const { dispatch, dispatchSelect } = useMapsContext();
	const { point, onClose } = usePointContext();
	const toast = useToast();
	const handlButton = (
		label: 'delet' | 'edit',
		onClick: () => void,
		isLoading?: boolean,
	) => {
		return (
			<IconButton
				size="sm"
				aria-label={label}
				colorScheme={label === 'delet' ? 'red' : 'telegram'}
				icon={
					<Icon as={label === 'delet' ? AiOutlineDelete : FiEdit2} />
				}
				onClick={onClick}
				isLoading={isLoading}
			/>
		);
	};
	return (
		<Stack gap={3} direction="row" position="absolute" top={3} right={16}>
			{handlButton('edit', () => {
				dispatch({
					type: 'SET_ALL',
					payload: {
						edit: true,
						isSet: true,
						id: point.id,
						description: point.description,
						image: point.images,
						name: point.name,
						videoLink: point.linkToVideo,
						latitude: point.latitude,
						longitude: point.longitude,
                        isTourist: point.IsTourist
					},
				});
				onClose();
			})}
			{handlButton(
				'delet',
				() => {
					deletPoint(
						{
							id: point.id,
							images: point.images,
						},
						{
							onSuccess: () => {
								void ctx.points.invalidate();
								dispatchSelect({
									type: 'SET_CLEAR',
								});
								toast({
									description: 'Точка успешно удалена!',
									isClosable: true,
									status: 'success',
								});
							},
						},
					);
				},
				isLoading,
			)}
		</Stack>
	);
};

export default PointAction;
