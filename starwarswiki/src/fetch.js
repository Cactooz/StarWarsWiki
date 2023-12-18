import axios from 'axios';
import { useQueries } from 'react-query';
import { queryClient } from "./main.jsx"

async function fetchApi(url, path, params, key) {
	return queryClient.getQueryData(key) ?? await queryClient.fetchQuery({
		concurrentQueriesLimit: 5,
		staleTime: 86400000,
		queryKey: key,
		queryFn: () =>
			axios.get(`${url}${path}?${new URLSearchParams(params)}`).then((res) => res.data),
	})
}

export async function fetchSWAPI(path, params, key) {
	await fetchApi('https://swapi.dev/api/', path, params, key);

}

export async function fetchSWDatabank(path, params, key) {
	//let { isLoading, isError, data } =
	await fetchApi(
		'https://starwars-databank-server.vercel.app/api/v1/',
		path,
		params,
		key,
	);

	if (queryClient.getQueryState(key).data === "These aren't the droids you're looking for...") {
		queryClient.setQueryData(key, null);
	}
}

export function fetchCharacters(params) {
	function callApi(path, params) {
		return axios
			.get(
				`https://starwars-databank-server.vercel.app/api/v1/${path}?${new URLSearchParams(params)}`,
			)
			.then((res) => res.data);
	}

	const results = useQueries([
		{
			concurrentQueriesLimit: 5,
			staleTime: 86400000,
			queryKey: ['people'],
			queryFn: () => callApi('characters', params),
		},
		{
			concurrentQueriesLimit: 5,
			staleTime: 86400000,
			queryKey: ['creatures'],
			queryFn: () => callApi('creatures', params),
		},
		{
			concurrentQueriesLimit: 5,
			staleTime: 86400000,
			queryKey: ['droids'],
			queryFn: () => callApi('droids', params),
		},
	]);

	const isLoading = results.some((query) => query.isLoading);
	const isError = results.some((query) => query.isError);

	//If pages rolled over to 0, remove results
	results.forEach((query) => {
		if (query.data) {
			if (query.data.info.page !== params.page) query.data = null;
		}
	});

	const data = [results[0].data?.data, results[1].data?.data, results[2].data?.data];

	return { loading: isLoading, error: isError, data: data.flat().filter(Boolean) };
}
