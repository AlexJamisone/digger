import { Image, Link, Spinner, Stack } from '@chakra-ui/react';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lightgallery.css';
import lgZoom from 'lightgallery/plugins/zoom';
import LightGallery from 'lightgallery/react';
import { usePointContext } from '~/context/pointContext';

const PointPhoto = () => {
	const { point } = usePointContext();
	return (
		<Stack
			as={LightGallery}
			mode="lg-slide"
			addClass="lightbox"
			plugins={[lgZoom]}
			download={false}
		>
			{point.images.map((name, index) => (
				<Link
					data-src={`https://uploadthing.com/f/${name}`}
					href={`https://uploadthing.com/f/${name}`}
					key={index}
					data-sub-html="<p></p>"
				>
					<Image
						alt={`${name}`}
						src={`https://uploadthing.com/f/${name}`}
						fallback={<Spinner />}
						w={'100%'}
						h={'100%'}
					/>
				</Link>
			))}
		</Stack>
	);
};

export default PointPhoto;
