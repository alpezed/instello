function AccountPrivacy() {
	return (
		<>
			<div>
				<h3 className='text-xl mb-2'> Privacy</h3>
				<p> Lorem ipsum dolor sit amet nibh consectetuer adipiscing elit</p>
			</div>
			<div className='bg-white rounded-md lg:shadow-lg shadow lg:p-6 p-4 col-span-2'>
				<div className='space-y-3'>
					<div className='flex justify-between items-center'>
						<div>
							<h4> Who can follow me ?</h4>
							<div>
								Lorem ipsum dolor sit amet, consectetuer adipiscing elit,{" "}
							</div>
						</div>
						<div className='switches-list -mt-8 is-large'>
							<div className='switch-container'>
								<label className='switch'>
									<input type='checkbox' />
									<span className='switch-button' />{" "}
								</label>
							</div>
						</div>
					</div>
					<hr />
					<div className='flex justify-between items-center'>
						<div>
							<h4> Show my activities ?</h4>
							<div>
								Lorem ipsum dolor sit amet, consectetuer adipiscing elit,{" "}
							</div>
						</div>
						<div className='switches-list -mt-8 is-large'>
							<div className='switch-container'>
								<label className='switch'>
									<input type='checkbox' defaultChecked />
									<span className='switch-button' />{" "}
								</label>
							</div>
						</div>
					</div>
					<hr />
					<div className='flex justify-between items-center'>
						<div>
							<h4> Search engines?</h4>
							<div>
								{" "}
								Lorem ipsum dolor sit amet, consectetuer adipiscing elit,{" "}
							</div>
						</div>
						<div className='switches-list -mt-8 is-large'>
							<div className='switch-container'>
								<label className='switch'>
									<input type='checkbox' />
									<span className='switch-button' />{" "}
								</label>
							</div>
						</div>
					</div>
					<hr />
					<div className='flex justify-between items-center'>
						<div>
							<h4> Allow Commenting?</h4>
							<div>
								{" "}
								Lorem ipsum dolor sit amet, consectetuer adipiscing elit,{" "}
							</div>
						</div>
						<div className='switches-list -mt-8 is-large'>
							<div className='switch-container'>
								<label className='switch'>
									<input type='checkbox' />
									<span className='switch-button' />{" "}
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AccountPrivacy;
