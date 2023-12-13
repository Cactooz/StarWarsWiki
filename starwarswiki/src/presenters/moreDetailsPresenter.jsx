import { observer } from 'mobx-react-lite';
import MoreDetailsView from '../views/moreDetailsView';
import { readHash } from '../models/firebaseModel.js';

export default observer(function MoreDetails(props) {
	const splitURL = window.location.pathname.split('/');
	const page = splitURL[splitURL.length - 2] + '/name/' + splitURL[splitURL.length - 1];

	if (props.model.currentHash !== splitURL[splitURL.length - 2]) {
		readHash(splitURL[splitURL.length - 2]);
	}

	let moreDetailsPage;

	if (props.model.details[0] && props.model.currentHash === splitURL[splitURL.length - 2]) {
		const hashedItem = props.model.hash[props.model.details?.[0]?._id];

		if (hashedItem) {
			const moreDetailsPath = atob(hashedItem.swapiId).split(':');
			moreDetailsPage = `${moreDetailsPath[0]}/${moreDetailsPath[1]}`;
		}

		if (props.model.currentMoreDetails !== moreDetailsPage) {
			props.model.setMoreDetails(moreDetailsPage);
		}
	}

	if (
		props.model.moreDetails[0] !== undefined &&
		props.model.currentMoreDetails === moreDetailsPage
	) {
		let moreDetails = props.model.moreDetails[0]?.[1];

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
				key: item.key.replaceAll('_', ' '),
				value: item.value,
			}));
		}

		return <MoreDetailsView details={moreDetails} />;
	} else {
		return (
			<MoreDetailsView
				details={[{ key: "'Your eyes can deceive you; don't trust them.'", value: '' }]}
			/>
		);
	}
});
