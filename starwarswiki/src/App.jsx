import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import Browse from "./presenters/browsePresenter.jsx";
import LandingPagePresenter from './presenters/landingPagePresenter';
import DetailsPresenter from './presenters/detailsPresenter.jsx';

function makeRouter(props) {
	return createBrowserRouter([
		{
			path: '/',
			element: <LandingPagePresenter/>,
			errorElement: <LandingPagePresenter/>,
		},
		{
			path: '/browse',
			element: 'browse',
		},
		{
			path: '/characters',
			element: <Browse model={props.model}/>,
			errorElement: <Browse model={props.model}/>,
		},
		{
			path: '/locations',
			element: <Browse model={props.model}/>,
			errorElement: <Browse model={props.model}/>,
		},
		{
			path: '/vehicles',
			element: <Browse model={props.model}/>,
			errorElement: <Browse model={props.model}/>,
		},
		{
			path: '/characters/:name',
			element: <DetailsPresenter/>,
			errorElement: <DetailsPresenter/>,
		},
		{
			path: '/locations/:name',
			element: <DetailsPresenter/>,
			errorElement: <DetailsPresenter/>,
		},
		{
			path: '/vehicles/:name',
			element: <DetailsPresenter/>,
			errorElement: <DetailsPresenter/>,
		},
	]);
}

export default observer(function ReactRoot(props) {
	return <RouterProvider router={makeRouter(props)}/>;
});
