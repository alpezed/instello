/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";

import { getUserInfo } from "../../../utils/user";
import Story from "./story";

function Stories() {
	const userInfo = getUserInfo();

	return (
		<>
			<div className='flex justify-between items-baseline lg:mr-8  uk-visible@s'>
				<h1 className='font-extrabold leading-none mb-6 lg:text-2xl text-lg text-gray-900 tracking-tight'>
					Stories
				</h1>
				<Link to='/stories' className='text-blue-400 hover:text-blue-500'>
					See all
				</Link>
			</div>
			<div className='relative uk-visible@s uk-slider' uk-slider='finite: true'>
				<a
					className='-left-2 absolute bg-white bottom-1/2 flex items-center justify-center p-2 rounded-full shadow text-xl w-9 z-10 dark:bg-gray-800 dark:text-white uk-invisible'
					href='#'
					uk-slider-item='previous'
				>
					<i className='icon-feather-chevron-left' />{" "}
				</a>
				<a
					className='absolute bg-white bottom-1/2 flex items-center justify-center p-2 right-4 rounded-full shadow text-xl w-9 z-10 dark:bg-gray-800 dark:text-white'
					href='#'
					uk-slider-item='next'
				>
					<i className='icon-feather-chevron-right' />
				</a>
				<div className='uk-slider-container pb-3 lg:mr-3'>
					<ul
						className='uk-slider-items uk-grid uk-grid-small'
						style={{ transform: "translate3d(0px, 0px, 0px)" }}
					>
						<Story
							isMe
							user={userInfo}
							withStory={!!userInfo.story}
							story={{
								...(userInfo?.story
									? { ...userInfo.story }
									: { image: userInfo.photoUrl }),
							}}
						/>
						{userInfo.friends.map(friend => {
							if (!friend.story) return null;
							return (
								<Story
									key={friend._id}
									story={friend.story}
									withStory={!!friend.story}
									user={friend}
								/>
							);
						})}
					</ul>
				</div>
			</div>
		</>
	);
}

export default Stories;
