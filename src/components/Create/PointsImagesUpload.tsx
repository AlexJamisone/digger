import { Stack } from '@chakra-ui/react';
import { UploadDropzone } from '@uploadthing/react';
import '@uploadthing/react/styles.css';
import { AnimatePresence } from 'framer-motion';
import { useMapsContext } from '~/context/mapsContext';
import { type OurFileRouter } from '~/server/uploadthings';
import PointImages from './PointImages';
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
			<UploadDropzone<OurFileRouter>
				endpoint="imageUploader"
				onClientUploadComplete={(res) => {
					if (!res) throw new Error('Error with upload');
					dispatch({
						type: 'SET_IMG_WITH_OLD',
						payload: res?.map(({ fileKey }) => fileKey),
					});
				}}
				onUploadError={(e) => console.log(e.message)}
			/>
		</Stack>
	);
};

export default PointsImagesUpload;
