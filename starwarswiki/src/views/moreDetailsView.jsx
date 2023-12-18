function MoreDetailsView(props) {
	return (
		<div className='more-details'>
			{props.details?.map((item) => {
				return (
					<div key={item.key}>
						<h4>{item.key}</h4>
						<p>{item.value}</p>
					</div>
				);
			})}
		</div>
	);
}

export default MoreDetailsView;
