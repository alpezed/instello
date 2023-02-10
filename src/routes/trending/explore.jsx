import Loader from "../../components/loader";
import { usePostsQuery } from "../../hooks/usePosts";
import { useAppContext } from "../root";

function ExploreItem({ item }) {
	const { images, likes, comments, user } = item;

	const { setSelectedPost } = useAppContext();

	return (
		<div>
			<div className='bg-green-400 max-w-full lg:h-72 h-48 rounded-lg relative overflow-hidden shadow uk-transition-toggle'>
				<button
					uk-toggle='target: #story-modal'
					onClick={() => setSelectedPost(item)}
				>
					{images.length > 0 ? (
						<img
							src={images[0]}
							className='w-full h-full absolute object-cover inset-0'
							alt={`${user.fullName} Post`}
						/>
					) : (
						<div className='w-full h-full absolute object-cover inset-0' />
					)}
				</button>
				<div className='flex flex-1 items-center absolute bottom-0 w-full p-3 text-white custom-overly1 uk-transition-slide-bottom-medium'>
					<a href='profile.html' className='lg:flex flex-1 items-center hidden'>
						<div className='bg-gradient-to-tr from-yellow-600 to-pink-600 p-1 rounded-full transform -rotate-2 hover:rotate-3 transition hover:scale-105 m-0.5 mr-2'>
							<img
								src={user.photoUrl}
								className='bg-gray-200 border border-white rounded-full w-8'
								alt={user.fullName}
							/>
						</div>
						<div>{user.fullName}</div>
					</a>
					<div className='flex space-x-2 flex-1 lg:flex-initial justify-around'>
						<button>
							<i className='uil-heart' /> {likes.length}
						</button>
						<button>
							<i className='uil-chat-bubble-user' /> {comments?.length ?? 0}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

function Explore() {
	const { data: posts, isLoading } = usePostsQuery();

	return (
		<>
			<h1 className='font-extrabold leading-none mb-6 mt-8 lg:text-2xl text-lg text-gray-900 tracking-tight'>
				Explore
			</h1>
			{isLoading && (
				<div className='relative h-60'>
					<Loader />
				</div>
			)}
			{!isLoading && (
				<div className='mt-6 grid lg:grid-cols-3 grid-cols-2 gap-3 hover:text-yellow-700 uk-link-reset'>
					{posts &&
						posts.map(post => <ExploreItem key={post._id} item={post} />)}
				</div>
			)}
		</>
	);
}
export default Explore;
