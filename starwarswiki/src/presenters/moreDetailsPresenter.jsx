import { observer } from 'mobx-react-lite';
import MoreDetailsView from '../views/moreDetailsView';
import { readHash } from '../models/firebaseModel.js';
import Vortex from '../components/Vortex.jsx';
import { useLocation } from 'react-router-dom';

export default observer(function MoreDetails(props) {
	const splitURL = useLocation().pathname.split('/');

	const moreDetailsSpinner = (
		<div>
			<h3>More Details</h3>
			<Vortex />
		</div>
	);

	if (
		props.model.currentDetails !==
		splitURL[splitURL.length - 2] + '/name/' + splitURL[splitURL.length - 1]
	) {
		return moreDetailsSpinner;
	}

	if (props.model.currentHash !== splitURL[splitURL.length - 2]) {
		readHash(splitURL[splitURL.length - 2]);
	}

	let loaded = false;
	let moreDetails;
	let moreDetailsPage;

	if (props.model.details[0] && props.model.currentHash === splitURL[splitURL.length - 2]) {
		const hashedItem = props.model.hash[props.model.details?.[0]?._id];

		if (hashedItem) {
			const moreDetailsPath = atob(hashedItem.swapiId).split(':');
			moreDetailsPage = `${moreDetailsPath[0]}/${moreDetailsPath[1]}`;
		} else {
			loaded = true;
		}

		if (props.model.currentMoreDetails !== moreDetailsPage) {
			props.model.setMoreDetails(moreDetailsPage);
		}
	}

	if (
		props.model.moreDetails[0] !== undefined &&
		props.model.currentMoreDetails === moreDetailsPage
	) {
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
				if (value === 'unknown' || value === 'n/a' || value === 'none') return false;
				if (typeof value === 'string' && value.startsWith('http')) return false;
				if (Array.isArray(value)) return false;
				return true;
			});

			moreDetails = moreDetails.map((item) => ({
				key: item.key.replaceAll('_', ' '),
				value: item.value,
			}));
		}

		loaded = true;
	}
	if (!loaded) {
		return moreDetailsSpinner;
	} else if (loaded && moreDetails) {
		return <MoreDetailsView details={moreDetails} />;
	} else {
		return (
			<MoreDetailsView
				details={[{ key: "'Your eyes can deceive you; don't trust them.'", value: '' }]}
			/>
		);
	}
});
