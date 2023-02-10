function ExploreItems({ items, renderComponent }) {
	return (
		<div className='grid lg:grid-cols-4 grid-cols-2 gap-2 hover:text-yellow-700 uk-link-reset'>
			{items.map((item, index) => renderComponent(item, index))}
		</div>
	);
}

export default ExploreItems;
