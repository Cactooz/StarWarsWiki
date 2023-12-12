import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import model from './models/model.js';
import { configure, observable } from 'mobx';
//import { connectFirebase } from './models/firebaseModel';

configure({ enforceActions: 'never' });
export const reactiveModel = observable(model);

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
