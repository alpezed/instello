/* eslint-disable jsx-a11y/anchor-is-valid */
import { useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useAddStory } from "../../../hooks/useStory";

function Story({ story, user, isMe = false, withStory }) {
	const [imageUrl, setImageUrl] = useState(
		`http://localhost:8000/assets/users/stories/${story.image}`
	);
	const [hasStory, setHasStory] = useState(withStory);

	const { mutate: addStory } = useAddStory();

	useEffect(() => {
		setHasStory(withStory);
	}, [withStory]);

	useEffect(() => {
		let imageStory = `http://localhost:8000/assets/users/stories/${story.image}`;
		if (!withStory) {
			imageStory = story.image;
		}
		setImageUrl(imageStory);
	}, [story?.image, withStory]);

	const onDrop = useCallback(
		acceptedFiles => {
			// Do something with the files
			const formData = new FormData();
			formData.append("text", "");
			formData.append("image", acceptedFiles[0]);
			const imgURL = URL.createObjectURL(acceptedFiles[0]);

			setHasStory(true);
			setImageUrl(imgURL);
			addStory(formData);
		},
		[addStory]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: "image/*",
		onDrop,
	});

	return (
		<li tabIndex={-1} className='uk-active' {...getRootProps()}>
			<div
				className={`relative ${
					hasStory ? "bg-gradient-to-tr from-yellow-600 to-pink-600 p-1" : ""
				} rounded-full transform -rotate-2 hover:rotate-3 transition hover:scale-105 m-1`}
			>
				<img
					src={imageUrl}
					className='w-20 h-20 rounded-full border-2 border-white bg-gray-200'
					alt={story.text}
				/>
				{isMe && (
					<>
						<a
							href='#'
							className='p-2 rounded-full w-8 h-8 flex justify-center items-center text-white border-4 border-white absolute right-2 bottom-0 bg-blue-600'
						>
							+
						</a>
						<input {...getInputProps()} />
					</>
				)}
			</div>
			<Link
				to={isMe ? "/profile" : `/${user?.slug}`}
				className='block font-medium text-center text-gray-500 text-x truncate w-24'
			>
				{isMe ? "You" : user?.fullName}
			</Link>
		</li>
	);
}

export default Story;
