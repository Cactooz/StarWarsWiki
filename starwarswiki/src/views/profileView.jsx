import SignOutButton from '../components/SignOutButton.jsx';
import { Link } from 'react-router-dom';

export default function ProfileView(props) {
	if (props.user === undefined) {
		return (
			<>
				<h2>You are not logged in. Sign in above.</h2>
				<Link to={'/'}>
					<h2>Return to home!</h2>
				</Link>
			</>
		);
	} else {
		return (
			<>
				<SignOutButton />
				<h2>Hello there, {props.name}!</h2>
				<h3>These are your favorite pages</h3>
			</>
		);
	}
}
