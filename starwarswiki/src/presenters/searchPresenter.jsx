import { useLocation } from 'react-router-dom';
import Vortex from '../components/Vortex';
import BrowseView from '../views/browseView';
import HeaderPresenter from './headerPresenter';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

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
		else if (searchReady)
			return (
				<>
					<h2>No results</h2>
					<h3>Please try again by typing in the search box</h3>
				</>
			);
		else return <Vortex />;
	}
	return <>{render(props.model.searchReady)}</>;
});
