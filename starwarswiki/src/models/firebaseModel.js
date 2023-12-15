import { initializeApp } from 'firebase/app';
import { get, getDatabase, onValue, ref, remove, set } from 'firebase/database';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { reactiveModel } from '../main';
import { reaction } from 'mobx';

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
		readFriendsDB(user.uid)
		await findUser(user.uid);
		if (!reactiveModel.isUser === true) {
			set(ref(db, '/users/' + user.uid), auth.currentUser.displayName)
		}
	} else {
		// No user is signed in
		reactiveModel.setUser(undefined);
	}
});

export function persistence(model) {
	reaction(listenACB, changeACB);
	reaction(friends, updateFriends)

	function listenACB() {
		return [model.favorites];
	}

	function changeACB() {
		writeToDB();
	}

	function friends() {
		return [reactiveModel.friends, reactiveModel.friendRequests, reactiveModel.sentRequests]
	}

	function updateFriends() {
		writeFriendsToDB()
		reactiveModel.friends.map(readFriendFavFromDB)
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
		if (!model.wrote) model.setFavsFromDB(snapshot.val());
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
		if (!model.ready)
			return;
		model.ready = false
		const friendsFromDB = snapshot.val();
		if (!model.wrote) {
			reactiveModel.setFriends(friendsFromDB);
		}
		model.wrote = false;
		model.ready = true;
	});
	onValue(ref(db, '/friends/' + uid + '/pendingFriends'), (snapshot) => {
		if (!model.ready)
			return;
		model.ready = false
		const friendRequestsFromDB = snapshot.val();
		if (!model.wrote)
			reactiveModel.setFriendRequests(friendRequestsFromDB)
		model.wrote = false;
		model.ready = true;
	});
	onValue(ref(db, '/friends/' + uid + '/requests'), (snapshot) => {
		if (!model.ready)
			return;
		model.ready = false
		const requestsFromDB = snapshot.val();
		if (!model.wrote) {
			reactiveModel.setRequestsFromDb(requestsFromDB)
		}
		model.wrote = false;
		model.ready = true;
	});
}

function parseFriends(friends) {
	if (!friends)
		return ""
	else
		return friends
}

function writeFriendsToDB() {
	if (model.user && model.ready) {
		model.ready = false;
		model.wrote = true;
		set(ref(db, '/friends/' + reactiveModel.user.uid + '/addedFriends/' + reactiveModel.friends.map(parseFriends)), true)
		set(ref(db, '/friends/' + reactiveModel.user.uid + '/pendingFriends/' + reactiveModel.friendRequests.map(parseFriends)), true)
		set(ref(db, '/friends/' + reactiveModel.user.uid + '/requests/' + reactiveModel.sentRequests.map(parseFriends)), true)
		model.ready = true;
	}
}

export function addFriendDB(uid) {
	set(ref(db, '/friends/' + uid + '/addedFriends/' + reactiveModel.user.uid), true)
}

export function removeFriendDB(uid) {
	remove(ref(db, '/friends/' + uid + '/addedFriends/' + reactiveModel.user.uid))
}

export async function findUser(uid) {
	await get(ref(db, '/users/' + uid)).then((snapshot) => {
		reactiveModel.setIsUser(snapshot.val())
	})
}

export function friendRequest(uid) {
	set(ref(db, '/friends/' + uid + '/pendingFriends/' + reactiveModel.user.uid), true)
}

export function removeFriendRequest(uid) {
	remove(ref(db, '/friends/' + uid + '/pendingFriends/' + reactiveModel.user.uid))
}

export function removeRequest(uid) {
	remove(ref(db, '/friends/' + uid + '/requests/' + reactiveModel.user.uid))
}

export function readHash(location) {
	get(ref(db, '/apiHash/' + location)).then((snapshot) =>
		reactiveModel.setCurrentHash(snapshot.val(), location),
	);
}
