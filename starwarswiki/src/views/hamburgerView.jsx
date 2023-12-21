import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../../assets/images/sww-logo.svg';

import '../style/burgermenu.scss';

export default function HamburgerView() {
	const [menuOpen, setMenuOpen] = useState(false);

	function handleOnClick() {
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
		</Menu>
	);
}
