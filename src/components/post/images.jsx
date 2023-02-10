function Images({ images }) {
	// const limitImages = images.splice(0, 3);

	if (images.length === 0) return null;

	if (images && images.length > 1) {
		return (
			<div uk-lightbox='true'>
				<div className='grid grid-cols-2 gap-2 p-2'>
					{images.map((image, idx) => {
						return (
							<a
								key={`${idx}-${image}`}
								href={image}
								className={
									idx >= 3
										? "hidden"
										: idx === 2
										? "relative"
										: idx === 0
										? "col-span-2"
										: ""
								}
							>
								<img
									src={image}
									alt={image}
									className={`rounded-md w-full ${
										idx === 0 ? "lg:h-76 object-cover" : "h-full"
									}`}
								/>
								{idx === 2 && (
									<div className='absolute bg-gray-900 bg-opacity-30 flex justify-center items-center text-white rounded-md inset-0 text-2xl'>
										+ {images.length - 3} more{" "}
									</div>
								)}
							</a>
						);
					})}
				</div>
			</div>
		);
	}

	return (
		<div uk-lightbox='true'>
			<a href={images[0]}>
				<img src={images[0]} alt='post-img' className='w-full' />
			</a>
		</div>
	);
}

export default Images;
