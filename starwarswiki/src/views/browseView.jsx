import Card from '../components/Card.jsx';
import { toast } from 'react-toastify';

export default function browseView(props) {
	function removeACB(card) {
		props.doRemove({ id: card.id, image: card.image, name: card.name, path: card.path });
	}

	function addACB(card) {
		if (props.fav.length >= props.maxFavorites)
			toast.info(`You can have up to ${card.maxFavorites} favorites. Remove some to add more!`);
		else props.doAdd({ id: card.id, image: card.image, name: card.name, path: card.path });
	}

	function messageACB() {
		toast.info('Sign in to add items to your favorites!');
	}

	return (
		<section className='cards-container browse-page'>{props.browseResult.map(showAllCB)}</section>
	);

	function showAllCB(card) {
		return (
			<Card
				key={card._id ? card._id : card.id}
				path={
					props.path.startsWith('/profile') || props.path.startsWith('/search')
						? card.path
						: props.path
				}
				id={card._id ? card._id : card.id}
				name={card.name}
				image={card.image}
				removeFavorite={removeACB}
				addFavorite={addACB}
				signInMessage={messageACB}
				fav={props.fav}
				maxFavorites={props.maxFavorites}
				auth={props.auth}
				inAnimation={props.inAnimation}
			/>
		);
	}
}
