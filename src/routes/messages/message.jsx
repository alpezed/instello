import classnames from "classnames";

function Message({ message }) {
	const { sender, content } = message;

	const currentUserId = localStorage.getItem("userId");
	const isMe = currentUserId === sender.id;

	return (
		<div
			className={classnames("flex lg:items-center", {
				"flex-row-reverse": isMe,
			})}
		>
			<div className='w-14 h-14 rounded-full relative flex-shrink-0'>
				<img
					src={sender.photoUrl}
					alt={sender.fullName}
					className='absolute h-full rounded-full w-full'
				/>
			</div>
			<div
				className={classnames("py-2 px-3 rounded relative h-full ", {
					"text-gray-700 bg-gray-100 lg:mr-20 lg:ml-5 ml-2 lg:mr-20 dark:bg-gray-700 dark:text-white":
						!isMe,
					"text-white bg-blue-600 lg:mr-5 mr-2 lg:ml-20": isMe,
				})}
			>
				<p className='leading-6'>{content}</p>
				<div
					className={classnames({
						"absolute w-3 h-3 top-3 -right-1 bg-blue-600 transform rotate-45":
							isMe,
						"absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-700":
							!isMe,
					})}
				/>
			</div>
		</div>
	);
}

export default Message;
