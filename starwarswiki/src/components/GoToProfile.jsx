import { Link } from 'react-router-dom';

export default function GoToProfile(props) {
	return (
		<Link to={'/profile'} replace={props.inAnimation ? true : false}>
			<p>Profile</p>
		</Link>
	);
}
