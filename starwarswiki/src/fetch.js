import axios from 'axios';
import { useQuery } from 'react-query';

function fetchApi(url, path, params, key) {
	const { isLoading, isError, data, error } = useQuery({
		queryKey: [key],
		queryFn: () =>
			axios.get(`${url}${path}?${new URLSearchParams(params)}`).then((res) => res.data),
	});

	return { loading: isLoading, error: isError, data: data };
}

export function fetchSWAPI(path, params) {
	return fetchApi('https://swapi.dev/api/', path, params, 'SWAPI');
}

export function fetchSWDatabank(path, params) {
	let { loading, error, data } = fetchApi(
		'https://starwars-databank-server.vercel.app/api/v1/',
		path,
		params,
		'SWDatabase',
	);

	if (data === "These aren't the droids you're looking for...") error = true;

	return { loading: loading, error: error, data: data };
}
