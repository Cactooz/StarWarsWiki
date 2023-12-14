import { initializeApp } from 'firebase/app';
import { get, getDatabase, onValue, ref, set } from 'firebase/database';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { reactiveModel } from '../main';

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
			set(ref(db, '/users/' + user.uid), true)
		}
	} else {
		// No user is signed in
		reactiveModel.setUser(undefined);
	}
});

function parseObjectCB(object) {
	return { name: object.name, id: object.id, image: object.image, path: object.path };
}

export function writeToDB() {
	if (model.user) {
		const uid = reactiveModel.user.uid.replace('"', '');
		let favToDB = reactiveModel.favorites.map(parseObjectCB);
		set(ref(db, '/userData/' + uid), favToDB);
	}
}

function readFromDB(uid) {
	return onValue(ref(db, '/userData/' + uid), (snapshot) => {
		const favoritesFromDB = snapshot.val();
		reactiveModel.setFavsFromDB(favoritesFromDB);
	});
}

function readFriendsDB(uid) {
	return onValue(ref(db, '/friends/' + uid), (snapshot) => {
		const friendsFromDB = snapshot.val();
		let pendingFriends = friendsFromDB?.pendingFriends;
		let friends = friendsFromDB?.friends;
		if (pendingFriends) {
			reactiveModel.setFriendRequests(pendingFriends)
		}
		if (friends) {
			reactiveModel.setFriends(friends);
		}
	});
}

export function addFriendDB(uid) {
	set(ref(db, '/friends/' + uid + '/friends/' + reactiveModel.user.uid), true)
}

export async function findUser(uid) {
	await get(ref(db, '/users/' + uid)).then((snapshot) => {
		reactiveModel.setIsUser(snapshot.val())
	})
}

export function friendRequest(uid) {
	set(ref(db, '/friends/' + uid + '/pendingFriends'), reactiveModel.user.uid)
}

export function readHash(location) {
	get(ref(db, '/apiHash/' + location)).then((snapshot) =>
		reactiveModel.setCurrentHash(snapshot.val(), location),
	);
}
