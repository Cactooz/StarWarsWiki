import { fetchSWDatabank } from '../fetch.js';
import { queryClient } from '../main.jsx';

export default {
	user: {},
	favorites: [],
	isLoading: false,

	currentBrowse: undefined,
	browseResult: {},

	currentDetails: undefined,
	details: {},

	setLoading(state) {
		this.isLoading = state;
	},

	searchResults: [],
	searchReady: true,

	setUser(user) {
		this.user = user;
	},

	addToFavorites(fav) {
		this.favorites = [...this.favorites, fav];
	},

	removeFromFavorites(fav) {
		function findFavCB(item) {
			return fav.name !== item.name;
		}

		this.favorites = this.favorites.filter(findFavCB);
	},

	async setDetails(params) {
		await fetchSWDatabank(params, {}, params);
		this.details = queryClient.getQueryData(params);
		this.currentDetails = params;
	},

	unSetCurrentBrowse() {
		this.currentBrowse = undefined;
	},

	async setBrowseResult(params) {
		await fetchSWDatabank(params, {}, params);
		this.browseResult = queryClient.getQueryData(params);
		this.currentBrowse = params;
	},
	async addBrowseResult(params) {
		await fetchSWDatabank(params, {}, params);
		let data = [...this.browseResult.data, ...queryClient.getQueryData(params).data];
		let info = queryClient.getQueryData(params).info;

		this.browseResult = { data, info };
	},

	async setSearchResults(results) {
		this.searchReady = false;
		this.searchResults = await Promise.all(
			results.map(async (item) => {
				await fetchSWDatabank(`${item.type}/name/${item.name}`, {}, item.type + '/' + item.name);
				return queryClient.getQueryData(item.type + '/' + item.name)[0];
			}),
		);
		this.searchReady = true;
	},
};
