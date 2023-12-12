import Vortex from '../components/Vortex';
import BrowseView from '../views/browseView';
import SearchBarPresenter from './searchBarPresenter';
import { observer } from 'mobx-react-lite';

export default observer(function SearchPresenter(props) {
	function render(searchReady) {
		if (searchReady)
			return (
				<BrowseView
					browseResult={props.model.searchResults}
					doAdd={() => {}}
					doRemove={() => {}}
					fav={props.model.favorites}
				/>
			);
		else return <Vortex />;
	}
	return (
		<>
			<SearchBarPresenter model={props.model} />
			{render(props.model.searchReady)}
		</>
	);
});
