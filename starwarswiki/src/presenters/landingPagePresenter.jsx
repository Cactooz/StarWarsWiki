//Use window.location = "/characters"

import { useLinkClickHandler } from 'react-router-dom';
import LandingPageView from '../views/landingPageView';

export default function LandingPagePresenter(props) {
	return <LandingPageView />;
}
