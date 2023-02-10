import SideMode from "./switch-mode";

function SidebarHeader() {
	return (
		<div className='sidebar_header border-b border-gray-200 from-gray-100 to-gray-50 bg-gradient-to-t  uk-visible@s'>
			<a href='#'>
				<img src={require("../../assets/images/logo.png")} alt='logo' />
				<img
					src={require("../../assets/images/logo-light.png")}
					className='logo_inverse'
					alt='logo'
				/>
			</a>
			<SideMode />
		</div>
	);
}
export default SidebarHeader;
