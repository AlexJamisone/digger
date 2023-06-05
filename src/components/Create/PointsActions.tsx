import { Button, useToast } from '@chakra-ui/react';
import { useMapsContext } from '~/context/mapsContext';
import { api } from '~/utils/api';

const PointsActions = () => {
	const { mutate: create, isLoading } = api.points.create.useMutation();
	const { mutate: deletAllImages, isLoading: deleteLoading } =
		api.images.deletAllImages.useMutation();
	const ctx = api.useContext();
	const toast = useToast();
	const { state, dispatch } = useMapsContext();
	return (
		<>
			<Button
				onClick={() => {
					create(
						{
							name: state.name,
							description: state.description,
							images: state.image,
							latitude: state.latitude as number,
							longitude: state.longitude as number,
							linkToVideo: state.videoLink,
						},
						{
							onSuccess: () => {
								void ctx.points.invalidate();
								toast({
									description: `Точка ${state.name} успешно создана! ✔`,
									isClosable: true,
									status: 'success',
								});
								dispatch({ type: 'SET_CLEAR' });
							},
						}
					);
				}}
				colorScheme="telegram"
				isLoading={isLoading}
			>
				{state.edit ? 'Обновить' : 'Сохранить'}
			</Button>
			<Button
				colorScheme="red"
				isLoading={deleteLoading}
				onClick={() => {
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
					} else {
						dispatch({ type: 'SET_CLEAR' });
					}
				}}
			>
				Отмена
			</Button>
		</>
	);
};

export default PointsActions;
