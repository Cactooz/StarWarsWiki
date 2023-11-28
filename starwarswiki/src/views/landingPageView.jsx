import '/src/style.css';

import LandingCard from '../components/LandingCard';
import { Link } from 'react-router-dom';

export default function LandingPageView(props) {
	function onClickCardACB(event) {
		//Fire custom event to change route
		console.log(event.target.children[0].innerText);
	}

	return (
		<div>
			<h1>STAR WARS WIKI</h1>
			<LandingCard text='Characters' class='characters-landing-card' linkTo='/characters' />
			<LandingCard text='Vehicles' class='vehicles-landing-card' linkTo='/vehicles' />
			<LandingCard text='Planets' class='planets-landing-card' linkTo='/planets' />
		</div>
	);
}
