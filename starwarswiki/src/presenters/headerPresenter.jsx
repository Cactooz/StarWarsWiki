import items from '../data/autoCompleteList.json';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBarView from '../views/searchBarView';
import NavbarView from '../views/navbarView';
import { observer } from 'mobx-react-lite';
import HamburgerView from '../views/hamburgerView';

export default observer(function HeaderPresenter(props) {
	const navigate = useNavigate();
	const page = useLocation();

	function updateData() {
		props.model.setSearchString('');
		props.model.unSetCurrentBrowse();
	}

	function handleOnClick() {
		updateData();
		props.model.setMenuOpen(!props.model.menuOpen);
	}

	function handleOnOpen() {
		props.model.setMenuOpen(true);
	}

	function handleOnClose() {
		props.model.setMenuOpen(false);
	}

	function handleSearchSelect(item) {
		document.activeElement.blur();
		let name = item.name.replaceAll('/', '%2F').replaceAll('.', '%2E');
		props.model.unSetCurrentDetails();
		navigate('/' + item.type + '/' + name);
	}

	async function handleFormSubmit(event) {
		event.preventDefault(); //Stop page from refreshing
		document.activeElement.blur();
		navigate('/search/' + props.model.searchString);
		await props.model.setSearchResults();
	}

	function handleOnSearch(string, results) {
		props.model.setSearchString(string);
		props.model.setAutoCompleteResults(results);
	}

	return (
		<header id='header'>
			<NavbarView
				onClickHandler={updateData}
				user={props.model.user}
				inAnimation={props.model.inAnimation}
				page={page.pathname}
			/>
			<HamburgerView
				onClickHandler={updateData}
				user={props.model.user}
				handleOnOpen={handleOnOpen}
				handleOnClose={handleOnClose}
				handleOnClick={handleOnClick}
				isOpen={props.model.menuOpen}
				page={page.pathname}
			/>
			<SearchBarView
				searchString={props.model.searchString}
				handleSearchSelect={handleSearchSelect}
				handleFormSubmit={handleFormSubmit}
				handleOnSearch={handleOnSearch}
				items={items}
			/>
		</header>
	);
});
