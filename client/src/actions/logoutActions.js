import axios from 'axios';

export const executeLogout = (token) => {
	return async dispatch => {
		dispatch({
			type: "LOGOUT_BEGIN"
		});
		try {

			const response = await axios.post("/api/auth/logout", {
				token: token
			});

			dispatch({
				type: "RETURN_TO_INITIAL_STATE_USER"
			});

			dispatch({
				type: "LOGOUT"
			});

			window.localStorage.clear();

		} catch(e) {
			console.log(e.response);
		}
	};
};	