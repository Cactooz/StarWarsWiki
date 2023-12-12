import items from '../data/autoCompleteList.json';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useNavigate } from 'react-router-dom';
import SearchBarView from '../views/searchBarView';
import { useState } from 'react';

export default function SearchBarPresenter(props) {
	const navigate = useNavigate();
	const [results, setResults] = useState([]);

	function handleSearchSelect(item) {
		let name = item.name.replaceAll('/', '%2F').replaceAll('.', '%2E');
		navigate(item.type + '/' + name);
	}

	function handleFormSubmit(event) {
		event.preventDefault();
		if (results.length !== 0) {
			let item = results[0];
			let name = item.name.replaceAll('/', '%2F').replaceAll('.', '%2E');
			navigate(item.type + '/' + name);
		}
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
