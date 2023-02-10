function Highlights() {
	return (
		<>
			<h1 className='lg:text-2xl text-lg font-extrabold leading-none text-gray-900 tracking-tight mt-8'>
				Highths{" "}
			</h1>
			<div className='my-6 grid lg:grid-cols-5 grid-cols-3 gap-2 hover:text-yellow-700 uk-link-reset'>
				<button>
					<div className='bg-gray-100 border-4 border-dashed flex flex-col h-full min-h-[15rem] items-center justify-center relative rounded-2xl w-full'>
						<i className='text-4xl uil-plus-circle' /> <span> Add new </span>
					</div>
				</button>
				{/* <a href='#story-modal' uk-toggle>
					<img
						src={require("../../assets/images/avatars/avatar-lg-1.jpg")}
						className='w-full lg:h-60 h-40 rounded-md object-cover'
					/>
				</a>
				<a href='#story-modal' uk-toggle>
					<img
						src={require("../../assets/images/post/img2.jpg")}
						className='w-full lg:h-60 h-40 rounded-md object-cover'
					/>
				</a>
				<a href='#story-modal' uk-toggle>
					<img
						src={require("../../assets/images/post/img7.jpg")}
						className='w-full lg:h-60 h-40 rounded-md object-cover uk-visible@s'
					/>
				</a> */}
			</div>
		</>
	);
}

export default Highlights;
