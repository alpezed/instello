export function getUserInfo() {
	let userInfo = localStorage.getItem("userInfo");
	if (userInfo) {
		userInfo = JSON.parse(userInfo);
	}
	return userInfo;
}
