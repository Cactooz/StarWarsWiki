import BrowseView from '../views/browseView.jsx';
import Vortex from '../components/Vortex.jsx';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';

export default observer(function Browse(props) {
	function doAddACB(card) {
		props.model.addToFavorites(card);
	}

	function doRemoveACB(card) {
		props.model.removeFromFavorites(card);
	}

	function handleScroll() {
		const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
		if (scrollTop + clientHeight >= scrollHeight - clientHeight / 2) {
			addData();
		}
	}

	async function addData() {
		let site = window.location.pathname.split('/');
		if (
			props.model.isLoading ||
			(site[1] !== 'vehicles' && site[1] !== 'characters' && site[1] !== 'locations') ||
			site[2] ||
			!site[1]
		)
			return;
		await props.model.addMoreData();
		return <Vortex />;
	}

	function render(browseResult) {
		const site = useLocation().pathname.replace('/', '');
		if (props.model.currentBrowse === undefined || props.model.currentBrowse !== site) {
			props.model.setBrowseResult(site);
			return <Vortex />;
		} else if (browseResult === null) return <p>Error While Loading. Please Try Again!</p>;
		else if (browseResult) {
			addEventListener('scroll', handleScroll);
			return (
				<BrowseView
					browseResult={browseResult.data}
					doAdd={doAddACB}
					doRemove={doRemoveACB}
					fav={props.model.favorites}
					maxFavorites={props.model.maxFavorites}
					auth={props.model.user}
				/>
			);
		}
	}

	return render(props.model.browseResult);
});
