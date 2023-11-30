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
			<div className='landing-cards'>
				<div className='child'>
					<LandingCard
						text='CHARACTERS'
						image='https://upload.wikimedia.org/wikipedia/en/4/45/Star_Wars_cast.jpg'
						linkTo='/characters'
					/>
				</div>
				<div className='child'>
					<LandingCard
						text='VEHICLES'
						image='https://lumiere-a.akamaihd.net/v1/images/millennium-falcon-main-tlj-a_7cf89d3a.jpeg'
						linkTo='/vehicles'
					/>
				</div>
				<div className='child'>
					<LandingCard
						text='LOCATIONS'
						image='https://lumiere-a.akamaihd.net/v1/images/databank_mustafar_01_169_5b470758.jpeg'
						linkTo='/locations'
					/>
				</div>
			</div>
		</div>
	);
}
