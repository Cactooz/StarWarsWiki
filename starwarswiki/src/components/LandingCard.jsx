import { Link } from 'react-router-dom';
import '/src/style.css';

export default function LandingCard(props) {
	return (
		<Link to={props.linkTo}>
			<p>{props.text}</p>
			<img src={props.image} />
		</Link>
	);
}
