import Suggestions from "./suggestions";
import Explore from "./explore";
import Stories from "./stories";

function Trending() {
	return (
		<div className='container m-auto'>
			<Stories />
			<Suggestions />
			<Explore />
			<div className='flex justify-center mt-6'>
				<button className='bg-white font-semibold my-3 px-6 py-2 rounded-full shadow-md dark:bg-gray-800 dark:text-white'>
					Load more ..
				</button>
			</div>
		</div>
	);
}

export default Trending;
