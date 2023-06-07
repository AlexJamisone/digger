import { Button, Icon } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { BsYoutube } from 'react-icons/bs';
import { SlSocialVkontakte } from 'react-icons/sl';
import DzenIcon from '~/icons/DzenIcon';

type LinkNavigation = {
	id: number;
	href: string;
	name: string;
	color?: string;
	icon: ReactNode;
};

export const links = (
	position: 'first' | 'second' | 'all'
): LinkNavigation[] => {
	switch (position) {
		case 'first':
			return [
				{
					id: 1,
					href: 'https://dzen.ru/id/62875aa7cbbb330b8f889687?utm_source=main_stripe_big',
					name: 'Dzen',
					color: '',
					icon: <DzenIcon boxSize={6} />,
				},
				{
					id: 2,
					href: 'https://youtube.com/@ForshmaherTREASUREHUNT',
					name: 'Youtube',
					color: 'red',
					icon: <Icon as={BsYoutube} boxSize={7} />,
				},
			];
		case 'second':
			return [
				{
					id: 3,
					href: 'https://vk.com/forshmahertreasurehunt',
					name: 'Vkontakte',
					color: '#4C75A3',
					icon: <Icon as={SlSocialVkontakte} boxSize={8} />,
				},
				{
					id: 4,
					href: 'https://www.tinkoff.ru/cf/142W441ULA3',
					name: 'Tinkoff',
					icon: <Button colorScheme="brand">Поддержать</Button>,
				},
			];
		case 'all':
			return [
				{
					id: 1,
					href: 'https://dzen.ru/id/62875aa7cbbb330b8f889687?utm_source=main_stripe_big',
					name: 'Дзен',
					color: '',
					icon: <DzenIcon boxSize={4} />,
				},
				{
					id: 2,
					href: 'https://youtube.com/@ForshmaherTREASUREHUNT',
					name: 'Youtube',
					color: 'red',
					icon: <Icon as={BsYoutube} boxSize={5} color="red.500" />,
				},
				{
					id: 3,
					href: 'https://vk.com/forshmahertreasurehunt',
					name: 'Вконтакте',
					color: '#4C75A3',
					icon: (
						<Icon
							as={SlSocialVkontakte}
							boxSize={5}
							color="messenger.600"
						/>
					),
				},
			];
	}
};
