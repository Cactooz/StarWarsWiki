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
			<Link to='/' replace={props.inAnimation ? true : false}>
				<img src={Logo} alt='Star Wars Wiki logo of green Yoda with red Christmas hat' />
			</Link>
			<Link to='/characters' replace={props.inAnimation ? true : false} onClick={browseDataACB}>
				<p>Characters</p>
			</Link>
			<Link to='/vehicles' replace={props.inAnimation ? true : false} onClick={browseDataACB}>
				<p>Vehicles</p>
			</Link>
			<Link to='/locations' replace={props.inAnimation ? true : false} onClick={browseDataACB}>
				<p>Locations</p>
			</Link>
			{props.user ? <GoToProfile /> : <SignInButton />}
		</nav>
	);
}
