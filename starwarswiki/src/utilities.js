import { fetchSWDatabank } from './fetch';

function getDetails() {
	let path = window.location.pathname;
	const splitURL = path.split('/');
	let page = splitURL[splitURL.length - 2] + '/name/' + splitURL[splitURL.length - 1];
	return fetchSWDatabank(page, {}, splitURL[splitURL.length - 1]);
}

export { getDetails };
