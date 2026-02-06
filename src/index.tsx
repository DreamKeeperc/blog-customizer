import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [stateForm, setStateForm] = useState(defaultArticleState);
	const [appliedStateForm, setAppliedStateForm] = useState(defaultArticleState);

	const onButtonSubmit = () => {
		setAppliedStateForm(stateForm);
	};

	const onButtonReset = () => {
		setStateForm(defaultArticleState);
		setAppliedStateForm(defaultArticleState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': appliedStateForm.fontFamilyOption.value,
					'--font-size': appliedStateForm.fontSizeOption.value,
					'--font-color': appliedStateForm.fontColor.value,
					'--container-width': appliedStateForm.contentWidth.value,
					'--bg-color': appliedStateForm.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				stateForm={stateForm}
				setStateForm={setStateForm}
				onFormSubmit={onButtonSubmit}
				onFormReset={onButtonReset}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
