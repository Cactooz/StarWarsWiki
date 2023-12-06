import HeaderView from '../views/headerView';

export default function HeaderPresenter(props) {
	return <HeaderView onClickHandler={props.model.setBrowseResult} />;
}
