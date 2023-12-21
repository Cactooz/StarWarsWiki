import items from '../data/autoCompleteList.json';
import { useNavigate } from 'react-router-dom';
import SearchBarView from '../views/searchBarView';
import NavbarView from '../views/navbarView';
import { observer } from 'mobx-react-lite';
import HamburgerView from '../views/hamburgerView';
import { useState } from 'react';

export default observer(function HeaderPresenter(props) {
	const navigate = useNavigate();

	function updateData() {
		props.model.unSetCurrentBrowse();
	}
	function handleOnClick(event) {
		updateData(event.target.innerText.toLowerCase());
		props.model.setMenuOpen(!props.model.menuOpen);
	}

	function handleOnOpen() {
		props.model.setMenuOpen(true);
	}

	function handleOnClose() {
		props.model.setMenuOpen(false);
	}

	function handleSearchSelect(item) {
		let name = item.name.replaceAll('/', '%2F').replaceAll('.', '%2E');
		props.model.unSetCurrentDetails();
		navigate('/' + item.type + '/' + name);
	}

	async function handleFormSubmit(event) {
		event.preventDefault(); //Stop page from refreshing
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
			/>
			<HamburgerView
				onClickHandler={updateData}
				user={props.model.user}
				handleOnOpen={handleOnOpen}
				handleOnClose={handleOnClose}
				handleOnClick={handleOnClick}
				isOpen={props.model.menuOpen}
			/>
			<SearchBarView
				handleSearchSelect={handleSearchSelect}
				handleFormSubmit={handleFormSubmit}
				handleOnSearch={handleOnSearch}
				items={items}
			/>
		</header>
	);
});
