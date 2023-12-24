import { Select, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useMap, type MapState } from '~/stores/useMap';

const SelectMap = () => {
	const { setTime, time } = useMap();
	const { reload } = useRouter();
	return (
		<Stack>
			<Text fontSize={12} textColor="blackAlpha.800">
				Вид карты
			</Text>
			<Select
				onChange={(e) => {
					if (e.target.value === 'now') {
						reload();
					} else {
						setTime(e.target.value as MapState['time']);
					}
				}}
				defaultValue={time}
				w={200}
				size="sm"
				rounded="lg"
			>
				<option value={'now'}>Наше время</option>
				<option
					style={{
						backgroundColor: '#ddd7c0',
					}}
					value={'1842'}
				>
					Крым 1842 год
				</option>
				<option
					style={{
						backgroundColor: '#dbdfee',
					}}
					value={'1941'}
				>
					Крым 1941 год
				</option>
			</Select>
		</Stack>
	);
};

export default SelectMap;
