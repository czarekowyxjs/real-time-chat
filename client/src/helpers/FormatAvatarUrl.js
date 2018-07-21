export default (avatarName) => {
	if(avatarName === "default-avatar.png") {
		return '/public/images/'+avatarName;
	} else {
		return avatarName;
	}
};