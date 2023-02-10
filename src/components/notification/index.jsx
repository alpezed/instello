/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePopper } from "react-popper";

function Notification({
	title = "Notifications",
	icon,
	items,
	numUnread = 0,
	allNotificationsUrl,
	resourceName,
	itemComponent: ItemComponent,
	onClickItem,
}) {
	const referenceRef = useRef(null);
	const popperRef = useRef(null);

	const [isOpen, setIsOpen] = useState(false);

	const { styles, attributes } = usePopper(
		referenceRef.current,
		popperRef.current,
		{
			placement: "bottom-end",
			modifiers: [
				{
					name: "preventOverflow",
					options: {
						padding: 12,
					},
				},
				{
					name: "offset",
					options: { offset: [0, 14] },
				},
			],
		}
	);

	useEffect(() => {
		// listen for clicks and close dropdown on body
		document.addEventListener("mousedown", handleDocumentClick);
		return () => {
			document.removeEventListener("mousedown", handleDocumentClick);
		};
	}, []);

	function handleDocumentClick(event) {
		if (popperRef.current.contains(event.target)) {
			return;
		}
		setIsOpen(false);
	}

	function handleDropdownClick(id) {
		setIsOpen(!isOpen);
		onClickItem(id);
	}

	return (
		<>
			<button
				className='header-links-item uk-open relative'
				ref={referenceRef}
				onClick={() => setIsOpen(!isOpen)}
			>
				{icon}
				{numUnread > 0 ? (
					<span class='absolute top-2.5 right-3 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-700 rounded-full text-xs'>
						{numUnread}
					</span>
				) : null}
			</button>
			<div
				uk-drop='mode: click;offset: 4'
				className={`header_dropdown uk-drop ${isOpen ? "uk-open" : ""}`}
				ref={popperRef}
				style={styles.popper}
				{...attributes.popper}
			>
				<h4 className='-mt-5 -mx-5 bg-gradient-to-t from-gray-100 to-gray-50 border-b font-bold px-6 py-3'>
					{title}
				</h4>
				<ul className='dropdown_scrollbar' data-simplebar='init'>
					<div className='simplebar-wrapper' style={{ margin: 0 }}>
						<div className='simplebar-height-auto-observer-wrapper'>
							<div className='simplebar-height-auto-observer' />
						</div>
						<div className='simplebar-mask'>
							<div
								className='simplebar-offset'
								style={{ right: "-20px", bottom: 0 }}
							>
								<div
									className='simplebar-content'
									style={{
										padding: "0px calc(20px) 0px 0px",
										height: "auto",
										overflow: "hidden scroll",
									}}
								>
									{items && items.length === 0 ? (
										<p class='text-center py-5 text-gray'>No notifications.</p>
									) : null}
									{items &&
										items.map((item, index) => (
											<ItemComponent
												key={`${item?._id}-${index}`}
												{...{ [resourceName]: item }}
												onClickItem={handleDropdownClick}
											/>
										))}
								</div>
							</div>
						</div>
						<div
							className='simplebar-placeholder'
							style={{ width: 350, height: 425 }}
						/>
					</div>
					<div
						className='simplebar-track simplebar-horizontal'
						style={{ visibility: "hidden" }}
					>
						<div
							className='simplebar-scrollbar'
							style={{
								transform: "translate3d(0px, 0px, 0px)",
								visibility: "hidden",
							}}
						/>
					</div>
					<div
						className='simplebar-track simplebar-vertical'
						style={{ visibility: "visible" }}
					>
						<div
							className='simplebar-scrollbar'
							style={{
								transform: "translate3d(0px, 0px, 0px)",
								visibility: "visible",
								height: 338,
							}}
						/>
					</div>
				</ul>
				<Link to={allNotificationsUrl} className='see-all'>
					See all
				</Link>
			</div>
		</>
	);
}

export default Notification;
