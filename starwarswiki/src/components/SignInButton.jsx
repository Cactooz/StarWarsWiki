import { signInWithGooglePopup } from '../models/firebaseModel.js';

export default function SignInButton() {
	async function logInGoogle() {
		const response = await signInWithGooglePopup();
	}

	return (
		<div>
			<button onClick={logInGoogle}>Sign in here</button>
		</div>
	);
}
