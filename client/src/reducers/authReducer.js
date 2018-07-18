const initialState = {
	logged: false,
	user: {},
	loginError: {},
	verifyTokenError: {},
	loaded: false
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
				verifyTokenError: {},
				loaded: true
			};
		case "VERIFY_TOKEN_ERROR":
			return {
				...state,
				logged: false,
				user: {},
				verifyTokenError: action.error,
				loaded: true
			};
		case "LOGOUT":
			return initialState;
		case "TOGGLE_LOADING":
			return {
				...state,
				loaded: action.loaded
			};
		default:
			return state;
	}
}