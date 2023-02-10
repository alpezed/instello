/* eslint-disable jsx-a11y/alt-text */
import { Link } from "react-router-dom";
import { useAppContext } from "../root";

function ExploreItemLarge({ post }) {
	const { _id, images, likes, comments, user, body } = post;

	const { setSelectedPost } = useAppContext();

	return (
		<div className='lg:col-span-2 lg:row-span-2'>
			<div className='bg-pink-400 h-full max-w-full overflow-hidden relative rounded-md uk-transition-toggle shadow-sm'>
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
				<div className='absolute bottom-0 p-6 space-y-2 text-white w-full custom-overly1 uk-light lg:block hidden'>
					<div className='flex flex-1 items-center space-x-2'>
						<Link to={`/${user.id}`} className='flex items-center'>
							<div className='bg-gradient-to-tr from-yellow-600 to-pink-600 p-1 rounded-full transform -rotate-2 hover:rotate-3 transition hover:scale-105 m-0.5 mr-2'>
								<img
									src={user.photoUrl}
									className='bg-gray-200 border border-white rounded-full w-8'
								/>
							</div>
							{user.fullName}
						</Link>
						<div className='flex space-x-3'>
							<Link to={`/posts/${_id}`} className='flex items-center'>
								<ion-icon
									name='heart'
									class='mr-1 md hydrated'
									role='img'
									aria-label='heart'
								/>
								{likes.length}
							</Link>
							<Link to={`/posts/${_id}`} className='flex items-center'>
								<ion-icon
									name='chatbubble-ellipses'
									class='mr-1 md hydrated'
									role='img'
									aria-label='chatbubble ellipses'
								/>
								{comments?.length}
							</Link>
						</div>
					</div>
					<p>{body}</p>
				</div>
			</div>
		</div>
	);
}

export default ExploreItemLarge;
