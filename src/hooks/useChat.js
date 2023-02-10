import { useQuery, useMutation } from "@tanstack/react-query";

import axios from "../utils/axios";

const fetchMessages = async chatId => {
	const { data } = await axios.get(`/chats/${chatId}/messages`);
	return data?.results?.data;
};

const sendMessage = async payload => {
	const { data } = await axios.post(`/messages`, {
		...payload,
		sender: localStorage.getItem("userId"),
	});
	return data?.data?.message;
};

const fetchChats = async userId => {
	const { data } = await axios.get(`/chats/${userId}`);
	return data?.results?.chats;
};

export const useMessagesQuery = (chatId, options) =>
	useQuery(["messages", chatId], () => fetchMessages(chatId), {
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		...options,
	});

export const useChatsQuery = (userId, options) =>
	useQuery(["chats", userId], () => fetchChats(userId), {
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		...options,
	});

export const useMessageMutation = options => {
	// const queryClient = useQueryClient();

	return useMutation(sendMessage, {
		// onSuccess: () => {
		// 	queryClient.invalidateQueries(["messages", chatId]);
		// },
		...options,
	});
};
