import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "../utils/axios";

const followUser = userId => {
	return axios.patch(`users/${userId}/follow`);
};

export const useFollowUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: followUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users-to-follow"] });
		},
	});
};
