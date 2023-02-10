/* eslint-disable jsx-a11y/anchor-is-valid */
import { useMemo, useState, useEffect } from "react";

import PostAuthor from "./author";
import Spinner from "../spinner";
import PostButtons from "./buttons";
import Liked from "./liked";
import Comment from "./comment";
import AddComment from "./add-comment";
import {
	useAddPostComment,
	useLikePost,
	usePostCommentsQuery,
} from "../../hooks/usePosts";

function PostModal({ post, setSelectedPost }) {
	const { data: comments, isLoading } = usePostCommentsQuery(post?.id, {
		enabled: !!post?.id,
	});

	const { _id, likes } = post || {};

	const { mutate: addPostComment } = useAddPostComment(post?.id);
	const { mutate: likePost } = useLikePost(post?.id);

	const isPostLiked = useMemo(
		() => likes?.some(user => user.id === localStorage.getItem("userId")),
		[likes]
	);

	const [commentText, setCommentText] = useState("");
	const [isLiked, setIsLiked] = useState(isPostLiked);

	useEffect(() => {
		setIsLiked(isPostLiked);
	}, [isPostLiked]);

	const onAddPostCommentHandler = async e => {
		if (e.key === "Enter") {
			await addPostComment({ post: _id, comment: e.target.value });
			setCommentText("");
		}
	};

	const onLikePostHandler = () => {
		setIsLiked(currentLiked => !currentLiked);
		likePost({ _id, isLiked });
	};

	return (
		<div
			id='story-modal'
			className='uk-modal-container uk-modal'
			uk-modal='true'
		>
			<div className='uk-modal-dialog story-modal'>
				<button
					className='uk-modal-close-default lg:-mt-9 lg:-mr-9 -mt-5 -mr-5 shadow-lg bg-white rounded-full p-4 transition dark:bg-gray-600 dark:text-white uk-icon uk-close'
					type='button'
					uk-close='true'
					onClick={() => setSelectedPost(null)}
				>
					<svg
						width={14}
						height={14}
						viewBox='0 0 14 14'
						xmlns='http://www.w3.org/2000/svg'
						data-svg='close-icon'
					>
						<line
							fill='none'
							stroke='#000'
							strokeWidth='1.1'
							x1={1}
							y1={1}
							x2={13}
							y2={13}
						/>
						<line
							fill='none'
							stroke='#000'
							strokeWidth='1.1'
							x1={13}
							y1={1}
							x2={1}
							y2={13}
						/>
					</svg>
				</button>
				<div className='story-modal-media'>
					{post?.images.length === 1 ? (
						<img
							src={post?.images[0]}
							className='inset-0 h-full w-full min-w-[600px] object-cover'
							alt={`${post?._id} Post`}
						/>
					) : post?.images.length > 1 ? (
						<div
							uk-slideshow='true'
							className='h-full w-full min-w-[600px] relative'
						>
							<ul
								class='uk-slideshow-items h-full'
								uk-height-viewport='min-height: 300'
							>
								{post?.images.map((postImage, idx) => (
									<li key={postImage} className='h-full w-full min-w-[600px]'>
										<img
											src={postImage}
											className='inset-0 h-full w-full min-w-[600px] object-cover'
											alt={`Post Img ${idx}`}
										/>
									</li>
								))}
							</ul>
							<a
								href='#'
								uk-slideshow-item='previous'
								className='uk-position-center-left uk-position-small p-3.5 bg-white rounded-full w-10 h-10 flex justify-center items-center -mx-4 mb-6 shadow-md dark:bg-gray-800 dark:text-white uk-icon uk-slidenav-previous uk-slidenav'
							>
								<svg
									width='14px'
									height='24px'
									viewBox='0 0 14 24'
									xmlns='http://www.w3.org/2000/svg'
									data-svg='slidenav-previous'
								>
									<polyline
										fill='none'
										stroke='#000'
										strokeWidth='1.4'
										points='12.775,1 1.225,12 12.775,23 '
									/>
								</svg>
							</a>
							<a
								href='#'
								uk-slideshow-item='next'
								className='uk-position-center-right uk-positsion-small p-3.5 bg-white rounded-full w-10 h-10 flex justify-center items-center -mx-4 shadow-md dark:bg-gray-800 dark:text-white uk-icon uk-slidenav-next uk-slidenav uk-invisible'
							>
								<svg
									width='14px'
									height='24px'
									viewBox='0 0 14 24'
									xmlns='http://www.w3.org/2000/svg'
									data-svg='slidenav-next'
								>
									<polyline
										fill='none'
										stroke='#000'
										strokeWidth='1.4'
										points='1.225,23 12.775,12 1.225,1 '
									/>
								</svg>
							</a>
						</div>
					) : (
						<div className='inset-0 h-full w-[600px] bg-black' />
					)}
				</div>
				<div className='flex-1 bg-white dark:bg-gray-900 dark:text-gray-100'>
					{/* post header*/}
					<div className='border-b flex items-center justify-between px-5 py-3 dark:border-gray-600'>
						<PostAuthor user={post?.user} />
						<a href='#'>
							<i className='icon-feather-more-horizontal text-2xl rounded-full p-2 transition -mr-1' />
						</a>
					</div>
					<div className='story-content p-4' data-simplebar='init'>
						<div className='simplebar-wrapper' style={{ margin: "-16px" }}>
							<div className='simplebar-height-auto-observer-wrapper'>
								<div className='simplebar-height-auto-observer' />
							</div>
							<div className='simplebar-mask'>
								<div
									className='simplebar-offset'
									style={{ right: 0, bottom: 0 }}
								>
									<div
										className='simplebar-content'
										style={{
											padding: 16,
											height: "100%",
											overflow: "hidden",
										}}
									>
										<p>{post?.body}</p>
										<div className='py-4 '>
											<div className='flex justify-around'>
												<PostButtons
													isLiked={isLiked}
													onLikePost={onLikePostHandler}
												/>
											</div>
											<hr className='-mx-4 my-3' />
											<Liked likes={post?.likes} />
										</div>
										{isLoading ? (
											<Spinner />
										) : (
											<div className='mt-1 space-y-2'>
												{comments.map(({ _id, user, comment }) => (
													<Comment key={_id} user={user} text={comment} />
												))}
											</div>
										)}
									</div>
								</div>
							</div>
							<div
								className='simplebar-placeholder'
								style={{ width: 330, height: 677 }}
							/>
						</div>
						<div
							className='simplebar-track simplebar-horizontal'
							style={{ visibility: "hidden" }}
						>
							<div
								className='simplebar-scrollbar'
								style={{
									transform: "translate3d(0px, 0px, 0px)",
									visibility: "hidden",
								}}
							/>
						</div>
						<div
							className='simplebar-track simplebar-vertical'
							style={{ visibility: "hidden" }}
						>
							<div
								className='simplebar-scrollbar'
								style={{
									transform: "translate3d(0px, 0px, 0px)",
									visibility: "hidden",
								}}
							/>
						</div>
					</div>
					<div className='p-3 border-t dark:border-gray-600'>
						<AddComment
							value={commentText}
							onKeyUp={onAddPostCommentHandler}
							onChange={({ target }) => setCommentText(target.value)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PostModal;
