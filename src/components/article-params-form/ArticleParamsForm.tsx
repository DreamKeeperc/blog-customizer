import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef, ChangeEvent } from 'react'
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';

type FormSubmit = {
	onFormSubmit: (newValue: any) => void 
}

export const ArticleParamsForm = ({onFormSubmit}: FormSubmit) => {
	const sideBarRef = useRef<HTMLDivElement>(null)

	const fontFamily = defaultArticleState.fontFamilyOption;
	const fontSize = defaultArticleState.fontSizeOption;
	const fontColor = defaultArticleState.fontColor;
	const backgroundColor = defaultArticleState.backgroundColor;
	const contentWidth = defaultArticleState.contentWidth;

	const [isOpen, setIsOpen] = useState(false);

	const [form, setForm] = useState({
		font: fontFamily,
		size: fontSize,
		color: fontColor,
		backColor: backgroundColor,
		width: contentWidth
	})

	const onClick = () => {
		setIsOpen(!isOpen);
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onFormSubmit({
			'--font-family':	form.font.value,
			'--font-size': form.size.value,
			'--font-color': form.color.value,
			'--container-width': form.width.value,
			'--bg-color': form.backColor.value
		})
	}

	const handleClear = (e: React.FormEvent) => {
		e.preventDefault();
		onFormSubmit({
			'--font-family':	fontFamily.value,
			'--font-size': fontSize.value,
			'--font-color': fontColor.value,
			'--container-width': contentWidth.value,
			'--bg-color': backgroundColor.value
		})
	}

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onClick} />
			<aside ref = {sideBarRef} className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<Text size={38} weight={800} uppercase={true}>Задайте параметры</Text>
					<Select selected={form.font} options={fontFamilyOptions} title={'Шрифт'} onChange={(selectedFont) => {setForm({...form, font: selectedFont})}}/>
					<RadioGroup selected={form.size} options={fontSizeOptions} name={form.font.className} title={'Размер шрифта'} onChange={(selectedSize) => {setForm({...form, size: selectedSize})}}/>
					<Select selected={form.color} options={fontColors} title={'Цвет шрифта'} onChange={(selectedColor) => {setForm({...form, color: selectedColor})}} />
					<Separator />
					<Select selected={form.backColor} options={backgroundColors} title={'Цвет фона'} onChange={(selectedBackColor) => {setForm({...form, backColor: selectedBackColor})}}/>
					<Select selected={form.width} options={contentWidthArr} title={'Ширина контента'} onChange={(selectedWidth) => {setForm({...form, width: selectedWidth})}}/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear'  onClick={handleClear}/>
						<Button title='Применить' htmlType='submit' type='apply' onClick={handleSubmit}/>
					</div>
				</form>
			</aside>
		</>
	);
};
