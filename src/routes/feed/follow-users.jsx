import { Link } from "react-router-dom";

import Spinner from "../../components/spinner";
import ExternalLink from "../../components/external-link";

function UserListItem({ user, isProcessing, onFollow }) {
	const { slug, fullName, location, photoUrl } = user;

	return (
		<div className='flex items-center justify-between py-3'>
			<div className='flex flex-1 items-center space-x-4'>
				<Link to={`/${slug}`}>
					<img
						src={photoUrl}
						className='bg-gray-200 rounded-full w-10 h-10'
						alt={fullName}
					/>
				</Link>
				<div className='flex flex-col'>
					<span className='block capitalize font-semibold'>{fullName}</span>
					<span className='block capitalize text-sm'>{location}</span>
				</div>
			</div>
			{isProcessing ? (
				<Spinner />
			) : (
				<ExternalLink
					className='border border-gray-200 font-semibold px-4 py-1 rounded-full hover:bg-pink-600 hover:text-white hover:border-pink-600 dark:border-gray-800'
					onClick={onFollow}
					disabled={isProcessing}
				>
					Follow
				</ExternalLink>
			)}
		</div>
	);
}

function FollowUsers({ users, onRefresh, onFollow, isProcessing }) {
	return (
		<div className='bg-white dark:bg-gray-900 shadow-md rounded-md overflow-hidden mb-5'>
			<div className='bg-gray-50 dark:bg-gray-800 border-b border-gray-100 flex items-baseline justify-between py-4 px-6 dark:border-gray-800'>
				<h2 className='font-semibold text-lg'>Who to follow</h2>
				<button onClick={onRefresh}>Refresh</button>
			</div>
			<div className='divide-gray-300 divide-gray-50 divide-opacity-50 divide-y px-4 dark:divide-gray-800 dark:text-gray-100'>
				{users?.map(user => (
					<UserListItem
						key={user.id}
						user={user}
						onFollow={() => onFollow(user.id)}
						isProcessing={isProcessing}
					/>
				))}
			</div>
		</div>
	);
}

export default FollowUsers;
