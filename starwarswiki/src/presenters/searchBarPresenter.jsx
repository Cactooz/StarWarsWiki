import items from '../data/autoCompleteList.json';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useNavigate } from 'react-router-dom';

export default function SearchBarPresenter(props) {
	const navigate = useNavigate();

	function handleOnSelect(item) {
		navigate(item.type + '/' + item.name);
	}

	return <ReactSearchAutocomplete items={items} onSelect={handleOnSelect} />;
}
