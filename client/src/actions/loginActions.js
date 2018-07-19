import axios from 'axios';

export const authLogin = (user) => {
	return async dispatch => {
		dispatch({
			type: "LOGIN_BEGIN"
		});
		try {
			const response = await axios.post("/api/auth/login", {
				user
			});

			window.localStorage.setItem("token", response.data.token.token);

			dispatch({
				type: "FETCH_USER_DATA",
				user: response.data.user
			});

			dispatch({
				type: "LOGIN"
			});

		} catch(e) {
			dispatch({
				type: "LOGIN_ERROR",
				error: e.response.data.error
			});
		}
	};
};

export const returnToInitialState = () => {
	return dispatch => {
		dispatch({
			type: "LOGIN_BEGIN"
		});
	};
};	