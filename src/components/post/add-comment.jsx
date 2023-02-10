import { forwardRef } from "react";

function AddComment({ value, onKeyUp, onChange }, ref) {
	return (
		<div className='bg-gray-100 bg-gray-100 rounded-full rounded-md relative dark:bg-gray-800'>
			<input
				ref={ref}
				type='text'
				value={value}
				placeholder='Add your Comment..'
				className='bg-transparent max-h-10 shadow-none'
				onKeyUp={onKeyUp}
				onChange={onChange}
			/>
			<div className='absolute bottom-0 flex h-full items-center right-3 text-xl space-x-2'>
				<button>
					<i className='uil-image' />
				</button>
				<button>
					<i className='uil-video' />
				</button>
			</div>
		</div>
	);
}

export default forwardRef(AddComment);
