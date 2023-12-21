import LandingPageView from '../views/landingPageView';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

export default observer(function LandingPagePresenter(props) {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return <LandingPageView inAnimation={props.model.inAnimation} />;
});
