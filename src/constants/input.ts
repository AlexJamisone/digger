import type { PointState } from '~/reducer/pointReducer';

type InputsProps = {
	id: number;
	name: string;
	placeholder: string;
	title: string;
	error?: string;
	textarea?: boolean;
	value: string;
};

export const inputs = (state: PointState, error?: string): InputsProps[] => {
	return [
		{
			id: 1,
			title: 'Короткое название',
			name: 'name',
			placeholder: 'Название точки',
			error,
			value: state.name,
		},
		{
			id: 2,
			title: 'Описание',
			name: 'description',
			placeholder: 'Описание точки',
			error,
			value: state.description,
			textarea: true,
		},
		{
			id: 3,
			title: 'Ссылка на видео',
			name: 'link',
			placeholder: 'Ссылка',
			value: state.videoLink,
			error,
		},
	];
};
