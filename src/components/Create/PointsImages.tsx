import {
	Icon,
	IconButton,
	Image,
	Spinner,
	Stack,
	useToast,
} from '@chakra-ui/react';
import { UploadDropzone } from '@uploadthing/react';
import '@uploadthing/react/styles.css';
import { AnimatePresence, motion } from 'framer-motion';
import { TiDelete } from 'react-icons/ti';
import { useMapsContext } from '~/context/mapsContext';
import { type OurFileRouter } from '~/server/uploadthings';
import { api } from '~/utils/api';
const PointsImages = () => {
	const { dispatch, state } = useMapsContext();
	const { mutate: deleteImage, isLoading } =
		api.images.deletImage.useMutation();
	const toast = useToast();

	const hadnlDeletImage = (src: string) => {
		deleteImage(
			{
				src,
			},
			{
				onSuccess: () => {
					dispatch({
						type: 'SET_IMG',
						payload: state.image.filter((string) => string !== src),
					});
					toast({
						description: 'Картинка удалена! ✔',
						isClosable: true,
						status: 'info',
						position: 'top-right',
					});
				},
			}
		);
	};
	return (
		<Stack>
			<Stack direction="row" justifyContent="center" gap={5}>
				<AnimatePresence>
					{state.image.map((src, index) => (
						<Stack
							key={index}
							position="relative"
							as={motion.div}
							layout
							exit={{
								opacity: 0,
							}}
						>
							<Image
								key={index}
								src={`https://uploadthing.com/f/${src}`}
								alt={`${src}`}
								w={150}
								h={150}
								boxShadow="lg"
								fallback={<Spinner />}
								loading="lazy"
							/>
							<IconButton
								rounded={'full'}
								size={'xs'}
								aria-label="deletImage"
								position="absolute"
								top={-2}
								right={-3}
								as={motion.button}
								initial={{ opacity: 0 }}
								isLoading={isLoading}
								animate={{
									opacity: 1,
									transition: {
										type: 'spring',
										delay: 1,
										duration: 0.5,
									},
								}}
								icon={<Icon as={TiDelete} boxSize={5} />}
								colorScheme="red"
								onClick={() => hadnlDeletImage(src)}
							/>
						</Stack>
					))}
				</AnimatePresence>
			</Stack>
			<UploadDropzone<OurFileRouter>
				endpoint="imageUploader"
				onClientUploadComplete={(res) => {
					if (!res) throw new Error('Error with upload');
					dispatch({
						type: 'SET_IMG',
						payload: res?.map(({ fileKey }) => fileKey),
					});
				}}
				onUploadError={(e) => console.log(e.message)}
			/>
		</Stack>
	);
};

export default PointsImages;
