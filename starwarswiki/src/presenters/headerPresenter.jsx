import HeaderView from '../views/headerView';

export default function HeaderPresenter(props) {
	return <HeaderView onClickHanlder={props.model.setBrowseResult} />;
}
