import Card from '../components/Card.jsx';

export default function browseView(props) {
	function removeACB(card) {
		props.doRemove({ id: card.id, image: card.image, name: card.name, path: card.path });
	}

	function addACB(card) {
		props.doAdd({ id: card.id, image: card.image, name: card.name, path: card.path });
	}

	return <div className='cards-container browse-page'>{props.browseResult.map(showAllCB)}</div>;

	function showAllCB(card) {
		return (
			<Card
				key={card._id ? card._id : card.id}
				path={
					window.location.pathname.startsWith('/profile') ||
					window.location.pathname.startsWith('/search')
						? card.path
						: window.location.pathname
				}
				id={card._id}
				name={card.name}
				image={card.image}
				removeFavorite={removeACB}
				addFavorite={addACB}
				fav={props.fav}
				maxFavorites={props.maxFavorites}
				auth={props.auth}
			/>
		);
	}
}
