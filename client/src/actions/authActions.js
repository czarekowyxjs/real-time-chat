import axios from 'axios';

export const userRequireAuth = (token) => {
	return async dispatch => {
		dispatch({
			type: "AUTH_BEGIN"
		});
		try {

			const response = await axios.get("/api/auth/authorization?t="+token);

			if(response.status === 203) {

				dispatch({
					type: "AUTH_ERROR",
					error: response.data.error
				});

			} else if(response.status === 200) {

				let user = response.data.user;
				delete user.Token;
				console.log(user);
				dispatch({
					type: "FETCH_USER_DATA",
					user: response.data.user
				});

				dispatch({
					type: "AUTHORIZATION"
				});

			}


		} catch(e) {

			dispatch({
				type: "AUTH_ERROR",
				error: e.response.data.error
			});

		}
	};
};

export const userNoRequireAuth = (token) => {
	return async dispatch => {
		dispatch({
			type: "AUTH_BEGIN"
		});
		try {

			const response = await axios.get("/api/auth/authorization?t="+token);

			if(response.status === 203) {

				dispatch({
					type: "AUTH_ERROR",
					error: response.data.error
				});

			} else if(response.status === 200) {

				dispatch({
					type: "FETCH_USER_DATA",
					user: response.data.user
				});

				dispatch({
					type: "AUTHORIZATION"
				});

			}

		} catch(e) {

			dispatch({
				type: "AUTH_ERROR",
				error: e.response.data.error
			});

		}
	};
};