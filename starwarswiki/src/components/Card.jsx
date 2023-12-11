import {Link} from "react-router-dom";
import "../style.css"

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
		<div className="cards">
			<Link to={card.path + "/" + card.name}>
				<img src={card.image} height={'100'}></img>
				<div>{card.name}</div>
			</Link>
			{card.fav.find(findFavCB) ? <button onClick={removeACB}>Remove Favorite</button> :
				<button onClick={addACB}>Add Favorite</button>}
		</div>

	);
}