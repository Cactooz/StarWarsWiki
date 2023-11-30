import BrowseView from '../views/browseView.jsx';
import Vortex from '../components/Vortex.jsx';
import { fetchSWDatabank } from '../fetch.js';
import { observer } from 'mobx-react-lite';
export default observer(function Browse(props) {
	function loader() {
		const url = new URL(window.location);
		const searchParam = url.pathname.replace('/', '');
		const result = fetchSWDatabank(searchParam, {}, searchParam);
		return result;
	}
	function render(searchResult) {
		if (!searchResult) {
			return 'no data';
		} else if (searchResult.loading) {
			return <Vortex />;
		} else if (searchResult.error) {
			return searchResult.error;
		} else return <BrowseView browseResult={searchResult.data.data} />;
	}

	const test = loader();
	return render(test);
});
