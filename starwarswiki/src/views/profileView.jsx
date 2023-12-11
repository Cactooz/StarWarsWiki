import '/src/style.css';
import Card from "../components/Card.jsx";
import SignOutButton from "../components/SignOutButton.jsx";

export default function ProfileView(props) {

	function showFavoritesCB(card) {
		return (
			<Card key={card._id} name={card.name} image={card.image}/>
		);
	}

	return (
		<>
			<SignOutButton/>
			<h2>Hello There {props.currentUser.displayName}!</h2>
			<img src={props.currentUser.photoURL}/>
			<div>
				<h3>These Are Your Favorites!</h3>
				<div>
					{!props.favorites.length ? "You haven't added any favorites yet..." : props.favorites.map(showFavoritesCB)}
				</div>
			</div>
		</>
	);
}