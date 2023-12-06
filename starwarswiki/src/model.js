import {fetchSWDatabank} from './fetch.js';
import {queryClient} from './main.jsx';

export default {
	currentBrowse: undefined,
	browseResult: {},

	currentDetails: undefined,
	details: {},

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
