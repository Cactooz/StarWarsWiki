import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {QueryClient, QueryClientProvider} from 'react-query';
import model from './model.js';
import {configure, observable} from 'mobx';
import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup} from "firebase/auth";

const app = initializeApp({
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
});
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account "
});
export const auth = getAuth();

export function signInWithGooglePopup() {
	return signInWithPopup(auth, provider);
}

configure({enforceActions: 'never'});
const reactiveModel = observable(model);

onAuthStateChanged(auth, (user) => {
	if (user) {
		// User is signed in
		reactiveModel.setUser(user.uid);
		console.log('User is authorized:', user.uid);
	} else {
		// No user is signed in
		reactiveModel.setUser(undefined);
		console.log('User is not authorized');
	}
});
export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnmount: false,
			refetchOnReconnect: false,
			retry: false,
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<App model={reactiveModel}/>
	</QueryClientProvider>,
);

window.model = reactiveModel;
