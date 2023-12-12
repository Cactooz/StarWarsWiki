import { ReactSearchAutocomplete } from 'react-search-autocomplete';

export default function SearchBarView(props) {
	return (
		<form onSubmit={props.handleFormSelect}>
			<ReactSearchAutocomplete
				items={props.items}
				onSelect={props.handleSearchSelect}
				onSearch={props.handleOnSearch}
			/>
		</form>
	);
}
