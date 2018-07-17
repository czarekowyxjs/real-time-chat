const initialState = {
	logged: false,
	user: {},
	loginError: false
};

export default (state = initialState, action) => {
	switch(action.type) {
		case "LOGIN":
			return {
				...state,
				logged: true,
				user: action.user
			};
		case "LOGIN_ERROR":
			return {
				...state,
				logged: false,
				loginError: true
			};
		default:
			return state;
	}
}