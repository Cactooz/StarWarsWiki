import SignOutButton from '../components/SignOutButton.jsx';
import { Link } from 'react-router-dom';

export default function ProfileView(props) {
	if (props.user === undefined) {
		return (
			<>
				<h2>You are not logged in. Sign in above.</h2>
				<Link to={'/'} replace={props.inAnimation ? true : false}>
					<h2>Return to home!</h2>
				</Link>
			</>
		);
	} else {
		return (
			<>
				<SignOutButton />
				<h2>
					{props.user.displayName === undefined
						? 'Welcome to ' + props.user + "'s profile"
						: 'Hello there, ' + props.user.displayName + '!'}
				</h2>
				<h3>
					{props.user.displayName === undefined
						? props.user + "'s favorite pages"
						: 'Your favorite pages'}
				</h3>
			</>
		);
	}
}
