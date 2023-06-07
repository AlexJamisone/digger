import { Image } from '@chakra-ui/next-js';
import { Icon, IconButton, Stack, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { TiDelete } from 'react-icons/ti';
import { useMapsContext } from '~/context/mapsContext';
import { api } from '~/utils/api';

type PointImageProps = {
	src: string;
};

const PointImages = ({ src }: PointImageProps) => {
	const { mutate: deleteImage, isLoading } =
		api.images.deletImage.useMutation();
	const toast = useToast();
	const { dispatch, state } = useMapsContext();
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
		<Stack
			position="relative"
			as={motion.div}
			layout
			exit={{
				opacity: 0,
			}}
		>
			<Image
				src={`https://uploadthing.com/f/${src}`}
				alt={`${src}`}
				width={150}
				height={150}
				boxShadow="lg"
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
	);
};

export default PointImages;
