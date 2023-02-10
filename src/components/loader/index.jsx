function Loader() {
	return (
		<div class='absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 '>
			<div
				class='animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-gray-400 rounded-full'
				role='status'
				aria-label='loading'
			>
				<span class='sr-only'>Loading...</span>
			</div>
		</div>
	);
}

export default Loader;
