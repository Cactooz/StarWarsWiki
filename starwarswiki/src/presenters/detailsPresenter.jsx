import { observer } from 'mobx-react-lite';
import DetailsView from '../views/detailsView';

export default observer(function Details(props) {
	function showDetailsACB(id) {}

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
