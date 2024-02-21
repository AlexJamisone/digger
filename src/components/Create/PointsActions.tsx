import { Button, useToast } from '@chakra-ui/react';
import { useMapsContext } from '~/context/mapsContext';
import { api } from '~/utils/api';

const PointsActions = () => {
	const { mutate: create, isLoading } = api.points.create.useMutation();
	const { mutate: deletAllImages, isLoading: deleteLoading } =
		api.images.deletAllImages.useMutation();
	const { mutate: update, isLoading: isLoadingUpdate } =
		api.points.update.useMutation();
	const ctx = api.useContext();
	const toast = useToast();
	const { state, dispatch } = useMapsContext();
	return (
		<>
			<Button
				onClick={() => {
					if (state.edit) {
						update(
							{
								id: state.id,
								description: state.description,
								images: state.image,
								latitude: state.latitude as number,
								longitude: state.longitude as number,
								linkToVideo: state.videoLink,
								name: state.name,
								isTourist: state.isTourist,
							},
							{
								onSuccess: () => {
									void ctx.points.invalidate();
									toast({
										description: 'Успешно обновленно ✔',
										isClosable: true,
										status: 'info',
									});
									dispatch({ type: 'SET_CLEAR' });
								},
							},
						);
					} else {
						create(
							{
								name: state.name,
								description: state.description,
								images: state.image,
								latitude: state.latitude as number,
								longitude: state.longitude as number,
								linkToVideo: state.videoLink,
								isTourist: state.isTourist,
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
							},
						);
					}
				}}
				colorScheme="telegram"
				isLoading={isLoading || isLoadingUpdate}
			>
				{state.edit ? 'Обновить' : 'Сохранить'}
			</Button>
			<Button
				colorScheme="red"
				isLoading={deleteLoading}
				onClick={() => {
					if (state.image.length !== 0 && !state.edit) {
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
					} else if (state.edit) {
						dispatch({
							type: 'SET_ALL',
							payload: {
								...state,
								edit: false,
								isSet: false,
							},
						});
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
