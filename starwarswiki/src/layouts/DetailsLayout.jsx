import HeaderPresenter from '../presenters/headerPresenter';
import SearchBarPresenter from '../presenters/searchBarPresenter';
import DetailsPresenter from '../presenters/detailsPresenter';
import MoreDetailsPresenter from '../presenters/moreDetailsPresenter';

export default function DetailsLayout(props) {
	return (
		<>
			<HeaderPresenter model={props.model} />
			<SearchBarPresenter model={props.model} />
			<DetailsPresenter model={props.model} />
			<MoreDetailsPresenter model={props.model} />
		</>
	);
}
