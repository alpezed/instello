function TypingIndicator({ user }) {
	return (
		<div className='flex lg:items-center'>
			<div className='w-14 h-14 rounded-full relative flex-shrink-0'>
				<img
					src={user.photoUrl}
					alt={user.fullName}
					className='absolute h-full rounded-full w-full'
				/>
			</div>
			<div className='text-gray-700 py-2 px-3 rounded bg-gray-100 relative h-full lg:ml-5 ml-2 lg:mr-20 dark:bg-gray-700 dark:text-white'>
				<div className='flex space-x-0.5 my-2 animate-pulse'>
					<div className='w-2 h-2 rounded-full bg-gray-400' />
					<div className='w-2 h-2 rounded-full bg-gray-300' />
					<div className='w-2 h-2 rounded-full bg-gray-300' />
				</div>
				<div className='absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-700' />
			</div>
		</div>
	);
}

export default TypingIndicator;
