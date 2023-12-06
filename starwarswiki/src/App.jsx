import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Browse from './presenters/browsePresenter.jsx';
import LandingPagePresenter from './presenters/landingPagePresenter';
import DetailsPresenter from './presenters/detailsPresenter.jsx';
import FooterPresenter from './presenters/footerPresenter.jsx';
import ErrorPresenter from './presenters/errorPresenter.jsx';
import HeaderPresenter from './presenters/headerPresenter.jsx';

function makeRouter(props) {
	return createBrowserRouter([
		{
			path: '/',
			element: <LandingPagePresenter />,
			errorElement: <LandingPagePresenter />,
		},
		{
			path: '/browse',
			element: 'browse',
		},
		{
			path: '/characters',
			element: (
				<div>
					<HeaderPresenter />
					<Browse model={props.model} />
				</div>
			),
			errorElement: (
				<div>
					<HeaderPresenter />
					<Browse model={props.model} />
				</div>
			),
		},
		{
			path: '/locations',
			element: (
				<div>
					<HeaderPresenter />
					<Browse model={props.model} />
				</div>
			),
			errorElement: (
				<div>
					<HeaderPresenter />
					<Browse model={props.model} />
				</div>
			),
		},
		{
			path: '/vehicles',
			element: (
				<div>
					<HeaderPresenter />
					<Browse model={props.model} />
				</div>
			),
			errorElement: (
				<div>
					<HeaderPresenter />
					<Browse model={props.model} />
				</div>
			),
		},
		{
			path: '/characters/:name',
			element: (
				<div>
					<HeaderPresenter />
					<DetailsPresenter />
				</div>
			),
			errorElement: (
				<div>
					<HeaderPresenter />
					<ErrorPresenter />
				</div>
			),
		},
		{
			path: '/locations/:name',
			element: (
				<div>
					<HeaderPresenter />
					<DetailsPresenter />
				</div>
			),
			errorElement: (
				<div>
					<HeaderPresenter />
					<ErrorPresenter />
				</div>
			),
		},
		{
			path: '/vehicles/:name',
			element: (
				<div>
					<HeaderPresenter />
					<DetailsPresenter />
				</div>
			),
			errorElement: (
				<div>
					<HeaderPresenter />
					<ErrorPresenter />
				</div>
			),
		},
		{
			path: '*',
			element: (
				<div>
					<HeaderPresenter />
					<ErrorPresenter />
				</div>
			),
		},
	]);
}

export default observer(function ReactRoot(props) {
	return (
		<>
			<RouterProvider router={makeRouter(props)} />
			<FooterPresenter />
		</>
	);
});
