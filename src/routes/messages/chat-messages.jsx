import { useState, useEffect, useRef, memo, useCallback } from "react";

import ChatInput from "./chat-input";
import Message from "./message";
import MessageDate from "./message-date";
import ChatHeader from "./chat-header";
import { useMessageMutation } from "../../hooks/useChat";
import { useMessagesContext } from "./message-context";
import TypingIndicator from "./typing-indication";
import { useDebounce } from "../../hooks/useDebounce";
import Spinner from "../../components/spinner/index";
import Loader from "../../components/loader/index";

function ChatMessages({
	socket,
	isSocketConnected,
	typing,
	isTyping,
	setTyping,
}) {
	const selectedChatCompare = useRef();

	const [chatMessage, setChatMessage] = useState("");
	const [allMessages, setAllMessages] = useState([]);

	const debounceTyping = useDebounce(chatMessage, 3000);

	const { messages, selectedChat, isLoadingMessages } = useMessagesContext();
	const { chatId } = selectedChat || {};

	// const { data: messages } = useMessagesQuery(selectedChat?.chatId);
	const { mutate: sendMessage } = useMessageMutation({
		onSuccess: data => {
			socket.emit("new message", data);
			setAllMessages(currentMessages => [...currentMessages, data]);
		},
	});

	// Effect for API call
	useEffect(() => {
		if (debounceTyping && typing) {
			console.log("typing");
			setTyping(false);
			socket.emit("stop typing", chatId);
		}
	}, [socket, debounceTyping, chatId, typing]);

	useEffect(() => {
		setAllMessages(messages);
	}, [messages]);

	useEffect(() => {
		selectedChatCompare.current = selectedChat;
	}, [selectedChat]);

	useEffect(() => {
		if (!socket) return;
		socket.on("message received", newMessageReceived => {
			if (
				!selectedChatCompare.current ||
				selectedChatCompare.current.chatId !== newMessageReceived.chat._id
			) {
				// give notification
			} else {
				setAllMessages([...(allMessages || []), newMessageReceived]);
			}
		});
	});

	const onSendMessage = useCallback(
		e => {
			e.preventDefault();
			setChatMessage("");
			socket.emit("stop typing", selectedChat.chatId);
			setTyping(false);
			sendMessage({
				chat: chatId,
				content: chatMessage,
			});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[chatId, chatMessage]
	);

	const onTyping = value => {
		setChatMessage(value);

		if (!isSocketConnected) return;

		// typing
		if (!isTyping && value) {
			setTyping(true);
			socket.emit("typing", selectedChat.chatId);
		}
	};

	return (
		<>
			<ChatHeader selectedChat={selectedChat} />
			<div className='border-t dark:border-gray-600'>
				<div className='lg:p-8 p-4 space-y-5 relative'>
					{isLoadingMessages ? (
						<div className='m-auto py-10'>
							<Loader />
						</div>
					) : (
						<>
							<MessageDate />
							{allMessages && allMessages.length > 0
								? allMessages.map(message => (
										<Message key={message._id} message={message} />
								  ))
								: null}
							{isTyping && <TypingIndicator user={selectedChat} />}
						</>
					)}
				</div>
				<ChatInput
					chatMessage={chatMessage}
					onSendMessage={onSendMessage}
					setChatMessage={onTyping}
				/>
			</div>
		</>
	);
}

export default memo(ChatMessages);
