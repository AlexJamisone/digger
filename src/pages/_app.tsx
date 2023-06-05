import { ChakraProvider } from '@chakra-ui/react';
import { ClerkProvider } from '@clerk/nextjs';
import { type AppType } from 'next/app';
import { theme } from '~/chakra/theme';
import Navigation from '~/components/Maps/Navigation';
import { ruRU } from '~/localization/ruRu';
import { api } from '~/utils/api';
import '../styles/global.css';

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<ChakraProvider theme={theme}>
			<ClerkProvider localization={ruRU} {...pageProps}>
				<Navigation />
				<Component {...pageProps} />
			</ClerkProvider>
		</ChakraProvider>
	);
};

export default api.withTRPC(MyApp);
