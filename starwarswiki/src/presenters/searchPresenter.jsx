import Vortex from '../components/Vortex';
import BrowseView from '../views/browseView';
import HeaderPresenter from './headerPresenter';
import { observer } from 'mobx-react-lite';

export default observer(function SearchPresenter(props) {
	function doAddACB(card) {
		props.model.addToFavorites(card);
	}

	function doRemoveACB(card) {
		props.model.removeFromFavorites(card);
	}

	function render(searchReady) {
		if (searchReady && props.model.searchResults.length !== 0)
			return (
				<BrowseView
					browseResult={props.model.searchResults}
					doAdd={doAddACB}
					doRemove={doRemoveACB}
					fav={props.model.favorites}
					maxFavorites={props.model.maxFavorites}
					auth={props.model.user}
				/>
			);
		else if (searchReady) return <h2>No results</h2>;
		else return <Vortex />;
	}
	return <>{render(props.model.searchReady)}</>;
});
