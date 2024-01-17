import {
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	Text,
} from '@chakra-ui/react';
import { Point } from '@prisma/client';
import PointContex from '~/context/pointContext';
import PointPhoto from './PointPhoto';
import PointSocial from './PointSocial';
import PointComments from './PointComments';

const DrawerInner = ({ point }: { point: Point }) => {
	return (
		<PointContex.Provider value={{
            point
        }}>
			<DrawerContent borderTopRadius={12} width={450} >
				<DrawerCloseButton />
				<DrawerHeader>{point.name}</DrawerHeader>
				<DrawerBody overflow={'hidden'}>
					<PointPhoto />
					<Text fontSize={12}>{point.description}</Text>
                    <PointSocial/>
				</DrawerBody>
                <DrawerFooter>
                    <PointComments/>
                </DrawerFooter>
			</DrawerContent>
		</PointContex.Provider>
	);
};
export default DrawerInner;
