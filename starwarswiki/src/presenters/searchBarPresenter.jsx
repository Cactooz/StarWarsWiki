import items from '../data/autoCompleteList.json';
import { useNavigate } from 'react-router-dom';
import SearchBarView from '../views/searchBarView';
import { useState } from 'react';

export default function SearchBarPresenter(props) {
	const navigate = useNavigate();
	const [results, setResults] = useState([]);

	function handleSearchSelect(item) {
		let name = item.name.replaceAll('/', '%2F').replaceAll('.', '%2E');
		navigate('/' + item.type + '/' + name);
	}

	async function handleFormSubmit(event) {
		event.preventDefault(); //Stop page from refreshing
		navigate('/search');
		await props.model.setSearchResults(results);
	}

	function handleOnSearch(string, results) {
		setResults(results);
	}

	return (
		<SearchBarView
			handleSearchSelect={handleSearchSelect}
			handleFormSubmit={handleFormSubmit}
			handleOnSearch={handleOnSearch}
			items={items}
		/>
	);
}
