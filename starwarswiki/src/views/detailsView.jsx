function DetailsView(props) {
	function findFavCB(item) {
		return item.name === props.name;
	}

	function removeACB() {
		props.removeFavorite(object);
	}

	function addACB() {
		props.addFavorite(object);
	}

	const object = { id: props.id, name: props.name, image: props.image, path: props.path };

	return (
		<div>
			<h2>{props.name}</h2>
			<img src={props.image}></img>
			<div>
				{props.loggedIn ? (
					props.fav.find(findFavCB) ? (
						<button onClick={removeACB}>Remove Favorite</button>
					) : (
						<button onClick={addACB}>Add Favorite</button>
					)
				) : (
					<p>Sign in above to add {props.path} to your favorites!</p>
				)}
			</div>
			<h3>Description</h3>
			<p>{props.details}</p>
		</div>
	);
}

export default DetailsView;
