import BrowseView from '../views/browseView.jsx';
import Vortex from '../components/Vortex.jsx';
import {observer} from 'mobx-react-lite';
import {fetchSWDatabank} from "../fetch.js";


export default observer(function Browse(props) {
	function render(searchResult) {
		if (searchResult.loading)
			return <Vortex/>;
		else if (searchResult.error) {
			return searchResult.error;
		} else
			return <BrowseView browseResult={searchResult.data.data}/>;
	}

	const site = window.location.pathname.replace("/", "")
	const data = fetchSWDatabank(site, {}, site)
	//console.log(props.model)
	//props.model.setSearchResult(site)
	return render(data);
});
