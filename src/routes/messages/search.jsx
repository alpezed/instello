function Search({ setFilterUser }) {
	return (
		<div className='border-b px-4 py-4 dark:border-gray-600'>
			<div className='bg-gray-100 input-with-icon rounded-md dark:bg-gray-700'>
				<input
					id='autocomplete-input'
					type='text'
					placeholder='Search'
					className='bg-transparent max-h-10 shadow-none'
					onChange={e => setFilterUser(e.target.value)}
				/>
				<i className='icon-material-outline-search' />
			</div>
		</div>
	);
}
export default Search;
