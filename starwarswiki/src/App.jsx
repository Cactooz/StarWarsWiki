import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import FooterPresenter from './presenters/footerPresenter.jsx';
import AnimatedRoutes from './AnimatedRoutes.jsx';

export default observer(function ReactRoot(props) {
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
