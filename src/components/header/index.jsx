import { Link } from "react-router-dom";

import Notification from "./notifications";
import NotificationMessages from "./messages";

function Header() {
	const userInfo = JSON.parse(localStorage.getItem("userInfo"));

	return (
		<header>
			<div className='header_inner'>
				<div className='left-side'>
					{/* Logo */}
					<div id='logo' className=' uk-hidden@s'>
						<Link to='/feed'>
							<img
								src={require("../../assets/images/logo-mobile.png")}
								alt='logo'
							/>
							<img
								src={require("../../assets/images/logo-mobile-light.png")}
								className='logo_inverse'
								alt='logo'
							/>
						</Link>
					</div>
					<div
						className='triger'
						uk-toggle='target: #wrapper ; cls: sidebar-active'
					>
						<i className='uil-bars' />
					</div>
					<div className='header_search'>
						<input type='text' placeholder='Search..' />
						<div className='icon-search'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
								/>
							</svg>
						</div>
					</div>
				</div>
				<div className='right-side lg:pr-4'>
					{/* Notification */}
					<Notification />
					{/* Messages */}
					<NotificationMessages />
					{/* profile */}
					{userInfo && (
						<Link to='/profile'>
							<img
								src={userInfo.photoUrl}
								className='header-avatar'
								alt={userInfo.fullName}
							/>
						</Link>
					)}
					<div
						uk-drop='mode: click;offset:9'
						className='header_dropdown profile_dropdown border-t uk-drop'
					>
						<ul>
							<li>
								<a href='#'> Account setting </a>{" "}
							</li>
							<li>
								<a href='#'> Payments </a>{" "}
							</li>
							<li>
								<a href='#'> Help </a>{" "}
							</li>
							<li>
								<a href='form-login.html'> Log Out</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</header>
	);
}
export default Header;
