import {
	BrowserRouter,
	Route,
	RouterProvider,
	Routes,
	ScrollRestoration,
	createBrowserRouter,
} from 'react-router-dom';
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

	function Root() {
		return <AnimatedRoutes model={props.model} />;
	}
	const router = createBrowserRouter([{ path: '*', Component: Root }]);

	return (
		<>
			<RouterProvider router={router} />
			<FooterPresenter />
		</>
	);
});
