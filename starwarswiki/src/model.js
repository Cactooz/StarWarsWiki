import {fetchSWDatabank} from "./fetch.js";
import {queryClient} from "./main.jsx";
import axios from "axios";

export default {
	currentBrowse: undefined,
	browseResult: {},



	async setBrowseResult(params) {
		await fetchSWDatabank(params,{}, params)
		this.browseResult = queryClient.getQueryData(params);
		this.currentBrowse = params;

	}

	/*addFavorite(path, id) {},
	Firebase stuff
	removeFavorite(path, id) {},*/
};
