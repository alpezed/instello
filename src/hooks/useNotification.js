import { useQuery, useMutation } from "@tanstack/react-query";

import axios from "../utils/axios";

const fetchNotifications = async userId => {
	const { data } = await axios.get(`/users/${userId}/notifications`);
	return data?.results?.data;
};

const readNotification = async id => {
	const { data } = await axios.patch(`/notifications/${id}`, {
		read: true,
	});
	return data?.data?.message;
};

export const useNotificationsQuery = (userId, options) =>
	useQuery(["notifications"], () => fetchNotifications(userId), {
		...options,
		// refetchOnWindowFocus: false,
	});

export const useNotificationMutation = options => {
	// const queryClient = useQueryClient();
	return useMutation(readNotification, {
		// onSuccess: () => {
		// 	queryClient.invalidateQueries(["notifications"]);
		// },
		...options,
	});
};
