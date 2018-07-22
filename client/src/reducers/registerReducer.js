const initialState = {
	registerError: {},
	loaded: false
};

export default (state = initialState, action) => {
	switch(action.type) {
		case "REGISTER_BEGIN":
			return initialState;
		case "REGISTER":
			return {
				...state,
				loaded: true,
				registerError: {}
			};
		case "REGISTER_ERROR":
			return {
				...state,
				loaded: true,
				registerError: action.error
			};
		default:
			return state;
	}
};