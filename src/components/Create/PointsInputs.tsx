import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Stack,
	Textarea,
} from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { inputs } from '~/constants/input';
import { useMapsContext } from '~/context/mapsContext';

const PointsInputs = () => {
	const { state, dispatch } = useMapsContext();
	const handlChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		switch (name) {
			case 'name':
				dispatch({ type: 'SET_NAME', payload: value });
				break;
			case 'description':
				dispatch({ type: 'SET_DESC', payload: value });
				break;
			case 'link':
				dispatch({ type: 'SET_VIDEO', payload: value });
			default:
				break;
		}
	};
	console.log(state);
	return (
		<Stack direction="column" gap={3}>
			{inputs(state).map(
				({ name, placeholder, error, id, value, title, textarea }) => (
					<FormControl key={id}>
						<FormLabel>{title}</FormLabel>
						<Input
							name={name}
							placeholder={placeholder}
							type="text"
							value={value}
							onChange={handlChange}
							as={textarea ? Textarea : undefined}
							h={textarea ? '150px' : undefined}
						/>
						<FormErrorMessage>{error}</FormErrorMessage>
					</FormControl>
				)
			)}
		</Stack>
	);
};

export default PointsInputs;
