import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
		return (
			<div style={props.model.inAnimation ? { pointerEvents: 'none' } : {}} >
				<AnimatedRoutes model={props.model} />
			</div >
		)
	}

	const router = createBrowserRouter([{ path: '*', Component: Root }]);

	return (
		<>
			<RouterProvider router={router} />
			<FooterPresenter />
		</>
	);
});


/*<ScrollRestoration getKey={(location) => {
					const sites = ["/characters", "/vehicles", "/locations"]
					return sites.includes(location.pathname) ? location.pathname : location.key
				}} />*/