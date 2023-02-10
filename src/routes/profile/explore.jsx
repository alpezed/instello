/* eslint-disable jsx-a11y/alt-text */
import { usePostsQuery } from "../../hooks/usePosts";
import Loader from "../../components/loader";
import { useAppContext } from "../root";

function ExploreItem(props) {
	const { _id, images, likes, comments } = props;

	const { setSelectedPost } = useAppContext();

	return (
		<div>
			<div
				className='bg-red-500 max-w-full lg:h-64 h-40 rounded-md relative overflow-hidden uk-transition-toggle'
				tabIndex={0}
			>
				{images.length > 0 ? (
					<img
						src={images[0]}
						className='w-full h-full absolute object-cover inset-0'
					/>
				) : null}
				<div className='absolute bg-black bg-opacity-40 bottom-0 flex h-full items-center justify-center space-x-5 text-lg text-white uk-transition-scale-up w-full'>
					<button
						uk-toggle='target: #story-modal'
						onClick={() => setSelectedPost(props)}
						className='flex items-center'
					>
						<ion-icon name='heart' class='mr-1' /> {likes.length}
					</button>
					<button
						uk-toggle='target: #story-modal'
						onClick={() => setSelectedPost(props)}
						className='flex items-center'
					>
						<ion-icon name='chatbubble-ellipses' class='mr-1' /> 30
					</button>
					<button
						uk-toggle='target: #story-modal'
						onClick={() => setSelectedPost(props)}
						className='flex items-center'
					>
						<ion-icon name='pricetags' class='mr-1' /> 12
					</button>
				</div>
			</div>
		</div>
	);
}

function Explore() {
	const { data: posts, isLoading } = usePostsQuery();

	return (
		<>
			<div className='flex items-center justify-between mt-8 space-x-3'>
				<h1 className='flex-1 font-extrabold leading-none lg:text-2xl text-lg text-gray-900 tracking-tight uk-heading-line'>
					<span>Explore</span>
				</h1>
			</div>
			{isLoading && (
				<div className='relative h-60'>
					<Loader />
				</div>
			)}
			{!isLoading && (
				<div className='my-6 grid lg:grid-cols-4 grid-cols-2 gap-1.5 hover:text-yellow-700 uk-link-reset'>
					{posts && posts.map(post => <ExploreItem key={post._id} {...post} />)}
				</div>
			)}
		</>
	);
}

export default Explore;
