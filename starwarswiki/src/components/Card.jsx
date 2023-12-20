import { Link } from 'react-router-dom';
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

	return (
		<div className='browse-card'>
			<Link to={card.path + '/' + card.name.replaceAll('/', '%2F')} replace={true}>
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
