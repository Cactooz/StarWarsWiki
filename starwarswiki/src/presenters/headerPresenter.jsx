import HeaderView from '../views/headerView';
import {observer} from "mobx-react-lite";

export default observer(function HeaderPresenter(props) {

	function updateData(param) {
		props.model.unSetCurrentBrowse();
	}

	return <HeaderView onClickHandler={updateData} user={props.model.user}/>;
});
