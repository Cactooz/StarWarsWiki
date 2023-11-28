import '/src/style.css';

import LandingCard from '../components/LandingCard';

export default function LandingPageView() {
	function onClickCardACB(event) {
		//Fire custom event to change route
		console.log(event);
	}

	return (
		<div>
			<h1>STAR WARS WIKI</h1>
			<LandingCard text='Characters' class='characters-landing-card' onClickACB={onClickCardACB} />
			<LandingCard text='Vehicles' class='vehicles-landing-card' onClickACB={onClickCardACB} />
			<LandingCard text='Planets' class='planets-landing-card' onClickACB={onClickCardACB} />
		</div>
	);
}
