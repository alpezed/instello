import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import {
	useNotificationMutation,
	useNotificationsQuery,
} from "../../hooks/useNotification";
import Notification from "../notification";

const MessageNotification = ({ message, onClickItem }) => {
	return (
		<li>
			<Link
				to={`/posts/${message.doc._id}`}
				key={message._id}
				onClick={() => {
					if (!message.read) {
						onClickItem(message._id);
					}
				}}
				className={`font-normal ${message.read ? "bg-gray-100" : ""}`}
			>
				<div className='drop_avatar'>
					<img src={message.from.photoUrl} alt={message.from.fullName} />
				</div>
				<div className={`drop_content ${!message.read ? "text-black" : ""}`}>
					<strong>{message.from.fullName}</strong>
					<time>{moment(message.createdAt).fromNow()}</time>
					<p
						dangerouslySetInnerHTML={{
							__html: message.message,
						}}
					/>
				</div>
			</Link>
		</li>
	);
};

function NotificationMessages() {
	const userId = localStorage.getItem("userId");

	const [allNotifications, setAllNotifications] = useState([]);

	const { data: notifications } = useNotificationsQuery(userId);
	const mutation = useNotificationMutation();

	useEffect(() => {
		if (notifications) {
			setAllNotifications(
				notifications.filter(
					notification => notification.docModel === "Message"
				)
			);
		}
	}, [notifications]);

	const onClickNotification = notifId => {
		const updatedNotifications = allNotifications.map(notification => ({
			...notification,
			read: notifId === notification._id ? true : notification.read,
		}));
		setAllNotifications(updatedNotifications);
		mutation.mutate(notifId);
	};

	const unReadNotifications = allNotifications
		? allNotifications.filter(notification => !notification.read)
		: [];

	return (
		<Notification
			title='Messages'
			items={allNotifications}
			resourceName='message'
			itemComponent={MessageNotification}
			numUnread={unReadNotifications.length}
			allNotificationsUrl='/messages'
			onClickItem={onClickNotification}
			icon={
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
						d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
					/>
				</svg>
			}
		/>
	);
}

export default NotificationMessages;
