import { observer } from 'mobx-react-lite';
import DetailsView from '../views/detailsView';
import Vortex from '../components/Vortex.jsx';

export default observer(function Details(props) {
	function addFavoriteACB(object) {
		props.model.addToFavorites(object);
	}

	function removeFavoriteACB(object) {
		props.model.removeFromFavorites(object);
	}

	let path = window.location.pathname;
	const splitURL = path.split('/');
	let page = splitURL[splitURL.length - 2] + '/name/' + splitURL[splitURL.length - 1];

	if (!props.model.details || props.model.currentDetails !== page) {
		props.model.setDetails(page);
		return <Vortex />;
	} else if (props.model.details === null) return 'Error';
	else {
		return (
			<DetailsView
				details={props.model.details[0].description}
				image={props.model.details[0].image}
				name={props.model.details[0].name}
				id={props.model.details[0]._id}
				path={splitURL[splitURL.length - 2]}
				fav={props.model.favorites}
				removeFavorite={removeFavoriteACB}
				addFavorite={addFavoriteACB}
			></DetailsView>
		);
	}
});
