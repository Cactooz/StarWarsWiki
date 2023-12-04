import { observer } from 'mobx-react-lite';
import DetailsView from '../views/detailsView';
import { getDetails } from '../utilities';
import Vortex from '../components/Vortex.jsx';

export default observer(function Details(props) {
	const recievedData = getDetails();

	if (recievedData.loading && !recievedData.error) return <Vortex />;
	else if (recievedData.error) return 'Error';
	else if (!recievedData.loading && !recievedData.error) {
		const name = recievedData.data[0].name;
		const desc = recievedData.data[0].description;
		const image = recievedData.data[0].image;

		return <DetailsView details={desc} image={image} name={name}></DetailsView>;
	}
});
