import BrowseView from '../views/browseView.jsx';
import Vortex from '../components/Vortex.jsx';
import {observer} from 'mobx-react-lite';
import axios from "axios";
import {queryClient} from "../main.jsx";
import {useInfiniteQuery} from "react-query";


export const loader = (queryClient) => async ({request}) => {
	const url = new URL(request.url)
	const params = url.pathname.replace("/", "");
	const tot = new URL(`https://starwars-databank-server.vercel.app/api/v1/${params}`);
	return (queryClient.getQueryData(params) ??
		await queryClient.fetchQuery({
			queryKey: params, queryFn: () =>
				axios.get(`${tot}`).then((res) => res.data), getNextPageParam: lastPage => lastPage.info.next
		})
	);
}
export default observer(function Browse(props) {
	function render(searchResult) {
		if (!searchResult.data)
			return <Vortex/>;
		else if (searchResult.error) {
			return searchResult.error;
		} else return <BrowseView browseResult={searchResult.data}/>;
	}

	const site = window.location.pathname.replace("/", "")

	if (queryClient.getQueryState(site).data === undefined)
		return <Vortex/>;
	else
		return render(queryClient.getQueryData(site));
});
