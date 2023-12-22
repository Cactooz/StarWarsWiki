import { observer } from 'mobx-react-lite';
import DetailsView from '../views/detailsView';
import Vortex from '../components/Vortex.jsx';
import { useLocation } from 'react-router-dom';
import ErrorView from '../views/errorView.jsx';
import { useEffect } from 'react';

export default observer(function Details(props) {
	useEffect(() => {
		window.scrollTo(0, 0);
		props.model.setSearchString('');
	}, []);

	function addFavoriteACB(object) {
		props.model.addToFavorites(object);
	}

	function removeFavoriteACB(object) {
		props.model.removeFromFavorites(object);
	}

	const splitURL = useLocation().pathname.split('/');
	let page = splitURL[splitURL.length - 2] + '/name/' + splitURL[splitURL.length - 1];

	if (!props.model.details || props.model.currentDetails !== page) {
		props.model.setDetails(page);
		return <Vortex />;
	} else if (props.model.details.length === 0) return <ErrorView />;
	else {
		return (
			<DetailsView
				loggedIn={props.model.user}
				details={props.model.details[0].description}
				image={props.model.details[0].image}
				name={props.model.details[0].name}
				id={props.model.details[0]._id}
				path={splitURL[splitURL.length - 2]}
				fav={props.model.favorites}
				maxFavorites={props.model.maxFavorites}
				removeFavorite={removeFavoriteACB}
				addFavorite={addFavoriteACB}
			/>
		);
	}
});
