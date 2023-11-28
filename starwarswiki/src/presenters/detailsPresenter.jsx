import { observer } from 'mobx-react-lite';
import DetailsView from '../views/detailsView';

export default observer(function Details(props) {
	function showDetailsACB(id) {}

	let path = window.location.pathname;

	function parseURL(path) {
		const newPath = path.split('/');
		return newPath[newPath.length - 1];
	}

	page = parseURL(path);

	// fetch data with page as name

	return (
		<DetailsView
			details={details}
			image={image}
			name={name}
			suggested={related}
			showDetails={showDetailsACB}
		></DetailsView>
	);
});
