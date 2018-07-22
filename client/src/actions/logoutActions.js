import axios from 'axios';

export const executeLogout = (token) => {
	return async dispatch => {
		dispatch({
			type: "LOGOUT_BEGIN"
		});
		try {

			await axios.post("/api/auth/logout", {
				token: token
			});

			dispatch({
				type: "RETURN_TO_INITIAL_STATE_USER"
			});

			window.localStorage.clear();

			dispatch({
				type: "LOGOUT"
			});


		} catch(e) {
			console.log(e.response);
		}
	};
};	