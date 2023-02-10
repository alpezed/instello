import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "../utils/axios";

const fetchUser = async userId => {
	const { data } = await axios.get(`/users/${userId}`);
	return data;
};

const fetchUserMessages = async userId => {
	const { data } = await axios.get(`/users/${userId}/messages`);
	return data;
};

const fetchSuggestions = async () => {
	const { data } = await axios.get("/users/suggestions");
	return data;
};

const updateUser = async (userId, payload) => {
	const { data } = await axios.patch(`/users/${userId}`, payload);
	return data;
};

const addFriend = async friendId => {
	const { data } = await axios.patch(`/users/add-friend`, { friendId });
	return data;
};

const removeFriend = async friendId => {
	const { data } = await axios.patch(`/users/remove-friend`, { friendId });
	return data;
};

const fetchUsers = async () => {
	const { data } = await axios.get("/users");
	return data;
};

export const useUserQuery = userId =>
	useQuery(["user", userId], () => fetchUser(userId), {
		select: data => data?.results?.data,
	});

export const useUsersQuery = () =>
	useQuery(["users"], fetchUsers, {
		select: data => data.results?.data,
	});

export const useUserMessagesQuery = userId =>
	useQuery(["user-messages", userId], fetchUserMessages, {
		select: data => data.results?.data,
	});

export const useUserSuggestionsQuery = userId =>
	useQuery(["user-suggestions", userId], fetchSuggestions, {
		select: data => data.suggestions,
	});

export const useAddFriendMutation = (isFriend, options) => {
	const queryClient = useQueryClient();
	return useMutation(isFriend ? removeFriend : addFriend, {
		...options,
		onSuccess: () => {
			queryClient.invalidateQueries(["profile"]);
			queryClient.invalidateQueries(["user-suggestions"]);
			// queryClient.invalidateQueries(["user", userId]);
			options?.onSuccess();
		},
	});
};

export const useUserMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(updateUser, {
		onSuccess: () => {
			queryClient.invalidateQueries(["profile"]);
		},
	});
};
