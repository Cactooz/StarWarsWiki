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
import SearchBarPresenter from './presenters/searchBarPresenter.jsx';

function makeRouter(props) {
	return createBrowserRouter([
		{
			path: '/',
			element: (
				<>
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
			element: (
				<>
					<SearchBarPresenter model={props.model} />
					<HeaderPresenter model={props.model} />
					<Browse model={props.model} />
				</>
			),
		},
		{
			path: '/locations',
			element: (
				<>
					<SearchBarPresenter model={props.model} />
					<HeaderPresenter model={props.model} />
					<Browse model={props.model} />
				</>
			),
		},
		{
			path: '/vehicles',
			element: (
				<>
					<SearchBarPresenter model={props.model} />
					<HeaderPresenter model={props.model} />
					<Browse model={props.model} />
				</>
			),
		},
		{
			path: '/characters/:name',
			element: (
				<>
					<SearchBarPresenter model={props.model} />
					<HeaderPresenter model={props.model} />
					<DetailsPresenter model={props.model} />
					<MoreDetailsPresenter model={props.model} />
				</>
			),
		},
		{
			path: '/locations/:name',
			element: (
				<>
					<SearchBarPresenter model={props.model} />
					<HeaderPresenter model={props.model} />
					<DetailsPresenter model={props.model} />
					<MoreDetailsPresenter model={props.model} />
				</>
			),
		},
		{
			path: '/vehicles/:name',
			element: (
				<>
					<SearchBarPresenter model={props.model} />
					<HeaderPresenter model={props.model} />
					<DetailsPresenter model={props.model} />
					<MoreDetailsPresenter model={props.model} />
				</>
			),
		},
		{
			path: '*',
			element: (
				<>
					<SearchBarPresenter model={props.model} />
					<HeaderPresenter model={props.model} />
					<ErrorPresenter />
				</>
			),
		},
		{
			path: '/profile',
			element: (
				<>
					<SearchBarPresenter model={props.model} />
					<HeaderPresenter model={props.model} />
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
