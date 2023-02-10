/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import moment from "moment";

import { useChatsQuery } from "../../hooks/useChat";
import { useMessagesContext } from "./message-context";

function UserList({ socket, searchedUser }) {
	const { selectedChat, setSelectedChat } = useMessagesContext();

	const userId = localStorage.getItem("userId");

	const { data: chats } = useChatsQuery(userId);

	const friends = chats?.reduce((acc, chat) => {
		if (chat.users.some(user => user.id !== userId)) {
			const chatUser = chat.users.find(user => user.id !== userId);
			acc.push({
				...chatUser,
				chatId: chat._id,
				latestMessage: chat.latestMessage,
			});
		}
		return acc;
	}, []);

	useEffect(() => {
		if (friends && !selectedChat) {
			setSelectedChat(friends[0]);
			socket.emit("join chat", friends[0].chatId);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [friends]);

	const onClickChatUser = (e, chat) => {
		e.preventDefault();
		setSelectedChat(chat);

		socket.emit("join chat", chat.chatId);
	};

	const filteredFriends = !!searchedUser
		? friends.filter(friend =>
				friend.fullName.toLowerCase().includes(searchedUser)
		  )
		: friends;

	return (
		<div className='pb-16 w-full'>
			<ul className='dark:text-gray-100'>
				{filteredFriends &&
					filteredFriends.map(user => (
						<li key={user.id}>
							<a
								href='#'
								className={`block flex items-center py-3 px-4 space-x-3  ${
									selectedChat?.chatId === user.chatId
										? "bg-gray-100 dark:bg-gray-700"
										: "hover:bg-gray-100 dark:hover:bg-gray-700"
								}`}
								onClick={e => onClickChatUser(e, user)}
							>
								<div className='w-12 h-12 rounded-full relative flex-shrink-0'>
									<img
										src={user.photoUrl}
										alt={user.fullName}
										className='absolute h-full rounded-full w-full'
									/>
									<span className='absolute bg-green-500 border-2 border-white bottom-0 h-3 m-0.5 right-0 rounded-full shadow-md w-3' />
								</div>
								<div className='flex-1 min-w-0 relative text-gray-500'>
									<h4 className='text-black font-semibold dark:text-white'>
										{user.fullName}
									</h4>
									<span className='absolute right-0 top-1 text-xs'>
										{user.latestMessage
											? moment(user.latestMessage.createdAt).fromNow()
											: null}
									</span>
									<p className='truncate'>{user?.latestMessage?.content}</p>
								</div>
							</a>
						</li>
					))}
			</ul>
		</div>
	);
}
export default UserList;
