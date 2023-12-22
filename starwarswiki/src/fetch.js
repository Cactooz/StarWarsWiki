import axios from 'axios';
import { queryClient } from './main.jsx';

async function fetchApi(url, path, params, key) {
	return (
		queryClient.getQueryData(key) ??
		(await queryClient.fetchQuery({
			concurrentQueriesLimit: 5,
			staleTime: 86400000,
			queryKey: key,
			queryFn: () =>
				axios
					.get(`${url}${path}?${new URLSearchParams(params)}`)
					.then((res) => res.data)
					.catch((err) => console.log(err.message)),
		}))
	);
}

export async function fetchSWAPI(path, params, key) {
	await fetchApi('https://swapi.dev/api/', path, params, key);
}

export async function fetchSWDatabank(path, params, key) {
	await fetchApi('https://starwars-databank-server.vercel.app/api/v1/', path, params, key);

	if (queryClient.getQueryState(key).data === "These aren't the droids you're looking for...") {
		queryClient.setQueryData(key, null);
	}
}
