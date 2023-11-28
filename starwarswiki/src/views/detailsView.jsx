import Card from '../components/Card';

/*
	'suggested' is an array of objects. The attributes of the objects are 'id', 'name'
	and 'image'.
*/

function DetailsView(props) {
	return (
		<div>
			<h2>{props.name}</h2>
			<img src={props.image}></img>
			<h3>Description</h3>
			<p>{props.details}</p>
			<h3>You may also like</h3>
			{props.suggested.map(getCardCB)}
			{swapiInfo(props.swapiData)}
		</div>
	);

	function swapiInfo(data) {
		return (
			<div>
				<span>Birth year: {data.birth_year}</span>
				<span>Gender: {data.gender}</span>
				<span>Species: {data.species}</span>
				<span>Homeworld: {data.homeworld}</span>
				<h3>Starships</h3>
				{data.starships.map(starshipACB)}
			</div>
		);
	}

	function starshipACB(ships) {
		return (
			<div>
				<img src={ships} />
			</div>
		);
	}

	function showDetailsACB(id) {
		props.showDetails(id);
	}

	function getCardCB(character) {
		return (
			<Card
				key={character.id}
				image={character.image}
				name={character.name}
				onClick={showDetailsACB}
			/>
		);
	}
}

export default DetailsView;
