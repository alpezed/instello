import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import { useUserQuery, useAddFriendMutation } from "../../hooks/useUser";
import Highlights from "./highlights";
import Explore from "./explore";
import Loader from "../../components/loader";

function Profile() {
	const params = useParams();

	const [isFriend, setIsFriend] = useState(false);

	const currentUserInfo = useMemo(() => {
		return localStorage.getItem("userInfo")
			? JSON.parse(localStorage.getItem("userInfo"))
			: {};
	}, []);

	const userId = params.user ? params.user : localStorage.getItem("userId");
	const { data: user, isLoading } = useUserQuery(userId);
	const { mutate: addFriend, isLoading: isAddingFriend } = useAddFriendMutation(
		isFriend,
		{
			onSuccess: () => {
				setIsFriend(currentIsFriend => !currentIsFriend);
			},
		}
	);

	useEffect(() => {
		const isFriend = currentUserInfo?.friends.some(
			friend => friend.id === user?._id
		);
		setIsFriend(isFriend);
	}, [currentUserInfo, user]);

	function handleAddFriend() {
		addFriend(user?.id);
	}

	// const isFriend = currentUserInfo?.friends.some(
	// 	friend => friend.id === user?._id
	// );

	if (isLoading) {
		return (
			<div className='container pro-container m-auto'>
				<Loader />
			</div>
		);
	}

	return (
		<div className='container pro-container m-auto'>
			<div className='flex lg:flex-row flex-col items-center lg:py-8 lg:space-x-8'>
				<div>
					<div className='bg-gradient-to-tr from-yellow-600 to-pink-600 p-1 rounded-full m-0.5 mr-2  w-56 h-56 relative overflow-hidden uk-transition-toggle'>
						<img
							src={user?.photoUrl}
							className='bg-gray-200 border-4 border-white rounded-full w-full h-full dark:border-gray-900'
							alt={user.fullName}
						/>
						<div className='absolute -bottom-3 custom-overly1 flex justify-center pt-4 pb-7 space-x-3 text-2xl text-white uk-transition-slide-bottom-medium w-full'>
							<button className='hover:text-white'>
								<i className='uil-camera' />
							</button>
							<button className='hover:text-white'>
								<i className='uil-crop-alt' />
							</button>
						</div>
					</div>
				</div>
				<div className='lg:w/8/12 flex-1 flex flex-col lg:items-start items-center'>
					<h2 className='font-semibold lg:text-2xl text-lg mb-2'>
						{user.fullName}
					</h2>
					<p className='lg:text-left mb-2 text-center  dark:text-gray-100'>
						{user.bio}
					</p>
					<div className='flex font-semibold mb-3 space-x-2  dark:text-gray-10'>
						{/* <a href='#'>Travailing</a> , <a href='#'>Sports</a> ,{" "}
						<a href='#'>Movies</a> */}
					</div>
					{userId !== currentUserInfo.id && (
						<div className='capitalize flex font-semibold space-x-3 text-center text-sm my-2'>
							<button
								className={`bg-gray-300 shadow-sm p-2 px-6 rounded-md dark:bg-gray-700 ${
									isAddingFriend ? "opacity-70" : ""
								}`}
								onClick={handleAddFriend}
								disabled={isAddingFriend}
							>
								{isFriend ? "Unfriend" : "Add friend"}
							</button>
							<button className='bg-pink-500 shadow-sm p-2 pink-500 px-6 rounded-md text-white hover:text-white hover:bg-pink-600'>
								Send message
							</button>
							<div>
								<button
									className='bg-gray-300 flex h-12 h-full items-center justify-center rounded-full text-xl w-9 dark:bg-gray-700'
									aria-expanded='false'
								>
									<i className='icon-feather-chevron-down' />
								</button>
								<div className='bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base dark:bg-gray-900 uk-drop'>
									<ul className='space-y-1'>
										<li>
											<button className='flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-700'>
												<i className='uil-user-minus mr-2' />
												Unfriend
											</button>
										</li>
										<li>
											<button className='flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-700'>
												<i className='uil-eye-slash  mr-2' />
												Hide Your Story
											</button>
										</li>
										<li>
											<button className='flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-700'>
												<i className='uil-share-alt mr-2' /> Share This Profile
											</button>
										</li>
										<li>
											<hr className='-mx-2 my-2  dark:border-gray-700' />
										</li>
										<li>
											<button className='flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600'>
												<i className='uil-stop-circle mr-2' /> Block
											</button>
										</li>
									</ul>
								</div>
							</div>
						</div>
					)}
					<div className='divide-gray-300 divide-transparent divide-x grid grid-cols-3 lg:text-left lg:text-lg mt-3 text-center w-full dark:text-gray-100'>
						<div className='flex lg:flex-row flex-col'>
							{user?.posts}{" "}
							<strong className='lg:pl-2'>
								Post{user?.posts > 1 ? "s" : ""}
							</strong>
						</div>
						<div className='lg:pl-4 flex lg:flex-row flex-col'>
							{user.followers.length}{" "}
							<strong className='lg:pl-2'>Followers</strong>
						</div>
						<div className='lg:pl-4 flex lg:flex-row flex-col'>
							{user.following.length}{" "}
							<strong className='lg:pl-2'>Following</strong>
						</div>
					</div>
				</div>
				<div className='w-20' />
			</div>
			<Highlights />
			<Explore />
			{/* <div className='flex justify-center mt-6'>
				<a
					href='#'
					className='bg-white dark:bg-gray-900 font-semibold my-3 px-6 py-2 rounded-full shadow-md dark:bg-gray-800 dark:text-white'
				>
					{" "}
					Load more ..
				</a>
			</div> */}
		</div>
	);
}

export default Profile;
