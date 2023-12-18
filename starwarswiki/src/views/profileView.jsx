import SignOutButton from '../components/SignOutButton.jsx';

export default function ProfileView(props) {
	return (
		<>
			<SignOutButton />
			<h2>Hello there, {props.name}!</h2>
		</>
	);
}
