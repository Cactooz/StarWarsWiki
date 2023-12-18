import Card from '../components/Card.jsx';
import { toast } from 'react-toastify';
import Toastify from '../components/Toastify.jsx';

export default function browseView(props) {
	function removeACB(card) {
		props.doRemove({ id: card.id, image: card.image, name: card.name, path: card.path });
	}

	function addACB(card) {
		if (props.fav.length >= props.maxFavorites)
			toast.info(`You can up to ${card.maxFavorites} favorites. Remove some to add more!`);
		else props.doAdd({ id: card.id, image: card.image, name: card.name, path: card.path });
	}

	function messageACB() {
		toast.info('Sign in to add items to your favorites!');
	}

	return (
		<>
			<div className='cards-container browse-page'>{props.browseResult.map(showAllCB)}</div>
			<Toastify />
		</>
	);

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
				signInMessage={messageACB}
				fav={props.fav}
				maxFavorites={props.maxFavorites}
				auth={props.auth}
			/>
		);
	}
}
