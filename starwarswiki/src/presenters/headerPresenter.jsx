import HeaderView from '../views/headerView';

export default function HeaderPresenter(props) {

	function updateData(param) {
		props.model.setBrowseResult(param)
	}

	return <HeaderView onClickHandler={updateData}/>;
}
