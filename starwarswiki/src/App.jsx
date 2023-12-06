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
				<>
					<HeaderPresenter />
					<Browse model={props.model} />
				</>
			),
			errorElement: (
				<>
					<HeaderPresenter />
					<Browse model={props.model} />
				</>
			),
		},
		{
			path: '/locations',
			element: (
				<>
					<HeaderPresenter />
					<Browse model={props.model} />
				</>
			),
			errorElement: (
				<>
					<HeaderPresenter />
					<Browse model={props.model} />
				</>
			),
		},
		{
			path: '/vehicles',
			element: (
				<>
					<HeaderPresenter />
					<Browse model={props.model} />
				</>
			),
			errorElement: (
				<>
					<HeaderPresenter />
					<Browse model={props.model} />
				</>
			),
		},
		{
			path: '/characters/:name',
			element: (
				<>
					<HeaderPresenter />
					<DetailsPresenter />
				</>
			),
			errorElement: (
				<>
					<HeaderPresenter />
					<ErrorPresenter />
				</>
			),
		},
		{
			path: '/locations/:name',
			element: (
				<>
					<HeaderPresenter />
					<DetailsPresenter />
				</>
			),
			errorElement: (
				<>
					<HeaderPresenter />
					<ErrorPresenter />
				</>
			),
		},
		{
			path: '/vehicles/:name',
			element: (
				<>
					<HeaderPresenter />
					<DetailsPresenter />
				</>
			),
			errorElement: (
				<>
					<HeaderPresenter />
					<ErrorPresenter />
				</>
			),
		},
		{
			path: '*',
			element: (
				<>
					<HeaderPresenter />
					<ErrorPresenter />
				</>
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
