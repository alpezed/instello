import { Link } from "react-router-dom";

function Header() {
	return (
		<div className='bg-white py-4 shadow dark:bg-gray-800'>
			<div className='max-w-6xl mx-auto'>
				<div className='flex items-center lg:justify-between justify-around'>
					<a href='trending.html'>
						<img
							src={require("../../assets/images/logo.png")}
							alt='logo'
							className='w-32'
						/>
					</a>
					<div className='capitalize flex font-semibold hidden lg:block my-2 space-x-3 text-center text-sm'>
						<Link to='/login' className='py-3 px-4'>
							Login
						</Link>
						<Link
							to='/register'
							className='bg-pink-500 pink-500 px-6 py-3 rounded-md shadow text-white'
						>
							Register
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Header;
