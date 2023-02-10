import { usePostsQuery } from "../../hooks/usePosts";
import Loader from "../../components/loader";
import ExploreItemSmall from "./explore-item-small";
import ExploreItemLarge from "./explore-item-large";
import ExploreItems from "./explore-items";
import AppContent from "../../layout/app-content";

function Explore() {
	const { data: posts, isLoading } = usePostsQuery();

	return (
		<AppContent title='Explore'>
			{isLoading && (
				<div className='relative h-60'>
					<Loader />
				</div>
			)}
			{!isLoading && posts && (
				<ExploreItems
					items={posts}
					renderComponent={(item, index) => {
						if (index === 1) {
							return <ExploreItemLarge key={item._id} post={item} />;
						}
						return <ExploreItemSmall key={item._id} post={item} />;
					}}
				/>
			)}
			{/* Load more*/}
			{/* <div className='flex justify-center mt-6'>
				<a
					href='#'
					className='bg-white font-semibold my-3 px-6 py-2 rounded-full shadow-md dark:bg-gray-800 dark:text-white'
				>
					Load more ..
				</a>
			</div> */}
		</AppContent>
	);
}

export default Explore;
