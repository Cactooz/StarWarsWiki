import HeaderView from '../views/headerView';

export default function HeaderPresenter(props) {

	function updateData(param) {
		props.model.unSetCurrentBrowse();
	}

	return <HeaderView onClickHandler={updateData}/>;
}
