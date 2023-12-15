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
		<div className='cards'>
			<Link to={card.path + '/' + card.name.replaceAll('/', '%2F')}>
				<img src={card.image} height={'100'}></img>
				<div>{card.name}</div>
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
