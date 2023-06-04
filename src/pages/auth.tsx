import { SignIn } from '@clerk/nextjs';
const Auth = () => {
	return <SignIn afterSignInUrl={'/'} afterSignUpUrl={'/signup'} />;
};

export default Auth;
