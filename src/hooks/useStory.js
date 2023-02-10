import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import axios from "../utils/axios";

const addStory = async payload => {
	const { data } = await axios.post("/stories", payload);
	return data;
};

export const useAddStory = options => {
	return useMutation(addStory, {
		onError: () => {
			toast.error("Could not add a story.");
		},
		...options,
	});
};
