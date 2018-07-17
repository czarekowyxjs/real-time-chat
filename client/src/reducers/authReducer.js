const initialState = {
	logged: false,
	user: {},
	loginError: {},
	verifyTokenError: {}
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
		case "VERIFY_TOKEN_SUCCESS":
			return {
				...state,
				logged: true,
				user: action.user,
				verifyTokenError: {}
			};
		case "VERIFY_TOKEN_ERROR":
			return {
				...state,
				logged: false,
				user: {},
				verifyTokenError: action.error
			};
		default:
			return state;
	}
}