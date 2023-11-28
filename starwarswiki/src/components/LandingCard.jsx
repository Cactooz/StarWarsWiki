import '/src/style.css';

export default function LandingCard(props) {
	return (
		<div className={`landing-card ${props.class}`} onClick={props.onClickACB}>
			<p>{props.text}</p>
		</div>
	);
}
