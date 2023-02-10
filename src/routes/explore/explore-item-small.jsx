/* eslint-disable jsx-a11y/alt-text */
import { Link } from "react-router-dom";
import { useAppContext } from "../root";

function ExploreItemSmall({ post }) {
	const { _id, images, likes, comments, user } = post;

	const { setSelectedPost } = useAppContext();

	return (
		<div>
			<div className='bg-yellow-400 max-w-full lg:h-64 h-40 rounded-md relative overflow-hidden shadow-sm'>
				<button
					uk-toggle='target: #story-modal'
					onClick={() => setSelectedPost(post)}
				>
					{images.length > 0 ? (
						<img
							src={images[0]}
							className='w-full h-full absolute object-cover inset-0'
						/>
					) : (
						<div className='w-full h-full absolute object-cover inset-0' />
					)}
				</button>
				<div className='absolute bottom-0 flex items-center justify-between px-4 py-3 space-x-2 text-white w-full custom-overly1'>
					<Link to={`/${user.id}`}>{user.fullName}</Link>
					<div className='flex space-x-3'>
						<Link to={`/posts/${_id}`} className='flex items-center'>
							<ion-icon
								name='heart'
								class='mr-1 md hydrated'
								role='img'
								aria-label='heart'
							/>{" "}
							{likes.length}
						</Link>
						<Link to={`/posts/${_id}`} className='flex items-center'>
							<ion-icon
								name='chatbubble-ellipses'
								class='mr-1 md hydrated'
								role='img'
								aria-label='chatbubble ellipses'
							/>{" "}
							{comments?.length}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ExploreItemSmall;
