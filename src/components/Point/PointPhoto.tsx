import {
	MdOutlineKeyboardArrowLeft,
	MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { Icon, IconButton, Image, Skeleton, Stack } from '@chakra-ui/react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { usePointContext } from '~/context/pointContext';
import { useHelpers } from '~/stores/useHelpers';

const PointPhoto = () => {
	const { point } = usePointContext();
    const setIs = useHelpers((state) => state.setIsCarosel)
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [emblaRef, emblaApi] = useEmblaCarousel({
		startIndex: 0,
	});
	const [emblaThumbRef, emblaThumbApi] = useEmblaCarousel({
		dragFree: true,
		containScroll: 'keepSnaps',
	});
	const onThumbClick = useCallback(
		(index: number) => {
			if (!emblaApi || !emblaThumbApi) return;
			emblaApi.scrollTo(index);
		},
		[emblaApi, emblaThumbApi],
	);
	const btnControl = ({
		position,
		action,
		icon,
	}: {
		position: 'right' | 'left';
		action: () => void;
		icon: IconType;
	}) => {
		return (
			<>
				{((position === 'right' && emblaApi?.canScrollNext()) ||
					(position === 'left' && emblaApi?.canScrollPrev())) && (
					<IconButton
						position="absolute"
						variant="solid"
						size="xs"
						aria-label="prev"
						icon={<Icon as={icon} boxSize={7} />}
						top="40%"
						left={position === 'left' ? 0 : undefined}
						right={position === 'right' ? 0 : undefined}
						rounded="full"
						onClick={() => action()}
					/>
				)}
			</>
		);
	};
	const onSelect = useCallback(() => {
		if (!emblaApi || !emblaThumbApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
		emblaThumbApi.scrollTo(emblaApi.selectedScrollSnap());
	}, [emblaApi, emblaThumbApi]);
	useEffect(() => {
		if (!emblaApi) return;
		onSelect();
		emblaApi.on('select', onSelect);
		emblaApi.on('reInit', onSelect);
	}, [emblaApi, onSelect]);

	return (
		<Stack onTouchStart={() => setIs(true)} onTouchEnd={() => setIs(false)}>
			<Stack ref={emblaRef} overflow={'hidden'} position="relative" >
				<Stack display={'flex'} direction={'row'}>
					{point.images.map((src) => (
						<Image
							src={`https://uploadthing.com/f/${src}`}
							key={src}
							flex={'0 0 100%'}
							minW={0}
							w={450}
							h={260}
							objectFit="contain"
							fallback={<Skeleton w={450} h={260} />}
						/>
					))}
				</Stack>
				{btnControl({
					position: 'left',
					action: () => emblaApi?.scrollPrev(),
					icon: MdOutlineKeyboardArrowLeft,
				})}
				{btnControl({
					position: 'right',
					action: () => emblaApi?.scrollNext(),
					icon: MdOutlineKeyboardArrowRight,
				})}
			</Stack>
			<Stack
				ref={emblaThumbRef}
				direction="row"
				justifyContent="center"
				overflow="hidden"
			>
				{point.images.map((src, index) => (
					<Image
						fallback={<Skeleton w={50} h={25} />}
						alt={`${src}`}
						src={`https://uploadthing.com/f/${src}`}
						key={src}
						w={50}
						h={25}
						cursor="pointer"
						onClick={() => onThumbClick(index)}
						opacity={index === selectedIndex ? 1 : 0.5}
						transition="opacity .2s ease-in-out"
					/>
				))}
			</Stack>
		</Stack>
	);
};

export default PointPhoto;
