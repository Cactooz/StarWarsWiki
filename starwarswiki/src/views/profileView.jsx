import SignOutButton from '../components/SignOutButton.jsx';

export default function ProfileView(props) {
	return (
		<>
			<SignOutButton />
			<h2>Hello There {props.currentUser.displayName}!</h2>
			<img src={props.currentUser.photoURL} />
			<div>
				<h3>These Are Your Favorites!</h3>
			</div>
		</>
	);
}
