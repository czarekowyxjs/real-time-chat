export const loginBySocket = (socket, user) => {
	return dispatch => socket.emit('login', user);
};

export const loginSuccess = data => {
	return dispatch => {
		
		const user = data.user;
		const token = data.token.token;
		console.log(data);

		localStorage.setItem("token", token);

		dispatch({
			type: "LOGIN",
			user: user
		});

	};
};

export const loginError = data => {
	return dispatch => {
		console.log(data);
	};
};

export const verifyToken = (socket, token) => {
	return dispatch => socket.emit("verifyToken", {
		headers: {
			Authorization: token
		}
	});
};

export const verifyTokenSuccess = data => {
	return dispatch => dispatch({
			type: "VERIFY_TOKEN_SUCCESS",
			user: data.user
		});
};

export const verifyTokenError = error => {
	return dispatch => dispatch({
		type: "VERIFY_TOKEN_ERROR",
		error: error
	});
};