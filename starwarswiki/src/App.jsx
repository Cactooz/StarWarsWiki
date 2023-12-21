import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import FooterPresenter from './presenters/footerPresenter.jsx';
import AnimatedRoutes from './AnimatedRoutes.jsx';

export default observer(function ReactRoot(props) {
	window.onload = updateMainTopMargin;
	window.onresize = updateMainTopMargin;

	function updateMainTopMargin() {
		const main = document.getElementById('main');
		if (main) {
			main.style.marginTop = `${document.getElementById('header')?.offsetHeight}px`;
		}
	}

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/*' element={<AnimatedRoutes model={props.model} />} />
				</Routes>
			</BrowserRouter>
			<FooterPresenter />
		</>
	);
});
