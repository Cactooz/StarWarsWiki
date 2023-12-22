import { Link } from 'react-router-dom';

export default function LandingCard(props) {
	return (
		<div>
			<Link to={props.linkTo} replace={props.inAnimation ? true : false}>
				<img src={props.image} alt={props.altText} />
				<p>{props.text}</p>
			</Link>
		</div>
	);
}
