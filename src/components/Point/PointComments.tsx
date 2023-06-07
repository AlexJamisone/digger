import {
	Avatar,
	Button,
	Card,
	CardBody,
	Center,
	FormControl,
	FormErrorMessage,
	Spinner,
	Stack,
	Text,
	Textarea,
	useToast,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { usePointContext } from '~/context/pointContext';
import { api } from '~/utils/api';

dayjs.locale('ru');

const PointComments = () => {
	const { point } = usePointContext();
	const { data: comments, isLoading: loadingGet } = api.comments.get.useQuery(
		{
			id: point.id,
		}
	);
	const {
		mutate: create,
		isLoading,
		error,
		isError,
		reset,
	} = api.comments.create.useMutation();
	const [value, setValue] = useState({
		input: '',
		id: point.id,
	});
	const toast = useToast();
	const ctx = api.useContext();

	const handlClick = () => {
		create(
			{
				content: value.input,
				pointId: value.id,
			},
			{
				onSuccess: () => {
					void ctx.comments.invalidate();
					toast({
						description: 'Комметарий успешно опубликован! ✔',
						position: 'top-left',
						status: 'success',
						isClosable: true,
					});
					setValue({
						...value,
						input: '',
					});
				},
			}
		);
	};
	return (
		<Stack w="100%">
			<Stack direction="row">
				<Avatar size="sm" />
				<FormControl isInvalid={isError}>
					<Textarea
						value={value.input}
						onChange={(e) => {
							reset();
							setValue({ ...value, input: e.target.value });
						}}
						placeholder="Добавь свои комментарии"
					/>
					<FormErrorMessage>
						{error?.data?.zodError?.fieldErrors.content}
					</FormErrorMessage>
				</FormControl>
			</Stack>
			<Button
				onClick={handlClick}
				isLoading={isLoading}
				isDisabled={isLoading}
				type="button"
			>
				Оставить комметарий
			</Button>
			{loadingGet ? (
				<Center>
					<Spinner />
				</Center>
			) : (
				<AnimatePresence>
					{comments?.map(({ id, content, createdAt }, index) => (
						<Stack
							key={id}
							as={motion.div}
							initial={{
								opacity: 0,
								y: -50,
							}}
							animate={{
								opacity: 1,
								y: 0,
								transition: {
									type: 'spring',
									duration: 0.7,
									delay: 0.2 * index,
								},
							}}
							exit={{
								opacity: 0,
								transition: {
									type: 'spring',
									delay: 0.2 * index,
								},
							}}
						>
							<Stack direction="row">
								<Avatar size="xs" />
								<Card borderTopLeftRadius={0}>
									<CardBody>
										<Stack>
											<Text>{content}</Text>
											<Text
												fontSize="smaller"
												textColor="blackAlpha.500"
											>
												Отправлено:{' '}
												{dayjs(createdAt).format(
													'DD.MM.YYYY HH:mm'
												)}
											</Text>
										</Stack>
									</CardBody>
								</Card>
							</Stack>
						</Stack>
					))}
				</AnimatePresence>
			)}
		</Stack>
	);
};

export default PointComments;
