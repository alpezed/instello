import { Link } from "react-router-dom";

import { useAppContext } from "../root";

function LatestPosts({ posts }) {
	const { setSelectedPost } = useAppContext();

	return (
		<div className='bg-white dark:bg-gray-900 shadow-md rounded-md overflow-hidden'>
			<div className='bg-gray-50 border-b border-gray-100 flex items-baseline justify-between py-4 px-6 dark:bg-gray-800 dark:border-gray-700'>
				<h2 className='font-semibold text-lg'>Latest</h2>
				<a href='explore.html'> See all</a>
			</div>
			<div className='grid grid-cols-2 gap-2 p-3 uk-link-reset'>
				{posts &&
					posts.map((post, idx) => {
						if (idx >= 4) return null;

						return (
							<div
								key={post.id}
								className={`bg-red-500 max-w-full ${
									[0, 3].includes(idx) ? "h-32" : "h-40"
								} rounded-lg relative overflow-hidden uk-transition-toggle ${
									idx === 2 ? "-mt-8" : ""
								}`}
							>
								<button
									uk-toggle='target: #story-modal'
									onClick={() => setSelectedPost(post)}
								>
									{post?.images.length > 0 ? (
										<img
											src={post?.images[0]}
											className='w-full h-full absolute object-cover inset-0'
											alt={post.id}
										/>
									) : (
										<span className='w-full h-full absolute object-cover inset-0' />
									)}
								</button>
								<div className='flex flex-1 justify-around items-center absolute bottom-0 w-full p-2 text-white custom-overly1 uk-transition-slide-bottom-medium'>
									<Link to={`/posts/${post._id}`}>
										<i className='uil-heart' /> {post.likes.length}
									</Link>
									<Link to={`/posts/${post._id}`}>
										<i className='uil-heart' /> 30
									</Link>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default LatestPosts;
