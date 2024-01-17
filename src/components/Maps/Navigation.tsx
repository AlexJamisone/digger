import { Link } from '@chakra-ui/next-js';
import {   Stack } from '@chakra-ui/react';
import { UserButton, useAuth } from '@clerk/nextjs';
import Logo from '~/icons/Logo';
import MenuNavigation from '../Navigation/MenuNavigation';
import SponserButton from '../Navigation/SponserButton';

const Navigation = () => {
	const { isSignedIn } = useAuth();
	return (
       <Stack as={'header'} justifyContent='center' h={75}  alignItems={'center'}>
           <Stack as={'nav'} alignItems={'center'} direction='row' justifyContent={'center'} gap={'50px'}>
                <SponserButton/>
                <Link href={'/'}>
                    <Logo h={150} w={150}/>
                </Link> 
                <MenuNavigation/>
                {isSignedIn && <UserButton/>}
           </Stack> 
       </Stack> 
	);
};

export default Navigation;


