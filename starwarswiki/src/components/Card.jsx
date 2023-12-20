import { Link, useLocation } from 'react-router-dom';
import AddStar from '../components/AddStar';
import RemoveStar from '../components/RemoveStar';

export default function (card) {
	function removeACB() {
		card.removeFavorite(card);
	}

	function addACB() {
		card.addFavorite(card);
	}

	function messageACB() {
		card.signInMessage();
	}

	function findFavCB(item) {
		return item.name === card.name;
	}
	let linkTo = card.path + '/' + card.name.replaceAll('/', '%2F');
	return (
		<div className='browse-card'>
			<Link to={linkTo} replace={window.location.pathname === linkTo ? true : false}>
				<img src={card.image} />
				<p>{card.name}</p>
			</Link>
			{card.auth ? (
				card.fav.find(findFavCB) ? (
					<button onClick={removeACB}>
						<RemoveStar />
					</button>
				) : (
					<button onClick={addACB}>
						<AddStar />
					</button>
				)
			) : (
				<>
					<button onClick={messageACB}>
						<AddStar />
					</button>
				</>
			)}
		</div>
	);
}
