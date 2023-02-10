import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AuthLayout from "./layout/auth";
import PrivateRoute from "./routes/PrivateRoute";
import Feed from "./routes/feed";
import Login from "./routes/auth/login";
import Signup from "./routes/auth/signup";
import Profile from "./routes/profile";
import SettingsLayout from "./layout/settings";
import AccountBasic from "./routes/settings/account/basic";
import AccountPrivacy from "./routes/settings/account/privacy";
import Messages from "./routes/messages";
import Trending from "./routes/trending";
import Explore from "./routes/explore";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate replace to='feed' />,
	},
	{
		path: "feed",
		element: (
			<PrivateRoute>
				<Feed />
			</PrivateRoute>
		),
	},
	{
		path: "posts/:postId",
		element: (
			<PrivateRoute>
				<Feed />
			</PrivateRoute>
		),
	},
	{
		path: ":user",
		element: (
			<PrivateRoute>
				<Profile />
			</PrivateRoute>
		),
	},
	{
		path: "/profile",
		element: (
			<PrivateRoute>
				<Profile />
			</PrivateRoute>
		),
	},
	{
		path: "/messages",
		element: (
			<PrivateRoute>
				<Messages />
			</PrivateRoute>
		),
	},
	{
		path: "/trending",
		element: (
			<PrivateRoute>
				<Trending />
			</PrivateRoute>
		),
	},
	{
		path: "/explore",
		element: (
			<PrivateRoute>
				<Explore />
			</PrivateRoute>
		),
	},
	{
		path: "/settings",
		element: (
			<PrivateRoute>
				<SettingsLayout />
			</PrivateRoute>
		),
		children: [
			{
				path: "account",
				element: (
					<>
						<AccountBasic />
						<AccountPrivacy />
					</>
				),
			},
		],
	},
	{
		element: <AuthLayout />,
		children: [
			{ path: "/login", element: <Login /> },
			{ path: "/register", element: <Signup /> },
		],
	},
]);

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<Toaster position='bottom-right' reverseOrder={false} />
		</QueryClientProvider>
	);
}

export default App;
