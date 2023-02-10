function Liked({ likes = [] }) {
	return (
		<div className='flex items-center space-x-3'>
			<div className='flex items-center'>
				{likes.map((userLiked, idx) => (
					<img
						key={`${idx}-${userLiked.id}`}
						src={userLiked?.photoUrl}
						alt={userLiked?.fullName}
						className={`w-6 h-6 rounded-full border-2 border-white dark:border-gray-900${
							idx > 0 ? "  -ml-2" : ""
						}`}
					/>
				))}
			</div>
			<div className='dark:text-gray-100'>
				{likes.length >= 1 && (
					<>
						Liked <strong> {likes[0]?.fullName}</strong>{" "}
					</>
				)}
				{likes.length >= 2 && (
					<>
						and{" "}
						<strong>
							{likes.length - 1} Other{likes.length > 3 ? "s" : ""}{" "}
						</strong>
					</>
				)}
			</div>
		</div>
	);
}

export default Liked;
