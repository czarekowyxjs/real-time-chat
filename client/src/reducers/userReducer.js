const initialState = {
	user: {}
};

export default (state = initialState, action) => {
	switch(action.type) {
		case "FETCH_USER_DATA":
			return {
				...state,
				user: action.user
			};
		case "RETURN_TO_INITIAL_STATE_USER":
			return initialState;
		default:
			return state;
	}
};