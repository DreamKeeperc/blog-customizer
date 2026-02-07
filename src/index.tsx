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

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': stateForm.fontFamilyOption.value,
					'--font-size': stateForm.fontSizeOption.value,
					'--font-color': stateForm.fontColor.value,
					'--container-width': stateForm.contentWidth.value,
					'--bg-color': stateForm.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currentStateForm={stateForm}
				onSetStateForm={setStateForm}
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
