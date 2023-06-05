import { Center } from '@chakra-ui/react';
import { SignIn } from '@clerk/nextjs';
import { motion } from 'framer-motion';
const Auth = () => {
	return (
		<Center
			as={motion.div}
			pt={150}
			initial={{ opacity: 0, y: 50 }}
			animate={{
				opacity: 1,
				y: 0,
				transition: { type: 'spring', duration: 0.5, delay: 0.7 },
			}}
		>
			<SignIn afterSignInUrl="/" signUpUrl="/signup" />
		</Center>
	);
};

export default Auth;
