import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, onValue } from 'firebase/database';
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

onAuthStateChanged(auth, (user) => {
	if (user) {
		// User is signed in
		reactiveModel.setUser(auth.currentUser);
		readFromDB(user.uid);
	} else {
		// No user is signed in
		reactiveModel.setUser(undefined);
	}
});

export function persistence(model) {
	reaction(listenACB, changeACB);
	function listenACB() {
		return [model.favorites];
	}
	function changeACB() {
		writeToDB();
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

export function readHash(location) {
	get(ref(db, '/apiHash/' + location)).then((snapshot) =>
		reactiveModel.setCurrentHash(snapshot.val(), location),
	);
}
