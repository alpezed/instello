import { Link, NavLink, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function Navigation() {
	const location = useLocation();
	const queryClient = useQueryClient();

	const notifications = queryClient.getQueryData(["notifications"], {
		exact: false,
	});

	console.log(notifications);

	return (
		<ul>
			<li>
				<NavLink
					to='/feed'
					className={({ isActive }) => (isActive ? "active" : undefined)}
				>
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
							d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
						/>
					</svg>
					<span> Feed </span>{" "}
				</NavLink>
			</li>
			<li>
				<NavLink
					to='/explore'
					className={({ isActive }) => (isActive ? "active" : undefined)}
				>
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
					<span> Explore </span>{" "}
				</NavLink>
			</li>
			<li>
				<NavLink
					to='/messages'
					className={({ isActive }) => (isActive ? "active" : undefined)}
				>
					<i className='uil-location-arrow' />
					<span> Messages </span>{" "}
					{notifications && notifications.length > 0 ? (
						<span className='nav-tag'>{notifications.length}</span>
					) : null}
				</NavLink>
			</li>
			<li>
				<NavLink to='/trending'>
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
							d='M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z'
						/>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z'
						/>
					</svg>
					<span> Trending </span>{" "}
				</NavLink>
			</li>
			{/* <li>
				<a href='market.html'>
					<i className='uil-store' />
					<span> Marketplace </span>{" "}
				</a>
			</li> */}
			<li
				className={
					location.pathname.includes("/settings") ? "active-submenu" : ""
				}
			>
				<NavLink
					to='/settings/account'
					className={({ isActive }) => (isActive ? "active" : undefined)}
				>
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
							d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
						/>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
						/>
					</svg>
					<span> Settings </span>
				</NavLink>
				<ul>
					<li>
						<NavLink
							to='/settings/account'
							className={({ isActive }) => (isActive ? "active" : undefined)}
						>
							General
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/settings/account'
							className={({ isActive }) => (isActive ? "active" : undefined)}
						>
							Account setting
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/settings/account'
							className={({ isActive }) => (isActive ? "active" : undefined)}
						>
							Billing <span className='nav-tag'>3</span>{" "}
						</NavLink>
					</li>
				</ul>
			</li>
			<li>
				<NavLink
					to='/profile'
					className={({ isActive }) => (isActive ? "active" : undefined)}
				>
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
							d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
						/>
					</svg>
					<span> My Profile </span>{" "}
				</NavLink>
			</li>
			<li>
				<hr className='my-2' />
			</li>
			<li>
				<Link to='/login' onClick={() => window.localStorage.clear()}>
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
							d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
						/>
					</svg>
					<span> Logout </span>{" "}
				</Link>
			</li>
		</ul>
	);
}
export default Navigation;
