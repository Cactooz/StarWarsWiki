import { signInWithGooglePopup } from '../models/firebaseModel.js';

export default function SignInButton() {
	async function logInGoogle() {
		const response = await signInWithGooglePopup();
	}

	return <a onClick={logInGoogle}>Sign in</a>;
}
