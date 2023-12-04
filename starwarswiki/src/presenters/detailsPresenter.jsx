import { observer } from 'mobx-react-lite';
import DetailsView from '../views/detailsView';
import { getDetails } from '../utilities';

const related = [
	{
		id: '64292927021f17e13fbc1efd',
		name: 'Cliegg Lars',
		image: 'https://lumiere-a.akamaihd.net/v1/images/databank_cliegglars_01_169_c2f0b9cb.jpeg',
	},
	{
		id: '64292927021f17e13fbc1f01',
		name: 'Clone Captain Howzer',
		image: 'https://lumiere-a.akamaihd.net/v1/images/clone-captain-howzer-main_149c5805.jpeg',
	},
	{
		id: '64292927021f17e13fbc1f09',
		name: 'Clone Commander Jet',
		image:
			'https://lumiere-a.akamaihd.net/v1/images/databank_clonecommanderjet_01_169_e88dd6fb.jpeg',
	},
];

export default observer(function Details(props) {
	const recievedData = getDetails();

	if (recievedData.loading && !recievedData.error) return 'Loading...';
	else if (recievedData.error) return 'Error';
	else if (!recievedData.loading && !recievedData.error) {
		const name = recievedData.data[0].name;
		const desc = recievedData.data[0].description;
		const image = recievedData.data[0].image;

		return <DetailsView details={desc} image={image} name={name} suggested={related}></DetailsView>;
	}
});
