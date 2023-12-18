import { Link } from 'react-router-dom';

export default function LandingCard(props) {
	return (
		<div className='loading-card'>
			<Link to={props.linkTo}>
				<img src={props.image} />
				<p>{props.text}</p>
			</Link>
		</div>
	);
}
