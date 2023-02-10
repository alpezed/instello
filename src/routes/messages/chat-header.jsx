import { Link } from "react-router-dom";

function ChatHeader({ selectedChat, onDeleteChat }) {
	return (
		<div className='px-5 py-4 flex uk-flex-between'>
			<Link
				to={`/${selectedChat?.slug}`}
				className='flex items-center space-x-3'
			>
				<div className='w-10 h-10 rounded-full relative flex-shrink-0'>
					<img
						src={selectedChat?.photoUrl}
						alt={selectedChat?.fullName}
						className='h-full rounded-full w-full'
					/>
					<span className='absolute bg-green-500 border-2 border-white bottom-0 h-3 m-0.5 right-0 rounded-full shadow-md w-3' />
				</div>
				<div className='flex-1 min-w-0 relative text-gray-500'>
					<h4 className='font-semibold text-black text-lg'>
						{selectedChat?.fullName}
					</h4>
					<p className='font-semibold leading-3 text-green-500 text-sm'>
						is online
					</p>
				</div>
			</Link>
			<button
				className='flex hover:text-red-400 items-center leading-8 space-x-2 text-red-500 font-medium'
				onClick={onDeleteChat}
			>
				<i className='uil-trash-alt' />
				<span className='lg:block hidden'>Delete Conversation</span>
			</button>
		</div>
	);
}
export default ChatHeader;
