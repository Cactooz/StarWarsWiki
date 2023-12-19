import { fetchSWAPI, fetchSWDatabank } from '../fetch.js';
import { queryClient } from '../main.jsx';
import { addFriendDB, friendRequest } from './firebaseModel.js';

export default {
	user: {},
	favorites: [],
	friends: [],
	friendRequests: [],
	sentRequests: [],
	friendFavorites: {},
	maxFavorites: 9,
	
	isLoading: false,
	showId: false,
	isUser: undefined,
	users: {},
	customMessage: undefined,
	suspense: false,
	currentBrowse: undefined,
	browseResult: {},

	currentDetails: undefined,
	details: {},
	currentMoreDetails: undefined,
	moreDetails: {},
	currentHash: undefined,
	hash: {},

	searchResults: [],
	searchString: undefined,
	searchReady: true,
	autoCompleteResults: [],

	setLoading(state) {
		this.isLoading = state;
	},
	addUser(user, name) {
		this.users[user] = name;
	},
	setIsUser(user) {
		this.isUser = user;
	},

	setId(state) {
		this.showId = state;
	},

	addFriend(friendId) {
		friendRequest(friendId)
	},

	addRequest(friendId) {
		this.sentRequests = [...this.sentRequests, friendId]
	},

	setRequestsFromDb(requests) {
		if (!requests) {
			requests = [];
		}
		this.sentRequests = Object.keys(requests);
	},

	setFriends(friends) {
		if (!friends) {
			friends = [];
		}
		this.friends = Object.keys(friends)
	},

	setCustomMessage(msg) {
		this.customMessage = msg;
	},
	setAutoCompleteResults(results) {
		this.autoCompleteResults = results;
	},

	setSearchString(string) {
		this.searchString = string;
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

	removeFriendRequest(uid) {
		function findFriend(id) {
			return id !== uid;
		}

		this.friendRequests = this.friendRequests.filter(findFriend)
	},

	removeFriend(uid) {
		function findFriend(id) {
			return id !== uid;
		}

		this.friends = this.friends.filter(findFriend)
	},

	removeSentRequest(uid) {
		function findFriend(id) {
			return id !== uid;
		}

		this.sentRequests = this.sentRequests.filter(findFriend)
	},

	acceptFriendRequest(userID) {
		addFriendDB(userID)
		this.removeFriendRequest(userID)
		this.friends = [...this.friends, userID]
	},

	setFavsFromDB(data) {
		if (data === null) data = [];
		this.favorites = data;
	},

	setFriendsFavFromDB(data, id) {
		if (data === null) {
			data = []
		}
		this.friendFavorites[id] = data;
	},

	setFriendRequests(requests) {
		if (!requests) {
			requests = [];
		}
		this.friendRequests = Object.keys(requests);
	},

	unSetCurrentDetails() {
		this.currentDetails = undefined;
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
		this.suspense = true;
		this.isLoading = true;
		await fetchSWDatabank(params, {}, params);
		this.browseResult = queryClient.getQueryData(params);
		this.currentBrowse = params;
		await this.addMoreData();
		this.suspense = false;
	},

	async addMoreData() {
		this.isLoading = true;
		let { data, info } = [];
		let string1 = this.browseResult?.info?.next?.replace('/api/v1/', '');
		if (string1) {
			const first = await this.addBrowseResult(string1);
			if (first) {
				info = first.info;
				data = first.data
			}
		} else {
			this.isLoading = false;
			return
		}
		let string2 = info?.next?.replace('/api/v1/', '');
		if (string2) {
			const second = await this.addBrowseResult(string2);
			if (second) {
				info = second.info
				data = [...data, ...second.data]
			}
		}
		let string3 = info?.next?.replace('/api/v1/', '');
		if (string3) {
			const third = await this.addBrowseResult(string3);
			if (third) {
				info = third.info;
				data = [...data, ...third.data]
			}
		}
		if (data && info) {
			this.browseResult.data = [...this.browseResult.data, ...data]
			this.browseResult.info = info
		}
		this.isLoading = false;
	},

	async addBrowseResult(params) {
		await fetchSWDatabank(params, {}, params);
		let data = queryClient.getQueryData(params).data;
		let info = queryClient.getQueryData(params).info;

		return { data, info };
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
