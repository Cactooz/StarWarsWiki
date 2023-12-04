function DetailsView(props) {
	return (
		<div>
			<h2>{props.name}</h2>
			<img src={props.image}></img>
			<h3>Description</h3>
			<p>{props.details}</p>
		</div>
	);
}

export default DetailsView;
