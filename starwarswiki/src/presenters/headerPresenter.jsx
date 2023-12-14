import items from '../data/autoCompleteList.json';
import { useNavigate } from 'react-router-dom';
import SearchBarView from '../views/searchBarView';
import NavbarView from '../views/navbarView';

export default function HeaderPresenter(props) {
	const navigate = useNavigate();

	function handleSearchSelect(item) {
		let name = item.name.replaceAll('/', '%2F').replaceAll('.', '%2E');
		navigate('/' + item.type + '/' + name);
	}

	async function handleFormSubmit(event) {
		event.preventDefault(); //Stop page from refreshing
		navigate('/search');
		await props.model.setSearchResults();
	}

	function handleOnSearch(string, results) {
		props.model.setAutoCompleteResults(results);
	}

	function updateData() {
		props.model.unSetCurrentBrowse();
	}

	return (
		<header>
			<NavbarView onClickHandler={updateData} user={props.model.user} />
			<SearchBarView
				handleSearchSelect={handleSearchSelect}
				handleFormSubmit={handleFormSubmit}
				handleOnSearch={handleOnSearch}
				items={items}
			/>
		</header>
	);
}
