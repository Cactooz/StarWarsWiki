import BrowseView from '../views/browseView.jsx';
import Vortex from '../components/Vortex.jsx';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default observer(function Browse(props) {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	function doAddACB(card) {
		props.model.addToFavorites(card);
	}

	function doRemoveACB(card) {
		props.model.removeFromFavorites(card);
	}

	async function handleScroll() {
		const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
		if (scrollTop + clientHeight >= scrollHeight - clientHeight * 2) {
			if (props.model.browseResult?.info?.next !== null) {
				await addData();
			}
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
	}

	function render(browseResult) {
		const location = useLocation();
		if (props.model.suspense) {
			return <Vortex />;
		} else if (browseResult === null) {
			return <p>Error While Loading. Please Try Again!</p>;
		} else if (browseResult?.data) {
			return (
				<BrowseView
					browseResult={browseResult.data}
					doAdd={doAddACB}
					doRemove={doRemoveACB}
					fav={props.model.favorites}
					maxFavorites={props.model.maxFavorites}
					auth={props.model.user}
					path={location.pathname}
					inAnimation={props.model.inAnimation}
				/>
			);
		}
	}

	addEventListener('scroll', handleScroll);
	const site = useLocation().pathname.replace('/', '');
	useEffect(() => {
		if (props.model.currentBrowse === undefined || props.model.currentBrowse !== site) {
			if (!props.model.isLoading) props.model.setBrowseResult(site);
		}
	}, [site, props.model.isLoading]);
	return render(props.model.browseResult);
});
