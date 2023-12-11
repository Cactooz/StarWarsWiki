import Card from "../components/Card.jsx";

export default function browseView(props) {

	function removeACB(card) {
		props.doRemove(card);
	}

	function addACB(card) {
		props.doAdd(card);
	}

	return (
		<div>
			{props.browseResult.map(showAllCB)}
		</div>
	);

	function showAllCB(card) {
		return (
			<Card key={card._id} name={card.name} image={card.image} removeFavorite={removeACB} addFavorite={addACB}
			      fav={props.fav}/>
		);
	}
}

