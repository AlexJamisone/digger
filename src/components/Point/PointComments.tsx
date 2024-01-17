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
import { createRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { usePointContext } from '~/context/pointContext';
import { env } from '~/env.mjs';
import { api } from '~/utils/api';
dayjs.locale('ru');

const PointComments = () => {
	const { point } = usePointContext();
	const { data: comments, isLoading: loadingGet } = api.comments.get.useQuery(
		{
			id: point.id,
		},
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
		errorRecap: false,
	});
	const toast = useToast();
	const ctx = api.useContext();
	const recapthcaRef = createRef<ReCAPTCHA>();

	const handlClick = () => {
		const token = recapthcaRef.current?.getValue();
		if (token?.length === 0) {
			setValue({
				...value,
				errorRecap: true,
			});
		} else {
			create(
				{
					content: value.input,
					pointId: value.id,
				},
				{
					onSuccess: () => {
						void ctx.comments.invalidate();
						void recapthcaRef.current?.reset();
						toast({
							description: 'Комметарий успешно опубликован! ✔',
							position: 'top-left',
							status: 'success',
							isClosable: true,
						});
						setValue({
							...value,
							input: '',
							errorRecap: false,
						});
					},
				},
			);
		}
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
							setValue({
								...value,
								input: e.target.value,
								errorRecap: false,
							});
						}}
						h={'50px'}
						placeholder="Оставь свой комментарий"
						_placeholder={{
							fontSize: '12px',
						}}
					/>
					<FormErrorMessage>
						{error?.data?.zodError?.fieldErrors.content}
					</FormErrorMessage>
				</FormControl>
			</Stack>
			{value.input.length >= 1 && (
				<Stack
					as={motion.div}
					initial={{ opacity: 0, y: -50 }}
					animate={{
						opacity: 1,
						y: 0,
						transition: {
							type: 'spring',
							duration: 0.5,
							delay: 0.3,
						},
					}}
					layout
					border={(value.errorRecap && '1px solid') || undefined}
					borderRadius="md"
					borderColor="orange.300"
					boxShadow="lg"
					mx="47px"
					alignItems="center"
				>
					<ReCAPTCHA
						ref={recapthcaRef}
						sitekey={env.NEXT_PUBLIC_RECAPCHA_KEY_SITE}
						theme="light"
						onChange={() =>
							setValue({ ...value, errorRecap: false })
						}
					/>
				</Stack>
			)}
			{value.errorRecap && (
				<Text fontSize={13} textColor="orange.300" textAlign="center">
					Подтвердите что вы человек
				</Text>
			)}
			<Button
				onClick={handlClick}
				isLoading={isLoading}
				isDisabled={isLoading}
				type="button"
				mt={3}
				size={'sm'}
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
								<Avatar size="sm" />
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
													'DD.MM.YYYY HH:mm',
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
