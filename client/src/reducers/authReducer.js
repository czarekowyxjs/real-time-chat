const initialState = {
	loaded: false,
	authError: {
		status: false
	}
};

export default (state = initialState, action) => {
	switch(action.type) {
		case "AUTH_BEGIN":
			return initialState;
		case "AUTHORIZATION":
			return {
				...state,
				loaded: true,
				authError: {}
			};
		case "AUTH_ERROR":
			return {
				...state,
				authError: action.error,
				loaded: true
			};
		default:
			return state;
	}
};