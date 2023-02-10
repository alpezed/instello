import Images from "./images";
import PostHeader from "./header";
import Comments from "./comments";
import {
	useAddPostComment,
	useLikePost,
	usePostCommentsQuery,
} from "../../hooks/usePosts";

function Post({ post }) {
	const { data: comments } = usePostCommentsQuery(post.id, {
		enabled: !!post.id,
	});

	const { mutate: addPostComment } = useAddPostComment(post.id);
	const { mutate: likePost } = useLikePost(post.id);

	return (
		<div className='bg-white shadow rounded-md dark:bg-gray-900 -mx-2 lg:mx-0'>
			<PostHeader post={post} user={post?.user} />
			{post?.body && (
				<div class='p-3 border-b dark:border-gray-700'>{post?.body}</div>
			)}
			<Images images={post.images} />
			<Comments
				postId={post.id}
				likes={post.likes}
				comments={comments || []}
				onAddPostComment={addPostComment}
				onLikePost={likePost}
			/>
		</div>
	);
}

export default Post;
