// import { Outlet } from "react-router";
import { createContext, useState } from "react";

import Header from "../components/header";
import Sidebar from "../layout/sidebar/sidebar";
import PostModal from "../components/post/modal";
import { useContext } from "react";

const AppContext = createContext({
	addSelectedPost: () => {},
});

function Root({ children }) {
	const [selectedPost, setSelectedPost] = useState();

	return (
		<AppContext.Provider value={{ setSelectedPost }}>
			<div id='wrapper'>
				<Sidebar />
				<div className='main_content'>
					<Header />
					{children}
				</div>
			</div>
			<PostModal post={selectedPost} setSelectedPost={setSelectedPost} />
		</AppContext.Provider>
	);
}

export const useAppContext = () => useContext(AppContext);

export default Root;
