import { Link } from '@chakra-ui/next-js';
import { Center, Icon, Stack } from '@chakra-ui/react';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { BsYoutube } from 'react-icons/bs';
import { SlSocialVkontakte } from 'react-icons/sl';
import DzenIcon from '~/icons/DzenIcon';
import Logo from '~/icons/Logo';

const Navigation = () => {
	return (
		<Center as="header" mx={36} h={20} bgColor="inherit">
			<Center
				as="nav"
				justifyContent="space-around"
				alignItems="center"
				w="100%"
			>
				<Stack direction="row" gap={'200px'}>
					<Link href="" target="_blank">
						<DzenIcon boxSize={7} />
					</Link>
					<Link href="" target="_blank">
						<Icon as={BsYoutube} boxSize={8} />
					</Link>
				</Stack>
				<Stack>
					<Link href={'/'}>
						<Logo boxSize={40} />
					</Link>
				</Stack>
				<Stack direction="row" gap={'200px'}>
					<Link href="" target="_blank">
						<Icon as={SlSocialVkontakte} boxSize={8} />
					</Link>
					<Link href="" target="_blank">
						<DzenIcon boxSize={7} />
					</Link>
				</Stack>
				<SignedIn>
					<UserButton afterSignOutUrl="/" />
				</SignedIn>
			</Center>
		</Center>
	);
};

export default Navigation;
