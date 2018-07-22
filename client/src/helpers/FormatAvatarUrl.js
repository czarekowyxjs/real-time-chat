export default (avatarName, uid) => {
	if(avatarName === "default-avatar.png") {
		return '/public/images/'+avatarName;
	} else {
		return '/users/'+uid+'/images/'+avatarName;
	}
};