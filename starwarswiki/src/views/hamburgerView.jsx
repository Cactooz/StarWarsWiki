import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../../assets/images/sww-logo.svg';
import SignInButton from '../components/SignInButton.jsx';
import GoToProfile from '../components/GoToProfile.jsx';

import '../style/burgermenu.scss';

export default function HamburgerView(props) {
	const [menuOpen, setMenuOpen] = useState(false);

	function handleOnClick(event) {
		props.onClickHandler(event.target.innerText.toLowerCase());
		setMenuOpen(!menuOpen);
	}

	function handleOnOpen() {
		setMenuOpen(true);
	}

	function handleOnClose() {
		setMenuOpen(false);
	}

	function isMenuOpen(state) {
		return state.isOpen;
	}

	return (
		<Menu
			isOpen={menuOpen}
			onOpen={handleOnOpen}
			onClose={handleOnClose}
			onStateChange={isMenuOpen}
			right
		>
			<Link to='/' onClick={handleOnClick}>
				<img src={Logo} alt='Star Wars Wiki logo of green Yoda with red Christmas hat' />
			</Link>
			<Link to='/characters' onClick={handleOnClick}>
				Characters
			</Link>
			<Link to='/vehicles' onClick={handleOnClick}>
				Vehicles
			</Link>
			<Link to='/locations' onClick={handleOnClick}>
				Locations
			</Link>
			{props.user ? <GoToProfile inAnimation={props.inAnimation} /> : <SignInButton />}
		</Menu>
	);
}
