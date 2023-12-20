import { Link } from 'react-router-dom';
import SignInButton from '../components/SignInButton.jsx';
import GoToProfile from '../components/GoToProfile.jsx';
import Logo from '../../assets/images/sww-logo.svg';

export default function NavbarView(props) {
	function browseDataACB(event) {
		props.onClickHandler(event.target.innerText.toLowerCase());
	}

	return (
		<nav>
			<Link to='/'>
				<img src={Logo} alt='Star Wars Wiki logo of green Yoda with red Christmas hat' />
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
