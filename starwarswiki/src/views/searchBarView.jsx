import { ReactSearchAutocomplete } from 'react-search-autocomplete';

export default function SearchBarView(props) {
	return (
		<form onSubmit={props.handleFormSubmit}>
			<ReactSearchAutocomplete
				items={props.items}
				onSelect={props.handleSearchSelect}
				onSearch={props.handleOnSearch}
				styling={{
					zIndex: 2,
					backgroundColor: '#1e2023',
					border: '1px solid #ffe81f',
					borderRadius: '20px',
					color: 'white',
					hoverBackgroundColor: '#111111',
					height: '40px',
				}}
			/>
		</form>
	);
}
