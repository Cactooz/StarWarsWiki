import LandingPageView from '../views/landingPageView';
import { observer } from 'mobx-react-lite';

export default observer(function LandingPagePresenter(props) {
	window.scrollTo(0, 0)
	return <LandingPageView inAnimation={props.model.inAnimation} />;
});
