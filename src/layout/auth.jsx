import { Navigate, Outlet } from "react-router-dom";

import { isAuth } from "../utils/auth";
import Header from "../routes/auth/header";
import Footer from "../routes/auth/footer";

function AuthLayout() {
	if (isAuth()) {
		return <Navigate to='/feed' />;
	}

	return (
		<div id='wrapper' className='flex flex-col justify-between h-screen'>
			<Header />
			<div>
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}
export default AuthLayout;
