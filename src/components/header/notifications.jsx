import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import {
	useNotificationMutation,
	useNotificationsQuery,
} from "../../hooks/useNotification";
import Notification from "../notification";

function NotificationItem({ notification, onClickItem }) {
	return (
		<li>
			<Link
				to={`/posts/${notification.doc._id}`}
				key={notification._id}
				onClick={e => {
					e.preventDefault();
					if (!notification.read) {
						onClickItem(notification._id);
					}
				}}
				className={`font-normal ${notification.read ? "bg-gray-100" : ""}`}
			>
				<div className='drop_avatar'>
					<img
						src={notification.from.photoUrl}
						alt={notification.from.fullName}
					/>
				</div>
				<div
					className={`drop_content ${!notification.read ? "text-black" : ""}`}
				>
					<p>
						<strong>{notification.from.fullName}</strong>{" "}
						<span
							dangerouslySetInnerHTML={{
								__html: notification.message,
							}}
						/>
					</p>
					<span className='time-ago'>
						{moment(notification.createdAt).fromNow()}{" "}
					</span>
				</div>
			</Link>
		</li>
	);
}

function Notifications() {
	const userId = localStorage.getItem("userId");

	const [allNotifications, setAllNotifications] = useState([]);

	const { data: notifications } = useNotificationsQuery(userId);
	const mutation = useNotificationMutation();

	useEffect(() => {
		if (notifications) {
			setAllNotifications(
				notifications.filter(
					notification => notification.docModel !== "Message"
				)
			);
		}
	}, [notifications]);

	const onClickNotification = id => {
		alert(id);
		const updatedNotifications = allNotifications.map(notification => ({
			...notification,
			read: id === notification._id ? true : notification.read,
		}));
		setAllNotifications(updatedNotifications);
		mutation.mutate(id);
	};

	const unReadNotifications = allNotifications
		? allNotifications.filter(notification => !notification.read)
		: [];

	return (
		<Notification
			title='Notification'
			items={allNotifications}
			resourceName='notification'
			itemComponent={NotificationItem}
			numUnread={unReadNotifications.length}
			allNotificationsUrl='/notifications'
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
						d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
					/>
				</svg>
			}
		/>
	);
}

export default Notifications;
