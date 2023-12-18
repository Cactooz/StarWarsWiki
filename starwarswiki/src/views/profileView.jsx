import SignOutButton from '../components/SignOutButton.jsx';

export default function ProfileView(props) {
	return (
		<>
			<SignOutButton />
			<h2 >{props.currentUser.displayName === undefined ? "Welcome to " + props.currentUser + "s Profile" : "Hello There " + props.currentUser.displayName + "!"}</h2 >
			<img src={props.currentUser.photoURL} />
			<div >
				<h3 >{props.currentUser.displayName === undefined ? "These are " + props.currentUser + "s Favorites" : "These Are Your Favorites!"}</h3 >
			</div >
		</>
	);
}
