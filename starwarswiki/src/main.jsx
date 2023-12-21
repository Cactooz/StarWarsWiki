import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import model from './models/model.js';
import { configure, observable } from 'mobx';
import { persistence } from './models/firebaseModel';
import StarrySky from './components/StarrySky.jsx';

import './style/style.scss';

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
	<>
		<StarrySky />
		<QueryClientProvider client={queryClient}>
			<App model={reactiveModel} />
		</QueryClientProvider>
	</>,
);

persistence(reactiveModel);

window.model = reactiveModel;
