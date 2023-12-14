import HeaderPresenter from '../presenters/headerPresenter';
import SearchBarPresenter from '../presenters/searchBarPresenter';
import BrowsePresenter from '../presenters/browsePresenter';

export default function BrowseLayout(props) {
	return (
		<>
			<HeaderPresenter model={props.model} />
			<SearchBarPresenter model={props.model} />
			<BrowsePresenter model={props.model} />
		</>
	);
}
