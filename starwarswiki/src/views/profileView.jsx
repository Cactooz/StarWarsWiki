import SignOutButton from '../components/SignOutButton.jsx';
import { Link } from 'react-router-dom';

export default function ProfileView(props) {
	if (props.user === undefined) {
		return (
			<section className='profile-title'>
				<h2>You are not logged in. Sign in above.</h2>
				<Link to={'/'} replace={props.inAnimation ? true : false}>
					<h2>Return to home!</h2>
				</Link>
			</section>
		);
	} else {
		return (
			<section className='profile-title'>
				<SignOutButton />
				<h2>
					{props.user.displayName === undefined
						? 'Welcome to ' + props.user + "'s profile"
						: 'Hello there, ' + props.user.displayName + '!'}
				</h2>
			</section>
		);
	}
}
