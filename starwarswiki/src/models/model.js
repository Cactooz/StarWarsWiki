import { fetchSWDatabank, fetchSWAPI } from '../fetch.js';
import { queryClient } from '../main.jsx';
import { writeToDB } from './firebaseModel.js';

export default {
	user: {},
	favorites: [],
	isLoading: false,

	currentBrowse: undefined,
	browseResult: {},

	currentDetails: undefined,
	details: {},
	currentMoreDetails: undefined,
	moreDetails: {},
	currentHash: undefined,
	hash: {},

	setLoading(state) {
		this.isLoading = state;
	},

	searchResults: [],
	searchReady: true,
	autoCompleteResults: [],

	setAutoCompleteResults(results) {
		this.autoCompleteResults = results;
	},

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

	setFavsFromDB(data) {
		if (data === null) data = [];
		this.favorites = data;
	},

	async setDetails(params) {
		this.detailsLoaded = false;
		await fetchSWDatabank(params, {}, params);
		this.details = queryClient.getQueryData(params);
		this.currentDetails = params;
	},

	async setMoreDetails(params) {
		this.detailsLoaded = false;
		if (params) {
			await fetchSWAPI(params, {}, params);
			this.moreDetails = queryClient.getQueriesData(params);
			this.currentMoreDetails = params;
		}
		this.detailsLoaded = true;
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

	async setSearchResults() {
		this.searchReady = false;
		this.searchResults = await Promise.all(
			this.autoCompleteResults.map(async (item) => {
				let name = item.name.replaceAll('/', '%2F').replaceAll('.', '%2E');
				await fetchSWDatabank(`${item.type}/name/${name}`, {}, item.type + '/' + name);
				const object = queryClient.getQueryData(item.type + '/' + name)[0];
				object.path = '/' + item.type;
				return object;
			}),
		);
		this.searchReady = true;
	},

	setCurrentHash(hash, location) {
		this.hash = hash;
		this.currentHash = location;
	},
};
