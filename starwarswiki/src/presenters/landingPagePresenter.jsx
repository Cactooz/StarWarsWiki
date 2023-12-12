//Use window.location = "/characters"

import LandingPageView from '../views/landingPageView';
import { observer } from 'mobx-react-lite';

export default observer(function LandingPagePresenter(props) {
	return <LandingPageView user={props.model.user} model={props.model} />;
});
