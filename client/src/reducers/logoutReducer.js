const initialState = {
	loaded: false
};

export default (state = initialState, action) => {
	switch(action.type) {
		case "LOGOUT_BEGIN":
			return initialState;
		case "LOGOUT":
			return {
				...state,
				loaded: true
			};
		default:
			return state;
	}
};