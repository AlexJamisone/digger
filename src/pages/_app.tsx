import { ChakraProvider } from '@chakra-ui/react';
import { ClerkProvider } from '@clerk/nextjs';
import { type AppType } from 'next/app';
import { theme } from '~/chakra/theme';
import Navigation from '~/components/Maps/Navigation';
import { ruRU } from '@clerk/localizations';
import { api } from '~/utils/api';
import '../styles/global.css';

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<ChakraProvider theme={theme}>
			<script
				async
				src="https://analytics.umami.is/script.js"
				data-website-id="74de3feb-46bd-4b39-80bf-4cfb99bdc279"
			></script>
			<ClerkProvider localization={ruRU} {...pageProps}>
				<Navigation />
				<Component {...pageProps} />
			</ClerkProvider>
		</ChakraProvider>
	);
};

export default api.withTRPC(MyApp);
