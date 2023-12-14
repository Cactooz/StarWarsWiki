import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import LandingPagePresenter from './presenters/landingPagePresenter';
import FooterPresenter from './presenters/footerPresenter.jsx';
import ErrorPresenter from './presenters/errorPresenter.jsx';
import HeaderPresenter from './presenters/headerPresenter.jsx';
import ProfilePresenter from './presenters/profilePresenter.jsx';
import SearchPresenter from './presenters/searchPresenter.jsx';
import SearchBarPresenter from './presenters/searchBarPresenter.jsx';
import DetailsPresenter from './presenters/detailsPresenter';
import MoreDetailsPresenter from './presenters/moreDetailsPresenter';
import BrowsePresenter from './presenters/browsePresenter.jsx';

function makeRouter(props) {
	const browseLayout = (
		<>
			<HeaderPresenter model={props.model} />
			<SearchBarPresenter model={props.model} />
			<BrowsePresenter model={props.model} />
		</>
	);

	const detailsLayout = (
		<>
			<HeaderPresenter model={props.model} />
			<SearchBarPresenter model={props.model} />
			<DetailsPresenter model={props.model} />
			<MoreDetailsPresenter model={props.model} />
		</>
	);

	const browsePaths = ['/characters', '/vehicles', '/locations'];
	const detailsPaths = ['/characters/:name', '/locations/:name', '/vehicles/:name'];

	return createBrowserRouter(
		[
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
			browsePaths.map((path) => {
				return { path: path, element: browseLayout };
			}),
			detailsPaths.map((path) => {
				return { path: path, element: detailsLayout };
			}),
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
		].flat(),
	);
}

export default observer(function ReactRoot(props) {
	return (
		<>
			<RouterProvider router={makeRouter(props)} />
			<FooterPresenter />
		</>
	);
});
