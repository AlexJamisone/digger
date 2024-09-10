import { Stack } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { useMapsContext } from '~/context/mapsContext';
import PointImages from './PointImages';
import { UploadDropzone } from '~/utils/uploadthings';
const PointsImagesUpload = () => {
	const { dispatch, state } = useMapsContext();

	return (
		<Stack>
			<Stack
				direction="row"
				justifyContent="center"
				gap={5}
				flexWrap="wrap"
			>
				<AnimatePresence>
					{state.image.map((src, index) => (
						<PointImages src={src} key={index} />
					))}
				</AnimatePresence>
			</Stack>
			<UploadDropzone
				endpoint="imageUploader"
                config={{
                    mode: 'auto'
                }}
				onClientUploadComplete={(res) => {
					if (!res) throw new Error('Error with upload');
					dispatch({
						type: 'SET_IMG_WITH_OLD',
						payload: res?.map(({ key }) => key),
					});
				}}
				onUploadError={(e) => console.log(e.message)}
			/>
		</Stack>
	);
};

export default PointsImagesUpload;
