function AppContent({ title, children }) {
	return (
		<div className='container m-auto'>
			<h1 class='lg:text-2xl text-lg font-extrabold leading-none text-gray-900 tracking-tight mb-5'>
				{title}
			</h1>
			{children}
		</div>
	);
}
export default AppContent;
