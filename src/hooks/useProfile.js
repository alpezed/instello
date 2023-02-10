import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import axios from "../utils/axios";

const fetchProfile = async () => {
	const { data } = await axios.get("/users/me");
	localStorage.setItem("userInfo", JSON.stringify(data?.results?.data));
	return data?.results?.data;
};

const updateProfile = async payload => {
	const { data } = await axios.patch("/users/update-me", payload);
	return data?.data?.user;
};

export const useProfile = () =>
	useQuery(["profile"], fetchProfile, {
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});

export const useProfileMutation = onSuccess => {
	const queryClient = useQueryClient();

	return useMutation(updateProfile, {
		onSuccess: () => {
			queryClient.invalidateQueries(["profile"]);
			onSuccess();
			toast.success("Settings saved!");
		},
		onError: () => {
			toast.error("Could not save.");
		},
	});
};
