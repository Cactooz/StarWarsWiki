import Card from '../components/Card';

function DetailsView(props) {
	return (
		<div>
			<h2>{props.name}</h2>
			<img src={props.image}></img>
			<h3>Description</h3>
			<div>{props.details}</div>
			<h3>You may also like</h3>
			{props.suggested.map(getCardCB)}
		</div>
	);

	function getCardCB(character) {
		return <Card id={character.id} image={character.image} name={character.name} />;
	}
}

export default DetailsView;
