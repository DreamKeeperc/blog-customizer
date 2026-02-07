import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef, useEffect } from 'react';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';

type FormSubmit = {
	currentStateForm: ArticleStateType;
	onSetStateForm: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentStateForm,
	onSetStateForm,
}: FormSubmit) => {
	const sideBarRef = useRef<HTMLDivElement>(null);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [defaultState, setDefaultState] = useState(currentStateForm);

	const onClick = () => {
		setIsFormOpen(!isFormOpen);
	};

	useEffect(() => {
		const clickOutsideTheForm = (e: MouseEvent) => {
			if (
				sideBarRef.current! &&
				!sideBarRef.current.contains(e.target as Node)
			) {
				setIsFormOpen(false);
			}
		};

		const escapeOutsideTheForm = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				setIsFormOpen(false);
			}
		};

		if (isFormOpen === true) {
			document.addEventListener('mousedown', clickOutsideTheForm);
			document.addEventListener('keydown', escapeOutsideTheForm);
		}

		return () => {
			document.removeEventListener('mousedown', clickOutsideTheForm);
			document.removeEventListener('keydown', escapeOutsideTheForm);
		};
	}, [isFormOpen]);

	const handleSubmit = (e: React.FormEvent<Element>) => {
		e.preventDefault();
		onSetStateForm(defaultState);
	};

	const handleReset = (e: React.FormEvent<Element>) => {
		e.preventDefault();
		onSetStateForm(defaultArticleState);
	};

	const updateFormStyleField = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setDefaultState({ ...defaultState, [field]: value });
		};
	};

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={onClick} />
			<aside
				ref={sideBarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					onReset={handleReset}
					onSubmit={handleSubmit}
					className={styles.form}>
					<Text size={38} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={defaultState.fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={updateFormStyleField('fontFamilyOption')}
					/>
					<RadioGroup
						selected={defaultState.fontSizeOption}
						options={fontSizeOptions}
						name={defaultState.fontFamilyOption.className}
						title={'Размер шрифта'}
						onChange={updateFormStyleField('fontSizeOption')}
					/>
					<Select
						selected={defaultState.fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={updateFormStyleField('fontColor')}
					/>
					<Separator />
					<Select
						selected={defaultState.backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={updateFormStyleField('backgroundColor')}
					/>
					<Select
						selected={defaultState.contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={updateFormStyleField('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
