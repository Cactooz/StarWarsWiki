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
		</div>
	);

	function showDetailsACB(id) {
		props.showDetails(id);
	}

	function getCardCB(object) {
		return (
			<Card key={object.id} image={object.image} name={object.name} onClick={showDetailsACB} />
		);
	}
}

export default DetailsView;
