import AppContent from "../../layout/app-content";
import FollowUsers from "./follow-users";
import LatestPosts from "./latest-posts";
import Post from "../../components/post/post";
import { useUsersToFollow } from "../../hooks/useFollowing";
import { useFollowUser } from "../../hooks/useFollowUser";
import { usePostQuery, usePostsQuery } from "../../hooks/usePosts";
import Loader from "../../components/loader";
import { useParams } from "react-router-dom";

function Feed() {
	const params = useParams();

	const { data: posts, isLoading } = usePostsQuery();
	const { data: post, isLoading: isLoadingPost } = usePostQuery(params.postId, {
		enabled: !!params.postId,
	});
	const { data, refetch } = useUsersToFollow();
	const mutation = useFollowUser();

	const onRefresh = e => {
		e.preventDefault();
		refetch();
	};

	const onFollow = id => {
		mutation.mutate(id);
	};

	if (isLoading || (isLoadingPost && !!params.postId)) {
		return (
			<div className='container pro-container m-auto'>
				<Loader />
			</div>
		);
	}

	return (
		<AppContent title='Feed'>
			<div className='lg:flex justify-center lg:space-x-10 lg:space-y-0 space-y-5'>
				<div className='space-y-5 flex-shrink-0 lg:w-7/12'>
					{!!params.postId ? (
						<Post key={post.id} post={post} />
					) : (
						<>
							{posts?.map(post => (
								<Post key={post.id} post={post} />
							))}
						</>
					)}
				</div>
				<div className='lg:w-5/12'>
					{data && data.length > 0 && (
						<FollowUsers
							users={data}
							onRefresh={onRefresh}
							onFollow={onFollow}
							isProcessing={mutation.isLoading}
						/>
					)}
					<div uk-sticky='offset:28; bottom:true ; media @m'>
						<LatestPosts posts={posts} />
					</div>
				</div>
			</div>
		</AppContent>
	);
}

export default Feed;
