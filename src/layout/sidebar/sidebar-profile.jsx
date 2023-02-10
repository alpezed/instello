import { Link } from "react-router-dom";

function Profile({ user }) {
	return (
		<div className='flex flex-col items-center my-6 uk-visible@s'>
			<div className='bg-gradient-to-tr from-yellow-600 to-pink-600 p-1 rounded-full transition m-0.5 mr-2  w-24 h-24'>
				<img
					src={user?.photoUrl}
					className='bg-gray-200 border-4 border-white rounded-full w-full h-full'
					alt={user?.fullName}
				/>
			</div>
			<Link
				to='/profile'
				className='text-xl font-medium capitalize mt-4 uk-link-reset'
			>
				{user?.fullName}
			</Link>
			<div className='flex justify-around w-full items-center text-center uk-link-reset text-gray-800 mt-6'>
				<div>
					<a href='#'>
						<strong>Post{user?.posts > 1 ? "s" : ""}</strong>
						<div> {user?.posts}</div>
					</a>
				</div>
				<div>
					<a href='#'>
						<strong>Following</strong>
						<div> {user?.following.length}</div>
					</a>
				</div>
				<div>
					<a href='#'>
						<strong>Followers</strong>
						<div> {user?.followers.length}</div>
					</a>
				</div>
			</div>
		</div>
	);
}
export default Profile;
