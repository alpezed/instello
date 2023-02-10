import SidebarHeader from "./sidebar-header";
import SidebarProfile from "./sidebar-profile";
import Navigation from "./navigation";
import { useProfile } from "../../hooks/useProfile";

function Sidebar() {
	const { data } = useProfile();

	return (
		<div className='sidebar'>
			<SidebarHeader />
			<div className='border-b border-gray-20 flex justify-between items-center p-3 pl-5 relative uk-hidden@s'>
				<h3 className='text-xl'> Navigation </h3>
				<span
					className='btn-mobile'
					uk-toggle='target: #wrapper ; cls: sidebar-active'
				/>
			</div>
			<div className='sidebar_inner'>
				<SidebarProfile user={data} />
				<hr className='-mx-4 -mt-1 uk-visible@s' />
				<Navigation />
			</div>
		</div>
	);
}
export default Sidebar;
