import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

function makeRouter(model) {
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
			element: 'characters',
		},
		{
			path: '/planets',
			element: 'planets',
		},
		{
			path: '/vehicles',
			element: 'vehicles',
		},
	]);
}

export default observer(function ReactRoot(props) {
	return <RouterProvider router={makeRouter(props.model)} />;
});
