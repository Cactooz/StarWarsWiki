import SignOutButton from '../components/SignOutButton.jsx';
import { Link } from 'react-router-dom';

export default function ProfileView(props) {
	if (props.user === undefined) {
		return (
			<>
				<h2 >You are not logged in. Sign in above.</h2 >
				<Link to={'/'} >
					<h2 >Return to home!</h2 >
				</Link >
			</>
		);
	} else {
		return (
			<>
				<SignOutButton />
				<h2 >{props.currentUser.displayName === undefined ? "Welcome to " + props.currentUser + "s Profile" : "Hello There " + props.currentUser.displayName + "!"}</h2 >
				<h3 >{props.currentUser.displayName === undefined ? "These are " + props.currentUser + "s Favorites" : "These Are Your Favorites!"}</h3 >
			</>
		);
	}
}
