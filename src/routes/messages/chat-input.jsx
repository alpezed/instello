function ChatInput({ chatMessage, setChatMessage, onSendMessage }) {
	return (
		<div className='border-t flex p-6 dark:border-gray-700'>
			<textarea
				cols={1}
				rows={1}
				placeholder='Your Message..'
				className='border-0 flex-1 h-10 min-h-0 resize-none min-w-0 shadow-none dark:bg-transparent'
				onChange={e => setChatMessage(e.target.value)}
				value={chatMessage}
			/>
			<div className='flex h-full space-x-2'>
				<button
					type='button'
					className='bg-blue-600 font-semibold px-6 py-2 rounded-md text-white'
					onClick={onSendMessage}
				>
					Send
				</button>
			</div>
		</div>
	);
}

export default ChatInput;
