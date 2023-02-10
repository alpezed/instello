import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { usePopper } from "react-popper";

import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useDeletePost } from "../../hooks/usePosts";
import PostAuthor from "./author";

function PostHeader({ post, user }) {
	const ref = useRef();

	const [referenceElement, setReferenceElement] = useState(null);
	const [popperElement, setPopperElement] = useState(null);
	// const [arrowElement, setArrowElement] = useState(null);
	const [isOpenOptions, setIsOpenOptions] = useState(false);

	const mutation = useDeletePost();

	useOnClickOutside(ref, () => setIsOpenOptions(false));

	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		placement: "bottom-end",
		modifiers: [
			{
				name: "preventOverflow",
				options: {
					padding: 12,
				},
			},
			{
				name: "offset",
				options: { offset: 12 },
			},
		],
	});

	const onClickPostAction = action => {
		if (
			action === "delete" &&
			window.confirm("Are you sure you want to delete this post?")
		) {
			mutation.mutate(post.id);
		}
		setIsOpenOptions(false);
	};

	return (
		<div className='flex justify-between items-center px-4 py-3'>
			<PostAuthor user={user} />
			<div ref={ref}>
				<button
					type='button'
					ref={setReferenceElement}
					onClick={() =>
						setIsOpenOptions(currentOpenOption => !currentOpenOption)
					}
				>
					<i className='icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700' />
				</button>
				<div
					className={`bg-white w-56 shadow-md mx-auto p-2 rounded-md text-gray-500 text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 ${
						isOpenOptions ? "uk-open" : "hidden"
					}`}
					ref={setPopperElement}
					style={styles.popper}
					{...attributes.popper}
				>
					<ul className='space-y-1'>
						<li>
							<button className='flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800 w-full'>
								<i className='uil-share-alt mr-1' /> Share
							</button>
						</li>
						<li>
							<button className='flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800 w-full'>
								<i className='uil-edit-alt mr-1' /> Edit Post
							</button>
						</li>
						<li>
							<button className='flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800 w-full'>
								<i className='uil-comment-slash mr-1' /> Disable comments
							</button>
						</li>
						<li>
							<button className='flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800 w-full'>
								<i className='uil-favorite mr-1' /> Add favorites
							</button>
						</li>
						<li>
							<hr className='-mx-2 my-2 dark:border-gray-800' />
						</li>
						<li>
							<button
								onClick={() => onClickPostAction("delete")}
								className='flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600 w-full'
							>
								<i className='uil-trash-alt mr-1' /> Delete
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
export default PostHeader;
