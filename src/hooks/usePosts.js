import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import axios from "../utils/axios";

const fetchPosts = async () => {
	const { data } = await axios.get("/posts");
	return data;
};

const fetchPost = async postId => {
	const { data } = await axios.get(`/posts/${postId}`);
	return data;
};

const fetchPostComments = async postId => {
	const { data } = await axios.get(`/posts/${postId}/comments`);
	return data;
};

const deletePost = async postId => {
	const { data } = await axios.delete(`/posts/${postId}`);
	return data;
};

const addPostComment = async payload => {
	const { data } = await axios.post("/comments", payload);
	return data;
};

const likePost = async ({ postId, isLiked }) => {
	console.log(postId, isLiked);
	const { data } = await axios.patch(
		`/posts/${postId}/${isLiked ? "unlike" : "like"}`
	);
	return data;
};

export const usePostsQuery = () =>
	useQuery(["posts"], fetchPosts, {
		select: data => data?.results?.data,
	});

export const usePostQuery = (postId, options) =>
	useQuery(["post", postId], () => fetchPost(postId), {
		select: data => data?.results?.data,
		...options,
	});

export const usePostCommentsQuery = (postId, options) =>
	useQuery(["post-comments", postId], () => fetchPostComments(postId), {
		select: data => data?.results?.data,
		...options,
	});

export const useAddPostComment = postId => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: addPostComment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["post-comments", postId] });
		},
	});
};

export const useLikePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: likePost,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["posts"],
			});
		},
	});
};

export const useDeletePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deletePost,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["posts"],
			});
			toast.success("Post deleted successfully!");
		},
	});
};
