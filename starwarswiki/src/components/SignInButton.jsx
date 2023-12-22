import { signInWithGooglePopup } from '../models/firebaseModel.js';

export default function SignInButton() {
	async function logInGoogle() {
		await signInWithGooglePopup();
	}

	return <a onClick={logInGoogle}>Sign in</a>;
}
