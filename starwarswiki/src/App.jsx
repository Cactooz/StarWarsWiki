import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import LandingPagePresenter from './presenters/landingPagePresenter';
import FooterPresenter from './presenters/footerPresenter.jsx';
import ErrorPresenter from './presenters/errorPresenter.jsx';
import HeaderPresenter from './presenters/headerPresenter.jsx';
import ProfilePresenter from './presenters/profilePresenter.jsx';
import SearchPresenter from './presenters/searchPresenter.jsx';
import SearchBarPresenter from './presenters/searchBarPresenter.jsx';
import BrowseLayout from './layouts/BrowseLayout.jsx';
import DetailsLayout from './layouts/DetailsLayout.jsx';

function makeRouter(props) {
	return createBrowserRouter([
		{
			path: '/',
			element: (
				<>
					<HeaderPresenter model={props.model} />
					<SearchBarPresenter model={props.model} />
					<LandingPagePresenter model={props.model} />
				</>
			),
		},
		{
			path: '/search',
			element: (
				<>
					<SearchBarPresenter model={props.model} />
					<HeaderPresenter model={props.model} />
					<SearchPresenter model={props.model} />
				</>
			),
		},
		{
			path: '/characters',
			element: <BrowseLayout model={props.model} />,
		},
		{
			path: '/locations',
			element: <BrowseLayout model={props.model} />,
		},
		{
			path: '/vehicles',
			element: <BrowseLayout model={props.model} />,
		},
		{
			path: '/characters/:name',
			element: <DetailsLayout model={props.model} />,
		},
		{
			path: '/locations/:name',
			element: <DetailsLayout model={props.model} />,
		},
		{
			path: '/vehicles/:name',
			element: <DetailsLayout model={props.model} />,
		},
		{
			path: '*',
			element: (
				<>
					<HeaderPresenter model={props.model} />
					<SearchBarPresenter model={props.model} />
					<ErrorPresenter />
				</>
			),
		},
		{
			path: '/profile',
			element: (
				<>
					<HeaderPresenter model={props.model} />
					<SearchBarPresenter model={props.model} />
					<ProfilePresenter model={props.model} />
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
