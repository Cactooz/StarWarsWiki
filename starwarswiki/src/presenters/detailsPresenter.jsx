import { observer } from 'mobx-react-lite';
import DetailsView from '../views/detailsView';
import MoreDetailsView from '../views/moreDetailsView';
import Vortex from '../components/Vortex.jsx';

const data = {
	swapiId: 'cGVvcGxlOjE=',
	swapiName: 'Luke Skywalker',
	swapiType: 'People',
	swdName: 'Luke Skywalker',
};
let moreDetails = false;

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

	let moreDetailsPath = atob(data.swapiId).split(':');
	let moreDetailsPage = `${moreDetailsPath[0]}/${moreDetailsPath[1]}`;

	if (!props.model.details || props.model.currentDetails !== page || !props.model.moreDetails) {
		props.model.setDetails(page);
		props.model.setMoreDetails(moreDetailsPage);
		return <Vortex />;
	} else if (props.model.details === null || props.model.moreDetails === null) return 'Error';
	else {
		moreDetails = props.model.moreDetails[0]?.[1];

		if (moreDetails) {
			moreDetails = Object.keys(moreDetails).map((key) => {
				return {
					key: key,
					value: moreDetails[key],
				};
			});

			moreDetails = moreDetails.filter(({ key, value }) => {
				if (key === 'name' || key === 'created' || key === 'edited') return false;
				if (typeof value === 'string' && value.startsWith('http')) return false;
				if (Array.isArray(value)) return false;
				return true;
			});

			moreDetails = moreDetails.map((item) => ({
				key: item.key.replace('_', ' '),
				value: item.value,
			}));
		}

		return (
			<>
				<DetailsView
					loggedIn={props.model.user}
					details={props.model.details[0].description}
					image={props.model.details[0].image}
					name={props.model.details[0].name}
					id={props.model.details[0]._id}
					path={splitURL[splitURL.length - 2]}
					fav={props.model.favorites}
					removeFavorite={removeFavoriteACB}
					addFavorite={addFavoriteACB}
				/>
				{moreDetails && <MoreDetailsView details={moreDetails} />}
			</>
		);
	}
});
