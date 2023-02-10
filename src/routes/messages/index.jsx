import { useEffect, useState } from "react";
import io from "socket.io-client";

import AppContent from "../../layout/app-content";
import UsersList from "./users-list";
import Search from "./search";
import { useUserQuery } from "../../hooks/useUser";
import ChatMessages from "./chat-messages";
import MessagesContext from "./message-context";

const ENDPOINT = process.env.REACT_APP_API_URL;
let socket;

function Messages() {
	const [isSocketConnected, setIsSocketConnected] = useState(false);
	const [filterUser, setFilterUser] = useState("");
	const [typing, setTyping] = useState(false);
	const [isTyping, setIsTyping] = useState(false);

	const userId = localStorage.getItem("userId");
	const { data: user } = useUserQuery(userId);

	useEffect(() => {
		if (user) {
			socket.emit("setup", user);
		}
	}, [user]);

	useEffect(() => {
		socket = io(ENDPOINT);
		socket.on("connected", () => setIsSocketConnected(true));
		socket.on("typing", () => setIsTyping(true));
		socket.on("stop typing", () => setIsTyping(false));
	}, []);

	return (
		<MessagesContext>
			<AppContent title='Messages'>
				<div className='lg:flex lg:shadow lg:bg-white lg:space-y-0 space-y-8 rounded-md lg:-mx-0 -mx-5 overflow-hidden lg:dark:bg-gray-800'>
					<div className='lg:w-4/12 bg-white border-r overflow-hidden dark:bg-gray-800 dark:border-gray-600'>
						<Search setFilterUser={setFilterUser} />
						<UsersList searchedUser={filterUser} socket={socket} />
					</div>
					<div className='lg:w-8/12 bg-white dark:bg-gray-800'>
						<ChatMessages
							socket={socket}
							isSocketConnected={isSocketConnected}
							typing={typing}
							isTyping={isTyping}
							setIsTyping={setIsTyping}
							setTyping={setTyping}
						/>
					</div>
				</div>
			</AppContent>
		</MessagesContext>
	);
}

export default Messages;
