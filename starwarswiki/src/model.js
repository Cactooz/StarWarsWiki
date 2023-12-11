import {fetchSWDatabank} from './fetch.js';
import {queryClient} from './main.jsx';

export default {
	user: {},
	favorites: [],

	currentBrowse: undefined,
	browseResult: {},

	currentDetails: undefined,
	details: {},

	setUser(user) {
		this.user = user;
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
};
