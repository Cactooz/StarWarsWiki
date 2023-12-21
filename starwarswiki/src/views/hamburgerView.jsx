import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/sww-logo.svg';
import SignInButton from '../components/SignInButton.jsx';
import GoToProfile from '../components/GoToProfile.jsx';

import '../style/burgermenu.scss';

export default function HamburgerView(props) {
	function isMenuOpen(state) {
		return state.isOpen;
	}

	return (
		<div className='burger-navbar'>
			<Link to='/'>
				<img src={Logo} alt='Star Wars Wiki logo of green Yoda with red Christmas hat' />
			</Link>
			<Menu
				isOpen={props.isOpen}
				onOpen={props.handleOnOpen}
				onClose={props.handleOnClose}
				onStateChange={isMenuOpen}
				right
			>
				<Link to='/characters' onClick={props.handleOnClick}>
					Characters
				</Link>
				<Link to='/vehicles' onClick={props.handleOnClick}>
					Vehicles
				</Link>
				<Link to='/locations' onClick={props.handleOnClick}>
					Locations
				</Link>
				{props.user ? (
					<GoToProfile inAnimation={props.inAnimation} onClickHandler={props.handleOnClick} />
				) : (
					<SignInButton />
				)}
			</Menu>
		</div>
	);
}
