import { useContext } from "react";
import { useState, createContext } from "react";

import { useMessagesQuery } from "../../hooks/useChat";

const MessageContext = createContext({
	isLoadingMessages: false,
	messages: [],
	selectedChat: null,
	setSelectedChat: () => {},
});

function MessagesContext({ children }) {
	const [selectedChat, setSelectedChat] = useState(null);

	const { data: messages, isLoading } = useMessagesQuery(selectedChat?.chatId, {
		enabled: !!selectedChat?.chatId,
	});

	return (
		<MessageContext.Provider
			value={{
				messages,
				selectedChat,
				setSelectedChat,
				isLoadingMessages: isLoading,
			}}
		>
			{children}
		</MessageContext.Provider>
	);
}

export const useMessagesContext = () => useContext(MessageContext);

export default MessagesContext;
