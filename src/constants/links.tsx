import { IconType } from 'react-icons';
import { FaTwitch, FaYandexInternational, FaYoutube } from 'react-icons/fa';
import { SlSocialVkontakte } from 'react-icons/sl';

type NavLinks = {
	id: number;
	title: string;
	icon: IconType;
	href: string;
	color: string;
};
export const links: NavLinks[] = [
	{
		id: 1,
		title: 'Twitch',
		href: 'https://www.twitch.tv/forshmaher_1',
		icon: FaTwitch,
		color: '#6441a5',
	},
	{
		id: 2,
		title: 'Youtube',
		href: 'https://youtube.com/@ForshmaherTREASUREHUNT',
		icon: FaYoutube,
		color: '#FF0000',
	},
	{
		id: 3,
		title: 'Я.Дзен',
		href: 'https://dzen.ru/id/62875aa7cbbb330b8f889687?utm_source=main_stripe_big',
		icon: FaYandexInternational,
		color: 'blackAlpha.900',
	},
	{
		id: 4,
		title: 'Вконтакте',
		href: 'https://vk.com/forshmahertreasurehunt',
		icon: SlSocialVkontakte,
		color: '#0077ff',
	},
];
