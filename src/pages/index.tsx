import { Center } from '@chakra-ui/react';
import { type NextPage } from 'next';
import Head from 'next/head';
import Maps from '~/components/Maps/Maps';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Forshmaher</title>
				<meta
					name="description"
					content="Исследуйте Крым с помощью нашей интерактивной карты, которая покажет вам интересные находки, раскопки древностей и антикварные вещи для кладоискателей."
				/>
				<meta
					name="keywords"
					content="Крымская карта, интерактивная карта, древности Крыма, антиквариат, раскопки, исторические находки, кладоискательство, клады, места интереса, туризм Крыма"
				/>
				<meta name="keywords" />
				<meta
					property="og:title"
					content="Карта Крыма: Интересные находки, раскопки древностей и антикварные вещи"
				/>
				<meta
					property="og:description"
					content="Исследуйте Крым с помощью нашей интерактивной карты, которая покажет вам интересные находки, раскопки древностей и антикварные вещи."
				/>
				<meta
					property="og:image"
					content="ссылка на изображение, связанное с вашим сайтом"
				/>
				<meta property="og:url" content="URL вашего сайта" />
				<meta name="twitter:card" content="summary" />
				<meta
					name="twitter:title"
					content="Карта Крыма: Интересные находки, раскопки древностей и антикварные вещи"
				/>
				<meta
					name="twitter:description"
					content="Исследуйте Крым с помощью нашей интерактивной карты, которая покажет вам интересные находки, раскопки древностей и антикварные вещи."
				/>
				<link rel="icon" href="/logo.ico" />
			</Head>
			<Center as="main">
				<Maps maps={<Maps.Object />} />
			</Center>
		</>
	);
};

export default Home;
