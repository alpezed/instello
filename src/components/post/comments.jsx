import { useState, useMemo, useRef } from "react";

import Comment from "./comment";
import Liked from "./liked";
import PostButtons from "./buttons";
import AddComment from "./add-comment";

function Comments({ postId, likes, comments, onAddPostComment, onLikePost }) {
	const commentRef = useRef(null);

	const isPostLiked = useMemo(
		() => likes.some(user => user.id === localStorage.getItem("userId")),
		[likes]
	);

	const [commentText, setCommentText] = useState("");
	const [isLiked, setIsLiked] = useState(isPostLiked);

	const onAddPostCommentHandler = async e => {
		if (e.key === "Enter") {
			await onAddPostComment({ post: postId, comment: e.target.value });
			setCommentText("");
		}
	};

	const onLikePostHandler = () => {
		setIsLiked(currentLiked => !currentLiked);
		onLikePost({ postId, isLiked });
	};

	return (
		<div className='py-3 px-4 space-y-3'>
			<div className='flex space-x-4 lg:font-bold'>
				<PostButtons
					isLiked={isLiked}
					onLikePost={onLikePostHandler}
					onToggleCommentInput={() => commentRef.current?.focus()}
				/>
			</div>
			{likes && likes.length > 0 ? <Liked likes={likes} /> : null}
			{comments && comments.length > 0 ? (
				<div className='border-t pt-4 space-y-4 dark:border-gray-600'>
					{comments.map(({ _id, user, comment }) => (
						<Comment key={_id} user={user} text={comment} />
					))}
				</div>
			) : null}
			<AddComment
				ref={commentRef}
				value={commentText}
				onKeyUp={onAddPostCommentHandler}
				onChange={({ target }) => setCommentText(target.value)}
			/>
		</div>
	);
}
export default Comments;
