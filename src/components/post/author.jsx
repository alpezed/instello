import { Link } from "react-router-dom";

function PostAuthor({ user }) {
	return (
		<div className='flex flex-1 items-center space-x-4'>
			<Link to={`/${user?.slug}`}>
				<div className='bg-gradient-to-tr from-yellow-600 to-pink-600 p-0.5 rounded-full'>
					<img
						src={user?.photoUrl}
						className='bg-gray-200 border border-white rounded-full w-8 h-8'
						alt='post-avatar'
					/>
				</div>
			</Link>
			<span className='block capitalize font-semibold'> {user?.fullName} </span>
		</div>
	);
}
export default PostAuthor;
