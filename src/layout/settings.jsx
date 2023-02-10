import { Outlet } from "react-router-dom";

function SettingsLayout() {
	return (
		<div className='container m-auto'>
			<h1 className='text-2xl leading-none text-gray-900 tracking-tight mt-3'>
				Account Setting
			</h1>
			<ul className='mt-5 -mr-3 flex-nowrap lg:overflow-hidden overflow-x-scroll uk-tab'>
				<li className='uk-active'>
					<a href='#'>General</a>
				</li>
				<li>
					<a href='#'>Profile</a>
				</li>
				<li>
					<a href='#'>Privacy</a>
				</li>
				<li>
					<a href='#'>Notification</a>
				</li>
				<li>
					<a href='#'>Social links</a>
				</li>
				<li>
					<a href='#'>Billing</a>
				</li>
				<li>
					<a href='#'>Security</a>
				</li>
			</ul>
			<div className='grid lg:grid-cols-3 mt-12 gap-8'>
				<Outlet />
			</div>
		</div>
	);
}
export default SettingsLayout;
