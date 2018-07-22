import axios from 'axios';

export const authRegister = (user) => {
	return async dispatch => {
		dispatch({
			type: "REGISTER_BEGIN"
		});
		
		try {

			const response = await axios.post("/api/auth/register", {
				username: user.username,
				email: user.email,
				password: user.password,
				passwordAgain: user.passwordAgain
			});

			if(response.status === 202) {

				dispatch({
					type: "REGISTER_ERROR",
					error: response.data.error
				});

			} else if(response.status === 200) {
				dispatch({
					type: "REGISTER"
				});
			}
		} catch(e) {
				dispatch({
					type: "REGISTER_ERROR",
					error: e.response.data.error
				});
		}

	}
};

export const returnToInitialState = () => {
	return dispatch => dispatch({
		type: "REGISTER_BEGIN"
	});
};