import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {fetchSWDatabank} from "./fetch.js";
import Browse from "./presenters/browsePresenter.jsx";
import LandingPagePresenter from './presenters/landingPagePresenter';

function makeRouter(props) {
	function loader({request}){
		const url = new URL(request.url)
		const searchParam = url.pathname.replace("/","");
		const result = fetchSWDatabank(searchParam)
		model.setSearchResult(result);
		return result;
	}
	return createBrowserRouter([
		{
			path: '/',
			element: <LandingPagePresenter />,
		},
		{
			path: '/browse',
			element: 'browse',
		},
		{
			path: '/characters',
			element: <Browse model={props.model}/>,
			loader: loader,
			errorElement: <Browse model={props.model}/>
		},
		{
			path: '/locations',
			element: <Browse model={props.model}/>,
			loader: loader,
			errorElement: <Browse model={props.model}/>
		},
		{
			path: '/vehicles',
			element: <Browse model={props.model}/>,
			loader: loader,
			errorElement: <Browse model={props.model}/>
		},
	]);
}

export default
observer(
	function ReactRoot(props) {
	return <RouterProvider router={makeRouter(props)} />;
});
