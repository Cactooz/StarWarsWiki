import LandingCard from '../components/LandingCard';

export default function LandingPageView(props) {
	return (
		<>
			<div className='main-title'>
				<h1>STAR WARS</h1>
				<h2>WIKI</h2>
			</div>
			<div className='cards-container landing-page'>
				<LandingCard
					text='CHARACTERS'
					image='https://lumiere-a.akamaihd.net/v1/images/Yoda-Retina_2a7ecc26.jpeg'
					linkTo='/characters'
					inAnimation={props.inAnimation}
				/>
				<LandingCard
					text='VEHICLES'
					image='https://lumiere-a.akamaihd.net/v1/images/millennium-falcon-main-tlj-a_7cf89d3a.jpeg'
					linkTo='/vehicles'
					inAnimation={props.inAnimation}
				/>
				<LandingCard
					text='LOCATIONS'
					image='https://lumiere-a.akamaihd.net/v1/images/databank_mustafar_01_169_5b470758.jpeg'
					linkTo='/locations'
					inAnimation={props.inAnimation}
				/>
			</div>
		</>
	);
}
