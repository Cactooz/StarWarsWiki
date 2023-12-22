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
		reactiveModel.friends.forEach(readFriendFavFromDB);
	}
}

function parseObjectCB(object) {
	return { id: object.id, image: object.image, name: object.name, path: object.path };
}

export function writeToDB() {
	if (reactiveModel.user && reactiveModel.ready) {
		reactiveModel.wrote = true;
		const uid = reactiveModel.user.uid.replace('"', '');
		let favToDB = reactiveModel.favorites.map(parseObjectCB);
		set(ref(db, '/userData/' + uid), favToDB);
	}
}

function readFromDB(uid) {
	onValue(ref(db, '/userData/' + uid), (snapshot) => {
		reactiveModel.ready = false;
		if (!reactiveModel.wrote) {
			reactiveModel.loadingFavs = true;
			reactiveModel.setFavsFromDB(snapshot.val());
			reactiveModel.loadingFavs = false;
		}
		reactiveModel.wrote = false;
		reactiveModel.ready = true;
	});
}

export function readFriendFavFromDB(uid) {
	onValue(ref(db, '/userData/' + uid), (snapshot) => {
		reactiveModel.ready = false;
		reactiveModel.setFriendsFavFromDB(snapshot.val(), uid);
		reactiveModel.wrote = false;
		reactiveModel.ready = true;
	});
}

function readFriendsDB(uid) {
	onValue(ref(db, '/friends/' + uid + '/addedFriends/'), (snapshot) => {
		reactiveModel.ready = false;
		const friendsFromDB = snapshot.val();
		reactiveModel.setFriends(friendsFromDB);
		if (friendsFromDB && Object.keys(friendsFromDB).length !== 0) {
			reactiveModel.friends.forEach(findUser);
		}
		reactiveModel.wrote = false;
		reactiveModel.loadingFriendsFav = false;
		reactiveModel.ready = true;
	});
	onValue(ref(db, '/friends/' + uid + '/pendingFriends'), (snapshot) => {
		reactiveModel.ready = false;
		const friendRequestsFromDB = snapshot.val();
		reactiveModel.setFriendRequests(friendRequestsFromDB);
		if (friendRequestsFromDB && Object.keys(friendRequestsFromDB).length !== 0) {
			reactiveModel.friendRequests.forEach(findUser);
		}
		reactiveModel.wrote = false;
		reactiveModel.ready = true;
	});
	onValue(ref(db, '/friends/' + uid + '/requests'), (snapshot) => {
		reactiveModel.ready = false;
		const requestsFromDB = snapshot.val();
		reactiveModel.setRequestsFromDb(requestsFromDB);
		if (requestsFromDB && Object.keys(requestsFromDB).length !== 0) {
			reactiveModel.sentRequests.forEach(findUser);
		}
		reactiveModel.wrote = false;
		reactiveModel.ready = true;
	});
	reactiveModel.loadingFriends = false;
}

function writeFriendsToDB() {
	if (reactiveModel.user && reactiveModel.ready) {
		reactiveModel.ready = false;
		reactiveModel.wrote = true;
		if (reactiveModel.friends.length) reactiveModel.friends.forEach(writeAddedFriends);
		else writeAddedFriends('');
		if (reactiveModel.friendRequests.length)
			reactiveModel.friendRequests.forEach(writePendingFriends);
		else writePendingFriends('');
		if (reactiveModel.sentRequests.length) reactiveModel.sentRequests.forEach(writeFriendRequests);
		else writeFriendRequests('');
		reactiveModel.ready = true;
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
