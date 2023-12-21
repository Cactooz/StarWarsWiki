import { initializeApp } from 'firebase/app';
import { get, getDatabase, onValue, ref, remove, set } from 'firebase/database';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { queryClient, reactiveModel } from '../main';
import { reaction } from 'mobx';
import { fetchSWDatabank } from '../fetch.js';

const app = initializeApp({
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
});

const db = getDatabase(app);

export default function readFirebase(path) {
	return get(ref(db, path));
}

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();

export function signInWithGooglePopup() {
	return signInWithPopup(auth, provider);
}

onAuthStateChanged(auth, async (user) => {
	if (user) {
		// User is signed in
		reactiveModel.setUser(auth.currentUser);
		readFromDB(user.uid);
		readFriendsDB(user.uid);
		await findUser(user.uid);
		if (reactiveModel.isUser !== auth.currentUser.displayName) {
			set(ref(db, '/users/' + user.uid), auth.currentUser.displayName);
		}
	} else {
		// No user is signed in
		reactiveModel.setUser(undefined);
	}
});

export function persistence(model) {
	reaction(listenACB, changeACB);
	reaction(friends, updateFriends);

	function listenACB() {
		return [model.favorites];
	}

	function changeACB() {
		writeToDB();
	}

	function friends() {
		return [reactiveModel.friends, reactiveModel.friendRequests, reactiveModel.sentRequests];
	}

	function updateFriends() {
		writeFriendsToDB();
		reactiveModel.friends.map(readFriendFavFromDB);
	}
}

function parseObjectCB(object) {
	return { id: object.id, image: object.image, name: object.name, path: object.path };
}

export function writeToDB() {
	if (model.user && model.ready) {
		model.wrote = true;
		const uid = model.user.uid.replace('"', '');
		let favToDB = model.favorites.map(parseObjectCB);
		set(ref(db, '/userData/' + uid), favToDB);
	}
}

function readFromDB(uid) {
	onValue(ref(db, '/userData/' + uid), (snapshot) => {
		model.ready = false;
		if (!model.wrote) {
			model.loadingFavs = true;
			model.setFavsFromDB(snapshot.val());
			model.loadingFavs = false;
		}
		model.wrote = false;
		model.ready = true;
	});
}

export function readFriendFavFromDB(uid) {
	onValue(ref(db, '/userData/' + uid), (snapshot) => {
		model.ready = false;
		model.setFriendsFavFromDB(snapshot.val(), uid);
		model.wrote = false;
		model.ready = true;
	});
}

function readFriendsDB(uid) {
	onValue(ref(db, '/friends/' + uid + '/addedFriends/'), (snapshot) => {
		model.ready = false;
		const friendsFromDB = snapshot.val();
		reactiveModel.setFriends(friendsFromDB);
		if (friendsFromDB && Object.keys(friendsFromDB).length !== 0) {
			reactiveModel.friends.map(findUser);
		}
		model.wrote = false;
		reactiveModel.loadingFriendsFav = false;
		model.ready = true;
	});
	onValue(ref(db, '/friends/' + uid + '/pendingFriends'), (snapshot) => {
		model.ready = false;
		const friendRequestsFromDB = snapshot.val();
		reactiveModel.setFriendRequests(friendRequestsFromDB);
		if (friendRequestsFromDB && Object.keys(friendRequestsFromDB).length !== 0) {
			reactiveModel.friendRequests.map(findUser);
		}
		model.wrote = false;
		model.ready = true;
	});
	onValue(ref(db, '/friends/' + uid + '/requests'), (snapshot) => {
		model.ready = false;
		const requestsFromDB = snapshot.val();
		reactiveModel.setRequestsFromDb(requestsFromDB);
		if (requestsFromDB && Object.keys(requestsFromDB).length !== 0) {
			reactiveModel.sentRequests.map(findUser);
		}
		model.wrote = false;
		model.ready = true;
	});
	reactiveModel.loadingFriends = false;
}

function parseFriends(friends) {
	if (!friends) return '';
	else return friends;
}

function writeFriendsToDB() {
	if (model.user && model.ready) {
		model.ready = false;
		model.wrote = true;
		if (reactiveModel.friends.length) reactiveModel.friends.map(writeAddedFriends);
		else writeAddedFriends('');
		if (reactiveModel.friendRequests.length) reactiveModel.friendRequests.map(writePendingFriends);
		else writePendingFriends('');
		if (reactiveModel.sentRequests.length) reactiveModel.sentRequests.map(writeFriendRequests);
		else writeFriendRequests('');
		model.ready = true;
	}
}

function writeAddedFriends(friend) {
	set(ref(db, '/friends/' + reactiveModel.user.uid + '/addedFriends/' + friend), true);
}

function writePendingFriends(friend) {
	set(ref(db, '/friends/' + reactiveModel.user.uid + '/pendingFriends/' + friend), true);
}

function writeFriendRequests(friend) {
	set(ref(db, '/friends/' + reactiveModel.user.uid + '/requests/' + friend), true);
}

export function addFriendDB(uid) {
	set(ref(db, '/friends/' + uid + '/addedFriends/' + reactiveModel.user.uid), true);
}

export function removeFriendDB(uid) {
	remove(ref(db, '/friends/' + uid + '/addedFriends/' + reactiveModel.user.uid));
}

export async function findUser(uid) {
	reactiveModel.gettingUser = true;
	await get(ref(db, '/users/' + uid)).then((snapshot) => {
		reactiveModel.setIsUser(snapshot.val());
		reactiveModel.addUser(uid, snapshot.val());
	});
}

export function friendRequest(uid) {
	set(ref(db, '/friends/' + uid + '/pendingFriends/' + reactiveModel.user.uid), true);
}

export function removeFriendRequest(uid) {
	remove(ref(db, '/friends/' + uid + '/pendingFriends/' + reactiveModel.user.uid));
}

export function removeRequest(uid) {
	remove(ref(db, '/friends/' + uid + '/requests/' + reactiveModel.user.uid));
}

export async function getPreview() {
	await get(ref(db, '/apiHash/')).then(async (snapshot) => {
		const chars = snapshot.val().characters;
		const vehicles = snapshot.val().vehicles;
		const locations = snapshot.val().locations;
		const data = [];
		let index = 0;
		for (let i = 0; i < 3; i++) {
			let path = 'characters/' + Object.keys(chars)[Math.floor(Math.random() * 26)];
			await fetchSWDatabank(path, {}, path);
			const { name, image } = queryClient.getQueryData(path);
			if (data.some((item) => item.name === name)) {
				i--;
				continue;
			} else {
				data[index++] = { name: name, image: image, path: 'characters' };
			}
		}
		for (let i = 0; i < 3; i++) {
			let path = 'vehicles/' + Object.keys(vehicles)[Math.floor(Math.random() * 23)];
			await fetchSWDatabank(path, {}, path);
			const { name, image } = queryClient.getQueryData(path);
			if (data.some((item) => item.name === name)) {
				i--;
				continue;
			} else {
				data[index++] = { name: name, image: image, path: 'vehicles' };
			}
		}
		for (let i = 0; i < 3; i++) {
			let path = 'locations/' + Object.keys(locations)[Math.floor(Math.random() * 23)];
			await fetchSWDatabank(path, {}, path);
			const { name, image } = queryClient.getQueryData(path);
			if (data.some((item) => item.name === name)) {
				i--;
				continue;
			} else {
				data[index++] = { name: name, image: image, path: 'locations' };
			}
		}
		reactiveModel.setCarouselData(data);
	});
}

export function readHash(location) {
	get(ref(db, '/apiHash/' + location)).then((snapshot) =>
		reactiveModel.setCurrentHash(snapshot.val(), location),
	);
}
