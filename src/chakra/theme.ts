import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

//#00CC99

const defultTheme: ThemeConfig = {
	initialColorMode: 'dark',
	disableTransitionOnChange: false,
	useSystemColorMode: false,
};

const colors = {
	brand: {
		500: '#00CC99',
	},
};

export const theme = extendTheme({
	colors,
	defultTheme,
});
