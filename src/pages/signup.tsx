import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
	return <SignUp afterSignInUrl="/" afterSignUpUrl="/" />;
};

export default SignUpPage;
