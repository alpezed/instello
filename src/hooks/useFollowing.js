import { useQuery } from "@tanstack/react-query";

import axios from "../utils/axios";

const fetchUsersToFollow = async () => {
	const { data } = await axios.get("/users/follow");
	if (!data?.results) return [];
	return data?.results?.users;
};

export const useUsersToFollow = () =>
	useQuery({
		queryKey: ["users-to-follow"],
		queryFn: fetchUsersToFollow,
	});
