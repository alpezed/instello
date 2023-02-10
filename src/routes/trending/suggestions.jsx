/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import { useState } from "react";

import Loader from "../../components/loader";
import { useUserSuggestionsQuery } from "../../hooks/useUser";
import { useAddFriendMutation } from "../../hooks/useUser";

function Suggestion({ item, onAddFriend }) {
	const [isFriend, setIsFriend] = useState(false);

	const { mutate: addFriend, isLoading } = useAddFriendMutation(isFriend, {
		onSuccess: () => {
			setIsFriend(currentIsFriend => !currentIsFriend);
		},
	});

	function handleAddFriend(userId) {
		addFriend(userId);
	}

	return (
		<li tabIndex={-1}>
			<div className='bg-gray-200 max-w-full lg:h-64 h-52 rounded-lg relative overflow-hidden'>
				<Link to={`/${item.slug}`}>
					<img
						src={item.photoUrl}
						className='w-full h-full absolute object-cover inset-0'
						alt={item.fullName}
					/>
				</Link>
				<a
					href='#'
					className='absolute right-3 top-3 bg-black bg-opacity-60 rounded-full'
					data-tippy-placement='left'
					data-tippy
					data-original-title='Hide'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						className='fill-current h-6 m-1.5 text-white w-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M6 18L18 6M6 6l12 12'
						/>
					</svg>
				</a>
				<div className='absolute bottom-0 p-4 w-full custom-overly1'>
					<div className='flex justify-between align-bottom flex-wrap text-white'>
						<div className='w-full truncate text-lg'> {item.fullName} </div>
						<div className='leading-5 text-sm'>
							<div> {item.location} </div>
						</div>
						{isLoading ? (
							<button className='absolute right-3 bottom-3 rounded-full bg-gray-400'>
								<div
									className='animate-spin m-1.5 w-6 h-6 border-[2px] border-current border-t-transparent text-slate-300 rounded-full'
									role='status'
									aria-label='loading'
								>
									<span className='sr-only'>Loading...</span>
								</div>
							</button>
						) : (
							<button
								className='absolute right-3 bottom-3 rounded-full bg-gradient-to-tr from-blue-500 to-purple-700'
								onClick={() => handleAddFriend(item._id)}
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
									fill='currentColor'
									className='fill-current h-6 m-1.5 text-white w-6'
								>
									<path d='M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z' />
								</svg>
							</button>
						)}
					</div>
				</div>
			</div>
		</li>
	);
}

function Suggestions() {
	const { data: suggestions, isLoading } = useUserSuggestionsQuery();

	return (
		<>
			<div className='flex justify-between items-baseline uk-visible@s'>
				<h1 className='font-extrabold leading-none mb-6 mt-8 lg:text-2xl text-lg text-gray-900 tracking-tight'>
					Suggestion
				</h1>
				<Link to='/suggestions' className='text-blue-400 hover:text-blue-500'>
					See all
				</Link>
			</div>
			<div className='relative uk-slider' uk-slider='finite: true'>
				{isLoading && (
					<div className='relative h-60'>
						<Loader />
					</div>
				)}
				{!isLoading && (
					<div className='uk-slider-container pb-3 -ml-3'>
						<ul
							className='uk-slider-items uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-grid-small'
							style={{ transform: "translate3d(-253px, 0px, 0px)" }}
						>
							{suggestions.map(item => (
								<Suggestion key={item._id} item={item} />
							))}
						</ul>
						<a
							className='uk-position-center-left uk-position-small p-3.5 bg-white rounded-full w-10 h-10 flex justify-center items-center -mx-4 mb-6 shadow-md dark:bg-gray-800 dark:text-white uk-icon uk-slidenav-previous uk-slidenav'
							href='#'
							uk-slidenav-previous='true'
							uk-slider-item='previous'
						>
							<svg
								width='14px'
								height='24px'
								viewBox='0 0 14 24'
								xmlns='http://www.w3.org/2000/svg'
								data-svg='slidenav-previous'
							>
								<polyline
									fill='none'
									stroke='#000'
									strokeWidth='1.4'
									points='12.775,1 1.225,12 12.775,23 '
								/>
							</svg>
						</a>
						<a
							className='uk-position-center-right uk-positsion-small p-3.5 bg-white rounded-full w-10 h-10 flex justify-center items-center -mx-4 shadow-md dark:bg-gray-800 dark:text-white uk-icon uk-slidenav-next uk-slidenav uk-invisible'
							href='#'
							uk-slidenav-next='true'
							uk-slider-item='next'
						>
							<svg
								width='14px'
								height='24px'
								viewBox='0 0 14 24'
								xmlns='http://www.w3.org/2000/svg'
								data-svg='slidenav-next'
							>
								<polyline
									fill='none'
									stroke='#000'
									strokeWidth='1.4'
									points='1.225,23 12.775,12 1.225,1 '
								/>
							</svg>
						</a>
					</div>
				)}
			</div>
		</>
	);
}

export default Suggestions;
