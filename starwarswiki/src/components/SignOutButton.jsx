import {getAuth, signOut} from "firebase/auth"

export default function SignOutButton() {
	async function logOut() {
		await signOut(getAuth());

	}

	return (
		<div>
			<button onClick={logOut}>Sign Out</button>
		</div>
	)
}