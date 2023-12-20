import { Link } from 'react-router-dom';
import SignInButton from '../components/SignInButton.jsx';
import GoToProfile from '../components/GoToProfile.jsx';

export default function NavbarView(props) {
	function browseDataACB(event) {
		props.onClickHandler(event.target.innerText.toLowerCase());
	}

	return (
		<nav>
			<Link to='/'>
				<img
					src='../../assets/images/sww-logo.svg'
					alt='Star Wars Wiki logo of green Yoda with red christmashat'
				/>
			</Link>
			<Link to='/characters' onClick={browseDataACB}>
				<p>Characters</p>
			</Link>
			<Link to='/vehicles' onClick={browseDataACB}>
				<p>Vehicles</p>
			</Link>
			<Link to='/locations' onClick={browseDataACB}>
				<p>Locations</p>
			</Link>
			{props.user ? <GoToProfile /> : <SignInButton />}
		</nav>
	);
}
