import { Link } from 'react-router-dom';
import SignInButton from '../components/SignInButton.jsx';
import GoToProfile from '../components/GoToProfile.jsx';
import Logo from '../../assets/images/sww-logo.svg';

export default function NavbarView(props) {
	function browseDataACB(event) {
		props.onClickHandler(event.target.innerText.toLowerCase());
	}

	return (
		<nav id='nav'>
			{props.page === '/' ? (
				<span>
					<img
						src={Logo}
						alt='Star Wars Wiki logo of green Yoda with red Christmas hat'
						className='active'
					/>
				</span>
			) : (
				<Link to='/' replace={props.inAnimation}>
					<img src={Logo} alt='Star Wars Wiki logo of green Yoda with red Christmas hat' />
				</Link>
			)}
			{props.page === '/characters' ? (
				<p className='active'>Characters</p>
			) : (
				<Link to='/characters' replace={props.inAnimation} onClick={browseDataACB}>
					Characters
				</Link>
			)}
			{props.page === '/vehicles' ? (
				<p className='active'>Vehicles</p>
			) : (
				<Link to='/vehicles' replace={props.inAnimation} onClick={browseDataACB}>
					Vehicles
				</Link>
			)}
			{props.page === '/locations' ? (
				<p className='active'>Locations</p>
			) : (
				<Link to='/locations' replace={props.inAnimation} onClick={browseDataACB}>
					Locations
				</Link>
			)}
			{props.user ? (
				<GoToProfile inAnimation={props.inAnimation} page={props.page} />
			) : (
				<SignInButton />
			)}
		</nav>
	);
}
