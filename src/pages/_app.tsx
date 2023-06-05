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
		<ClerkProvider localization={ruRU} {...pageProps}>
			<ChakraProvider theme={theme}>
				<Navigation />
				<Component {...pageProps} />
			</ChakraProvider>
		</ClerkProvider>
	);
};

export default api.withTRPC(MyApp);
