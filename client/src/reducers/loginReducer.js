const initialState = {
	logged: false,
	loginError: {},
	loaded: false
};

export default (state = initialState, action) => {
	switch(action.type) {
		case "LOGIN_BEGIN":
			return initialState;
		case "LOGIN":
			return {
				...state,
				loginError: {},
				logged: true,
				loaded: true
			};
		case "LOGIN_ERROR":
			return {
				...state,
				loginError: action.error,
				loaded: true
			};
		default:
			return state;
	}
}