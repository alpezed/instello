import { Navigate } from "react-router-dom";

import { isAuth } from "../utils/auth";
import Root from "./root";

function PrivateRoute({ children, path }) {
	return isAuth() ? (
		<Root>{children}</Root>
	) : (
		<Navigate to='/login' state={{ from: path }} replace />
	);
}

export default PrivateRoute;
