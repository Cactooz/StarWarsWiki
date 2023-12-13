import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Browse from './presenters/browsePresenter.jsx';
import LandingPagePresenter from './presenters/landingPagePresenter';
import DetailsPresenter from './presenters/detailsPresenter.jsx';
import FooterPresenter from './presenters/footerPresenter.jsx';
import ErrorPresenter from './presenters/errorPresenter.jsx';
import HeaderPresenter from './presenters/headerPresenter.jsx';
import ProfilePresenter from './presenters/profilePresenter.jsx';
import SearchPresenter from './presenters/searchPresenter.jsx';
import MoreDetailsPresenter from './presenters/moreDetailsPresenter.jsx';

function makeRouter(props) {
	return createBrowserRouter([
		{
			path: '/',
			element: <LandingPagePresenter model={props.model} />,
			errorElement: <LandingPagePresenter />,
		},
		{
			path: '/search',
			element: (
				<>
					<HeaderPresenter model={props.model} />
					<SearchPresenter model={props.model} />
				</>
			),
		},
		{
			path: '/characters',
			element: (
				<>
					<HeaderPresenter model={props.model} />
					<Browse model={props.model} />
				</>
			),
			errorElement: (
				<>
					<HeaderPresenter model={props.model} />
					<Browse model={props.model} />
				</>
			),
		},
		{
			path: '/locations',
			element: (
				<>
					<HeaderPresenter model={props.model} />
					<Browse model={props.model} />
				</>
			),
			errorElement: (
				<>
					<HeaderPresenter model={props.model} />
					<Browse model={props.model} />
				</>
			),
		},
		{
			path: '/vehicles',
			element: (
				<>
					<HeaderPresenter model={props.model} />
					<Browse model={props.model} />
				</>
			),
			errorElement: (
				<>
					<HeaderPresenter model={props.model} />
					<Browse model={props.model} />
				</>
			),
		},
		{
			path: '/characters/:name',
			element: (
				<>
					<HeaderPresenter model={props.model} />
					<DetailsPresenter model={props.model} />
					<MoreDetailsPresenter model={props.model} />
				</>
			),
			errorElement: (
				<>
					<HeaderPresenter model={props.model} />
					<ErrorPresenter />
				</>
			),
		},
		{
			path: '/locations/:name',
			element: (
				<>
					<HeaderPresenter model={props.model} />
					<DetailsPresenter model={props.model} />
					<MoreDetailsPresenter model={props.model} />
				</>
			),
			errorElement: (
				<>
					<HeaderPresenter model={props.model} />
					<ErrorPresenter />
				</>
			),
		},
		{
			path: '/vehicles/:name',
			element: (
				<>
					<HeaderPresenter model={props.model} />
					<DetailsPresenter model={props.model} />
					<MoreDetailsPresenter model={props.model} />
				</>
			),
			errorElement: (
				<>
					<HeaderPresenter model={props.model} />
					<ErrorPresenter />
				</>
			),
		},
		{
			path: '*',
			element: (
				<>
					<HeaderPresenter model={props.model} />
					<ErrorPresenter />
				</>
			),
		},
		{
			path: '/profile',
			element: (
				<>
					<HeaderPresenter model={props.model} />
					<ProfilePresenter model={props.model} />
				</>
			),
			errorElement: (
				<>
					<HeaderPresenter model={props.model} />
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
