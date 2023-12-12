import Card from '../components/Card.jsx';

export default function browseView(props) {
	function removeACB(card) {
		props.doRemove(card);
	}

    function addACB(card) {
        props.doAdd(card);
    }

	return <>{props.browseResult.map(showAllCB)}</>;

	function showAllCB(card) {
		return (
			<Card
				key={card._id ? card._id : card.id}
				path={
					window.location.pathname === '/profile' || window.location.pathname === '/search'
						? card.path
						: window.location.pathname
				}
				id={card._id}
				name={card.name}
				image={card.image}
				removeFavorite={removeACB}
				addFavorite={addACB}
				fav={props.fav}
			/>
		);
	}
}
