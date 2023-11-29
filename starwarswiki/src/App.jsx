import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {fetchSWDatabank} from "./fetch.js";
import Browse from "./presenters/browsePresenter.jsx";

function makeRouter(props) {
	function loader({request}){
		const url = new URL(request.url)
		const searchParam = url.pathname.replace("/","");
		const result = fetchSWDatabank(searchParam)
		model.setSearchResult(result);
		return null
	}
	return createBrowserRouter([
		{
			path: '/',
			element: 'home',
		},
		{
			path: '/browse',
			element: 'browse',
		},
		{
			path: '/characters',
			element: <Browse model={props.model}/>,
			loader: loader,
		},
		{
			path: '/locations',
			element: <Browse model={props.model}/>,
			loader: loader
		},
		{
			path: '/vehicles',
			element: <Browse model={props.model}/>,
			loader: loader
		},
	]);
}

export default
observer(
	function ReactRoot(props) {
	return <RouterProvider router={makeRouter(props)} />;
});
