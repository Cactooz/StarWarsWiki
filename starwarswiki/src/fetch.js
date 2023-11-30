import axios from 'axios';
import { useQuery, useQueries } from 'react-query';

function fetchApi(url, path, params, key) {
	return useQuery({
		concurrentQueriesLimit: 5,
		staleTime: 86400000,
		queryKey: [key],
		queryFn: () =>
			axios.get(`${url}${path}?${new URLSearchParams(params)}`).then((res) => res.data),
	});
}

export function fetchSWAPI(path, params) {
	const { isLoading, isError, data } = fetchApi('https://swapi.dev/api/', path, params, 'SWAPI');
	return { loading: isLoading, error: isError, data: data };
}

export function fetchSWDatabank(path, params) {
	let { isLoading, isError, data } = fetchApi(
		'https://starwars-databank-server.vercel.app/api/v1/',
		path,
		params,
		'SWDatabase',
	);

	if (data === "These aren't the droids you're looking for...") isError = true;

	return { loading: isLoading, error: isError, data: data };
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
			queryKey: ['people'],
			queryFn: () => callApi('characters', params),
		},
		{
			queryKey: ['creatures'],
			queryFn: () => callApi('creatures', params),
		},
		{
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
