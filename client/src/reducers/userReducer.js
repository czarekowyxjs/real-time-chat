const initialState = {
	user: {},
	avatarError: {}
};

export default (state = initialState, action) => {
	switch(action.type) {
		case "FETCH_USER_DATA":
			return {
				...state,
				avatarError: {},
				user: action.user
			};
		case "CHANGE_AVATAR":
			let user = state.user;
			user.avatar = action.avatar;
			return {
				...state,
				avatarError: {},
				user
			};
		case "CHANGE_AVATAR_ERROR":
			return {
				...state,
				avatarError: action.error
			}
		case "RETURN_TO_INITIAL_STATE_USER":
			return initialState;
		default:
			return state;
	}
};