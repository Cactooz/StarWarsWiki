import { useLocation } from 'react-router-dom';
import Vortex from '../components/Vortex';
import BrowseView from '../views/browseView';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import NoResultsView from '../views/noResultsView';

export default observer(function SearchPresenter(props) {
	useEffect(() => {
		window.scrollTo(0, 0);
		props.model.setSearchString('');
	}, []);

	function doAddACB(card) {
		props.model.addToFavorites(card);
	}

	function doRemoveACB(card) {
		props.model.removeFromFavorites(card);
	}

	function render(searchReady) {
		const location = useLocation();
		if (searchReady && props.model.searchResults.length !== 0)
			return (
				<BrowseView
					browseResult={props.model.searchResults}
					doAdd={doAddACB}
					doRemove={doRemoveACB}
					fav={props.model.favorites}
					maxFavorites={props.model.maxFavorites}
					auth={props.model.user}
					inAnimation={props.model.inAnimation}
					path={location.pathname}
				/>
			);
		else if (searchReady) return <NoResultsView />;
		else return <Vortex />;
	}
	return <>{render(props.model.searchReady)}</>;
});
