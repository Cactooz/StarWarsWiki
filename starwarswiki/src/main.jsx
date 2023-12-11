import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import model from './model.js';
import { configure, observable } from 'mobx';
import { connectFirebase } from './firebaseModel';

configure({ enforceActions: 'never' });
const reactiveModel = observable(model);

onAuthStateChanged(auth, (user) => {
	if (user) {
		// User is signed in
		reactiveModel.setUser(auth.currentUser);
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
		<App model={reactiveModel} />
	</QueryClientProvider>,
);

window.model = reactiveModel;
