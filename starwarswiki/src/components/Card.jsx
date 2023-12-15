import { Link } from 'react-router-dom';

export default function (card) {
	function removeACB() {
		card.removeFavorite(card);
	}

	function addACB() {
		card.addFavorite(card);
	}

	function findFavCB(item) {
		return item.name === card.name;
	}

	return (
		<div>
			<Link to={card.path + '/' + card.name.replaceAll('/', '%2F')}>
				<img src={card.image}></img>
				<p>{card.name}</p>
			</Link>
			{card.auth ? (
				card.fav.find(findFavCB) ? (
					<button onClick={removeACB}>Remove Favorite</button>
				) : (
					<button onClick={addACB}>Add Favorite</button>
				)
			) : (
				''
			)}
		</div>
	);
}
