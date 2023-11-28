import { Link } from 'react-router-dom';
import '/src/style.css';

export default function LandingCard(props) {
	return (
		<div className='router-link'>
			<Link to={props.linkTo} className='no-text-decoration'>
				<div className={`landing-card ${props.class} noDecoration`}>
					<p>{props.text}</p>
				</div>
			</Link>
		</div>
	);
}
