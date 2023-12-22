import { Link } from 'react-router-dom';

export default function GoToProfile(props) {
	if (props.page === '/profile') return <p className='active'>Profile</p>;
	else
		return (
			<Link
				to={'/profile'}
				replace={props.inAnimation}
				onClick={props.onClickHandler ? props.onClickHandler : () => {}}
			>
				Profile
			</Link>
		);
}
