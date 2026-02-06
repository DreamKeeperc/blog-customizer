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
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';

type FormSubmit = {
	onFormSubmit: () => void;
	onFormReset: () => void;
	stateForm: ArticleStateType;
	setStateForm: (stateForm: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	onFormSubmit,
	onFormReset,
	stateForm,
	setStateForm,
}: FormSubmit) => {
	const sideBarRef = useRef<HTMLDivElement>(null);

	const [isFormOpen, setIsFormOpen] = useState(false);

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
		onFormSubmit();
	};

	const handleReset = (e: React.FormEvent<Element>) => {
		e.preventDefault();
		onFormReset();
	};

	const updateFormStyleField = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setStateForm({ ...stateForm, [field]: value });
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
						selected={stateForm.fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={updateFormStyleField('fontFamilyOption')}
					/>
					<RadioGroup
						selected={stateForm.fontSizeOption}
						options={fontSizeOptions}
						name={stateForm.fontFamilyOption.className}
						title={'Размер шрифта'}
						onChange={updateFormStyleField('fontSizeOption')}
					/>
					<Select
						selected={stateForm.fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={updateFormStyleField('fontColor')}
					/>
					<Separator />
					<Select
						selected={stateForm.backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={updateFormStyleField('backgroundColor')}
					/>
					<Select
						selected={stateForm.contentWidth}
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
